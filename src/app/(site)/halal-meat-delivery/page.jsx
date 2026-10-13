import LegalPage from '@/components/LegalPage'
import { SITE } from '@/config/site'
import { ZONES_BY_DISTANCE, PRIORITY_FROM } from '@/config/delivery'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Fresh Halal Meat Delivery Policy | Australia-Wide | HMD',
  description: `Halal meat delivery Australia-wide from Greenacre: free over $${SITE.freeShipOver} in ${SITE.delivery.transitDays[0]}–${SITE.delivery.transitDays[1]} days, or Priority Delivery from $${PRIORITY_FROM} priced by distance.`,
  path: '/halal-meat-delivery/',
})

export default function ShippingPage() {
  return (
    <LegalPage
      title="Halal meat delivery policy"
      crumb="Delivery Policy"
      path="/halal-meat-delivery/"
      intro="We are a delivery-only business: every order is packed chilled at our Greenacre, Sydney depot and delivered to your address anywhere in Australia."
      blocks={[
        ['h2', 'Order rules at a glance'],
        ['ul', [
          `Minimum order: $${SITE.minOrder} (meat subtotal, before discounts).`,
          `Standard Delivery (${SITE.delivery.transitDays[0]}–${SITE.delivery.transitDays[1]} days): free on orders of $${SITE.freeShipOver} or more; a flat $${SITE.flatShip} below that.`,
          `Priority Delivery: from $${PRIORITY_FROM}, priced by distance from our Greenacre depot — within 24 hours across Sydney and surrounds.`,
          'Delivery area: Australia-wide.',
          'Pickup: not available — all orders are delivered.',
          `Payment: PayID, bank transfer or cryptocurrency (${SITE.cryptoDiscountPct}% off the meat total).`,
        ]],
        ['h2', 'Priority Delivery prices by distance', 'priority'],
        ['p', 'Need it sooner? Choose Priority Delivery at checkout. The price depends on how far your postcode is from our depot at 43 Banksia Rd, Greenacre NSW 2190, and it applies to every order size. Delivery times are counted from when your payment clears, and we confirm your delivery date with you before dispatch.'],
        ['table', {
          caption: 'Priority Delivery zones, prices and delivery times',
          head: ['Zone', 'Distance from Greenacre', 'Priority price', 'Priority delivery time'],
          rows: ZONES_BY_DISTANCE.map((z) => [z.name, z.distance, `$${z.priorityPrice}`, z.priorityTime]),
        }],
        ['p', 'Your zone is worked out from your postcode at checkout, and the price is shown before you place the order. Standard Delivery is still available everywhere and stays free over $' + SITE.freeShipOver + '.'],
        ['h2', 'When your order is dispatched'],
        ['p', 'After you place an order we email you the payment details for the method you chose. Your order is confirmed once payment is received. We then pack it chilled and confirm the delivery date with you by email, phone or WhatsApp before it leaves our depot.'],
        ['h2', 'Delivery times'],
        ['p', `Standard Delivery takes ${SITE.delivery.transitDays[0]}–${SITE.delivery.transitDays[1]} days, depending on where you are in Australia. We tell you the expected delivery date before dispatch. If we cannot deliver to your address, we will contact you before you pay, or refund you in full if you have already paid.`],
        ['h2', 'Receiving your delivery'],
        ['p', 'Fresh meat is perishable. Please make sure someone is available to receive the delivery, or leave clear instructions in the order notes for a safe, shaded place. Refrigerate or freeze your order as soon as it arrives, and check it straight away.'],
        ['h2', 'Incorrect address or missed delivery'],
        ['p', 'Please double-check your delivery address at checkout. If a delivery cannot be completed because the address was incorrect or nobody was available and no safe place was given, contact us straight away and we will do our best to help. Because meat is perishable, we may not be able to re-deliver or refund an order that could not be delivered for these reasons.'],
        ['h2', 'Damaged or missing items'],
        ['p', 'If anything arrives damaged, warm, spoiled, incorrect or missing, see our [Refund & Returns Policy](/refund/) — please contact us within 48 hours of delivery.'],
        ['h2', 'Questions'],
        ['p', `Email {{email}}, message us on WhatsApp on ${SITE.phone}, use our [contact form](/contact/), or see the [FAQ](/faq/).`],
        ['p', `${SITE.name} is a business name of ${SITE.legalName} (ABN ${SITE.abn}).`],
      ]}
    />
  )
}
