import LegalPage from '@/components/LegalPage'
import { SITE } from '@/config/site'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Refund & Returns Policy | Halal Meat Depot',
  description: 'Our Refund & Returns Policy for fresh halal meat: report a problem within 48 hours for a replacement or refund, in line with the Australian Consumer Law.',
  path: '/refund/',
})

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund & Returns Policy"
      crumb="Refund & Returns Policy"
      path="/refund/"
      intro="Fresh meat is perishable, so we handle problems quickly and fairly. This policy explains when you can get a replacement or refund, how to ask for one, and how refunds are paid."
      blocks={[
        ['h2', 'Summary'],
        ['ul', [
          'Report any problem within 48 hours of delivery, with your order number and photos.',
          'Damaged, spoiled, incorrect or missing items are replaced or refunded.',
          'We do not accept change-of-mind returns on fresh meat.',
          'You can cancel for a full refund any time before your order is packed for dispatch.',
          'Approved refunds are paid within 5 business days, using your original payment method.',
        ]],
        ['h2', 'Your rights under the Australian Consumer Law'],
        ['p', 'Our goods come with guarantees that cannot be excluded under the Australian Consumer Law. You are entitled to a replacement or refund for a major failure and compensation for any other reasonably foreseeable loss or damage. You are also entitled to have the goods repaired or replaced if the goods fail to be of acceptable quality and the failure does not amount to a major failure. Nothing in this policy limits those rights.'],
        ['h2', 'Check your order when it arrives'],
        ['p', 'Please open and check your order as soon as it is delivered, and refrigerate or freeze it straight away. Check that every item on your order confirmation is there, that packaging is intact, and that the meat is cold.'],
        ['h2', 'When we replace or refund'],
        ['p', 'We will replace the item or refund you if a product:'],
        ['ul', [
          'arrives damaged, with broken or leaking vacuum packaging;',
          'arrives warm or spoiled, or is not of acceptable quality;',
          'is not what you ordered (wrong product, cut or pack size);',
          'is missing from your delivery.',
        ]],
        ['h2', 'How to report a problem'],
        ['ul', [
          'Contact us within 48 hours of delivery — email {{email}}, WhatsApp ' + SITE.phone + ', or use our [contact form](/contact/).',
          'Include your order number (it starts with HMD-) and a short description of the problem.',
          'Send clear photos of the product, its packaging and label, and the delivery carton.',
          'Keep the product refrigerated or frozen and do not use it until we have replied — we may ask for more photos.',
        ]],
        ['p', 'Reporting within 48 hours lets us investigate while the product is still fresh. If you contact us later, we will still consider your request under the Australian Consumer Law.'],
        ['h2', 'What happens next'],
        ['p', 'We reply as soon as we can during business hours. If your claim is approved, you can choose a replacement (sent on a later delivery) or a refund for the affected items, including any delivery fee you paid for them where the whole order was affected.'],
        ['h2', 'Returning products'],
        ['p', 'For food-safety reasons we normally do not need you to send meat back. If we do need a product returned, we will arrange and pay for it. Please do not send returns without contacting us first.'],
        ['h2', 'Change of mind'],
        ['p', 'Because fresh meat is perishable and food-safety rules prevent us from reselling returned meat, we cannot offer refunds or exchanges for change of mind once an order has been delivered — for example if you ordered the wrong quantity or no longer need it.'],
        ['h2', 'Cancelling an order'],
        ['p', 'You can cancel an order at no cost any time before it has been packed for dispatch — just message us with your order number. If you have already paid, we refund you in full. Once an order has been packed or dispatched, it can no longer be cancelled.'],
        ['h2', 'Deliveries that could not be completed'],
        ['p', 'If we could not deliver because the address was incorrect, or nobody was available and no safe place was given, please see our [delivery policy](/shipping/). We will always try to contact you first.'],
        ['h2', 'How refunds are paid'],
        ['ul', [
          'PayID and bank transfer payments are refunded to the account they came from.',
          'Cryptocurrency payments are refunded in the same cryptocurrency, to a wallet address you give us, for the Australian-dollar amount you paid.',
          'Approved refunds are sent within 5 business days. Your bank or network may take a little longer to show the funds.',
        ]],
        ['h2', 'Wholesale and trade customers'],
        ['p', 'The same policy applies to wholesale cartons. For weekly accounts, any different terms we agree with you in writing also apply.'],
        ['h2', 'Contact us'],
        ['p', `${SITE.legalName} trading as ${SITE.name} · ${SITE.addressLine} · ABN ${SITE.abn}`],
        ['p', `Email {{email}} · WhatsApp or phone ${SITE.phone} · [Contact form](/contact/)`],
      ]}
    />
  )
}
