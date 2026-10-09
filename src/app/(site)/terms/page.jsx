import LegalPage from '@/components/LegalPage'
import { SITE } from '@/config/site'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Terms of Sale | Halal Meat Depot',
  description: 'Terms of sale for Halal Meat Depot: pricing in AUD, pack weights, minimum order, payment by PayID, bank transfer or crypto, delivery and liability.',
  path: '/terms/',
})

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of sale"
      crumb="Terms of Sale"
      path="/terms/"
      intro={`These terms apply to orders placed with ${SITE.legalName} trading as ${SITE.name} (ABN ${SITE.abn}), ${SITE.addressLine}, through this website, email or WhatsApp.`}
      blocks={[
        ['h2', 'Who you are dealing with'],
        ['p', `${SITE.name} is a registered business name of ${SITE.legalName} (ABN ${SITE.abn}). In these terms, "we", "us" and "${SITE.name}" mean ${SITE.legalName}. Contact: {{email}} · ${SITE.phone}.`],
        ['h2', '1. Prices and GST'],
        ['p', 'All prices are in Australian dollars and are per pack as described on each product. Fresh, unprocessed meat is GST-free in Australia. We may change prices at any time, but the price confirmed in your order confirmation email applies to that order.'],
        ['h2', '2. Pack sizes and weights'],
        ['p', 'Packs are sold at a fixed price per pack. Where a product is described as "approx." (for example whole primals and carcasses), the weight shown is a typical weight and individual pieces vary naturally. The price per kilo shown on each product is a guide based on the typical weight.'],
        ['h2', '3. Orders and minimum order'],
        ['p', `The minimum order is $${SITE.minOrder}. Placing an order is an offer to buy; your order is accepted and confirmed once we receive payment. We may decline or cancel an order (for example if a product is unavailable), in which case we refund any payment in full.`],
        ['h2', '4. Payment'],
        ['p', `We accept PayID, bank transfer and cryptocurrency. No payment is taken on the website — we email payment details after you order. Orders paid in cryptocurrency receive ${SITE.cryptoDiscountPct}% off the meat subtotal (not delivery), applied automatically at checkout. Use your order number as the payment reference.`],
        ['h2', '5. Delivery'],
        ['p', 'We deliver Australia-wide; pickup is not available. Delivery is described in our [delivery policy](/shipping/). Risk in the goods passes to you on delivery.'],
        ['h2', '6. Halal certification'],
        ['p', `All products are certified halal by ${SITE.certifier}. A copy of our certificate is available on request.`],
        ['h2', '7. Refunds'],
        ['p', 'Refunds, replacements, returns and cancellations are handled under our [Refund & Returns Policy](/refund/) and the Australian Consumer Law.'],
        ['h2', '8. Accounts'],
        ['p', 'Customer accounts are optional. You are responsible for keeping your password confidential. You can ask us to close your account at any time.'],
        ['h2', '9. Governing law'],
        ['p', 'These terms are governed by the laws of New South Wales, Australia.'],
      ]}
    />
  )
}
