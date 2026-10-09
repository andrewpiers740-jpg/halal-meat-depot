// ONE handler for order + contact + wholesale (by formName).
// Orders: totals are recomputed here from the catalogue — never trusted from
// the browser. Either checkout channel (website or WhatsApp) saves the order,
// emails the shop AND sends the customer confirmation — unconditionally.
import { computeTotals, findMethod, ORDER_REF_RE } from '@/lib/order'
import { saveOrder } from '@/lib/orderStore'
import { saveEnquiry, generateEnquiryId } from '@/lib/enquiryStore'
import { sendMail, destination } from '@/lib/mailer'
import { orderNotificationEmail, orderConfirmationEmail, enquiryNotificationEmail } from '@/utils/emailTemplates'
import { accountsEnabled, readSession, getUser, createUser, setSessionCookie, isEmail } from '@/lib/accounts'

export const dynamic = 'force-dynamic'

const clean = (v, max = 500) => String(v ?? '').trim().slice(0, max)

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'bad-json' }, { status: 400 })
  }
  if (body.botcheck) return Response.json({ ok: true }) // honeypot — pretend success
  const base = new URL(request.url).origin

  if (body.formName === 'order') return handleOrder(body, base)
  if (body.formName === 'contact' || body.formName === 'wholesale') return handleEnquiry(body, base)
  return Response.json({ ok: false, error: 'unknown-form' }, { status: 400 })
}

async function handleOrder(body, base) {
  const orderNumber = clean(body.orderNumber, 20)
  const channel = body.channel === 'whatsapp' ? 'whatsapp' : 'email'
  const c = body.customer || {}
  const name = clean(c.name, 120)
  const email = clean(c.email, 200).toLowerCase()
  const phone = clean(c.phone, 40)
  const fulfilment = 'delivery' // delivery only — pickup is not offered
  const address = clean(body.address, 300)
  const method = findMethod(body.paymentMethod)

  if (!ORDER_REF_RE.test(orderNumber)) return Response.json({ ok: false, error: 'bad-order-number' }, { status: 400 })
  if (name.length < 2 || !isEmail(email) || phone.replace(/\D/g, '').length < 8) return Response.json({ ok: false, error: 'missing-details' }, { status: 400 })
  if (fulfilment === 'delivery' && address.length < 8) return Response.json({ ok: false, error: 'missing-address' }, { status: 400 })
  if (!method) return Response.json({ ok: false, error: 'bad-payment-method' }, { status: 400 })

  const lines = Array.isArray(body.lines) ? body.lines.slice(0, 100) : []
  const t = computeTotals(lines, { paymentMethod: method.id, fulfilment })
  if (!t.items.length) return Response.json({ ok: false, error: 'empty-cart' }, { status: 400 })
  if (!t.meetsMinimum) return Response.json({ ok: false, error: 'below-minimum' }, { status: 400 })

  // Optional account: attach a signed-in user, or create one if asked.
  let userId = null
  try {
    if (accountsEnabled()) {
      const session = await readSession()
      if (session) userId = session.id
      else if (body.createAccount?.password && String(body.createAccount.password).length >= 8 && !(await getUser(email))) {
        const { user } = await createUser({ name, email, phone, password: body.createAccount.password })
        if (user) {
          userId = user.id
          await setSessionCookie(user)
        }
      }
    }
  } catch (err) {
    console.error('account step failed:', err?.message)
  }

  const order = {
    orderNumber,
    channel,
    status: 'pending',
    createdAt: new Date().toISOString(),
    customerName: name,
    customerEmail: email,
    customerPhone: phone,
    userId,
    fulfilment,
    address: fulfilment === 'delivery' ? address : '',
    paymentMethod: method.id,
    paymentLabel: method.label,
    notes: clean(body.notes, 1500),
    items: t.items,
    subtotal: t.subtotal,
    discount: t.discount,
    discountPct: t.discountPct,
    shipping: t.shipping,
    amountDue: t.total,
  }

  let saved = false
  try {
    saved = await saveOrder(order)
  } catch (err) {
    console.error('saveOrder failed:', err?.message)
  }

  const shopMail = orderNotificationEmail(order, base)
  const customerMail = orderConfirmationEmail(order, base)
  const [shop, customer] = await Promise.all([
    sendMail({ to: destination('order'), replyTo: email, ...shopMail }),
    sendMail({ to: email, ...customerMail }), // fires on BOTH channels — never gated on channel
  ])

  const delivered = saved || shop.sent
  // A WhatsApp order has already reached the shop via WhatsApp itself.
  if (!delivered && channel === 'email') {
    return Response.json({ ok: false, error: 'not-configured' }, { status: 503 })
  }
  return Response.json({ ok: true, orderNumber, saved, emailed: shop.sent, confirmationSent: customer.sent, amountDue: t.total })
}

async function handleEnquiry(body, base) {
  const name = clean(body.name, 120)
  const email = clean(body.email, 200).toLowerCase()
  const message = clean(body.message, 4000)
  if (name.length < 2 || !isEmail(email) || message.length < 5) return Response.json({ ok: false, error: 'missing-details' }, { status: 400 })

  const meta = {}
  if (body.formName === 'wholesale') {
    meta['Business name'] = clean(body.business, 160)
    meta['Business type'] = clean(body.businessType, 80)
    meta['ABN'] = clean(body.abn, 20)
    meta['Weekly volume'] = clean(body.volume, 80)
    meta['Location'] = clean(body.location, 120)
  } else {
    meta['Subject'] = clean(body.subject, 120)
  }

  const enquiry = {
    id: generateEnquiryId(),
    type: body.formName,
    status: 'new',
    createdAt: new Date().toISOString(),
    name,
    email,
    phone: clean(body.phone, 40),
    message,
    meta,
  }

  let saved = false
  try {
    saved = await saveEnquiry(enquiry)
  } catch (err) {
    console.error('saveEnquiry failed:', err?.message)
  }
  const mail = enquiryNotificationEmail(enquiry, base)
  const sent = await sendMail({ to: destination(body.formName === 'wholesale' ? 'wholesale' : 'contact'), replyTo: email, ...mail })

  if (!saved && !sent.sent) return Response.json({ ok: false, error: 'not-configured' }, { status: 503 })
  return Response.json({ ok: true, id: enquiry.id })
}
