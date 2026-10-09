import LegalPage from '@/components/LegalPage'
import { SITE } from '@/config/site'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Refunds & Returns | Halal Meat Depot',
  description: 'How refunds and replacements work for fresh meat orders, in line with the Australian Consumer Law. Report any problem within 24 hours of delivery.',
  path: '/refund/',
})

export default function RefundPage() {
  return (
    <LegalPage
      title="Refunds and returns"
      crumb="Refunds & Returns"
      path="/refund/"
      intro="Fresh meat is perishable, so we handle problems quickly and fairly — and always in line with the Australian Consumer Law."
      blocks={[
        ['h2', 'Your rights under the Australian Consumer Law'],
        ['p', 'Our goods come with guarantees that cannot be excluded under the Australian Consumer Law. You are entitled to a replacement or refund for a major failure, and to compensation for any other reasonably foreseeable loss or damage. Nothing in this policy limits those rights.'],
        ['h2', 'If something is wrong with your order'],
        ['p', 'Please check your order when it arrives. If a product is damaged, spoiled, not what you ordered, or missing, contact us within 24 hours of delivery or pickup with your order number and photos of the product and packaging. We will arrange a replacement, credit or refund.'],
        ['h2', 'Change of mind'],
        ['p', 'Because fresh meat is perishable and food-safety rules prevent us from reselling returned meat, we cannot offer refunds for change of mind once an order has been delivered or collected.'],
        ['h2', 'Cancelling an order'],
        ['p', 'You can cancel an order at no cost before it has been packed for dispatch. If you have already paid, we refund you using the same payment method. Cryptocurrency refunds are made in the same currency to a wallet address you provide.'],
        ['h2', 'How to contact us'],
        ['p', `Message us on WhatsApp on ${SITE.phone} or use our [contact form](/contact/). Include your order number so we can help quickly.`],
      ]}
    />
  )
}
