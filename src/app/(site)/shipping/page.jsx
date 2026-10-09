import LegalPage from '@/components/LegalPage'
import { SITE } from '@/config/site'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Delivery & Pickup | Halal Meat Depot',
  description: `Halal meat delivered Australia-wide: free delivery over $${SITE.freeShipOver}, otherwise $${SITE.flatShip} flat. Free pickup from Greenacre, NSW. Minimum order $${SITE.minOrder}.`,
  path: '/shipping/',
})

export default function ShippingPage() {
  return (
    <LegalPage
      title="Delivery and pickup"
      crumb="Delivery & Pickup"
      path="/shipping/"
      intro={`We deliver certified halal meat Australia-wide, or you can pick up for free from our depot at ${SITE.addressLine}.`}
      blocks={[
        ['h2', 'Order rules at a glance'],
        ['ul', [
          `Minimum order: $${SITE.minOrder} (meat subtotal, before discounts).`,
          `Delivery: free on orders of $${SITE.freeShipOver} or more; a flat $${SITE.flatShip} below that.`,
          `Pickup: always free from ${SITE.addressLine}.`,
          `Payment: PayID, bank transfer or cryptocurrency (${SITE.cryptoDiscountPct}% off the meat total).`,
        ]],
        ['h2', 'When your order is dispatched'],
        ['p', 'After you place an order we email you the payment details for the method you chose. Your order is confirmed once payment is received. We then pack it chilled and confirm the delivery date (or pickup time) with you by email, phone or WhatsApp.'],
        ['h2', 'Where we deliver'],
        ['p', 'We deliver Australia-wide. Delivery times depend on your location; we tell you the expected delivery date before dispatch. If we cannot deliver to a particular address, we will contact you before taking payment.'],
        ['h2', 'Receiving your delivery'],
        ['p', 'Fresh meat is perishable. Please make sure someone is available to receive the delivery, or leave clear instructions in the order notes for a safe, shaded place. Refrigerate or freeze your order as soon as it arrives.'],
        ['h2', 'Pickup'],
        ['p', `Choose pickup at checkout and we will confirm when your order is ready. Our opening hours are ${SITE.hours.map((h) => `${h.days} ${h.opens}–${h.closes}`).join(', ')}.`],
        ['h2', 'Questions'],
        ['p', 'For delivery questions, [contact us](/contact/) or see the [FAQ](/faq/). For problems with a delivered order, see our [refunds policy](/refund/).'],
      ]}
    />
  )
}
