import LegalPage from '@/components/LegalPage'
import { SITE } from '@/config/site'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Delivery Policy | Halal Meat Depot',
  description: `Halal meat delivered Australia-wide from Greenacre, Sydney: free delivery over $${SITE.freeShipOver}, otherwise $${SITE.flatShip} flat. Minimum order $${SITE.minOrder}.`,
  path: '/shipping/',
})

export default function ShippingPage() {
  return (
    <LegalPage
      title="Delivery policy"
      crumb="Delivery Policy"
      path="/shipping/"
      intro="We are a delivery-only business: every order is packed chilled at our Greenacre, Sydney depot and delivered to your address anywhere in Australia."
      blocks={[
        ['h2', 'Order rules at a glance'],
        ['ul', [
          `Minimum order: $${SITE.minOrder} (meat subtotal, before discounts).`,
          `Delivery fee: free on orders of $${SITE.freeShipOver} or more; a flat $${SITE.flatShip} below that.`,
          'Delivery area: Australia-wide.',
          'Pickup: not available — all orders are delivered.',
          `Payment: PayID, bank transfer or cryptocurrency (${SITE.cryptoDiscountPct}% off the meat total).`,
        ]],
        ['h2', 'When your order is dispatched'],
        ['p', 'After you place an order we email you the payment details for the method you chose. Your order is confirmed once payment is received. We then pack it chilled and confirm the delivery date with you by email, phone or WhatsApp before it leaves our depot.'],
        ['h2', 'Delivery times'],
        ['p', 'Delivery times depend on where you are in Australia. We tell you the expected delivery date before dispatch. If we cannot deliver to your address, we will contact you before you pay, or refund you in full if you have already paid.'],
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
