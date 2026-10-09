import LegalPage from '@/components/LegalPage'
import { SITE } from '@/config/site'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Privacy Policy | Halal Meat Depot',
  description: 'How Halal Meat Depot collects, uses and protects your personal information under the Privacy Act 1988 and the Australian Privacy Principles.',
  path: '/privacy/',
})

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      crumb="Privacy Policy"
      path="/privacy/"
      intro={`${SITE.name} respects your privacy and handles personal information in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.`}
      blocks={[
        ['h2', 'What we collect'],
        ['p', 'When you order, create an account or contact us, we collect your name, email address, phone number, delivery address, order details and any notes you give us. Wholesale enquiries may also include your business name, ABN and location.'],
        ['h2', 'How we use it'],
        ['ul', [
          'To process, deliver and support your orders.',
          'To send order confirmations and payment details.',
          'To reply to your enquiries.',
          'To manage your optional customer account.',
        ]],
        ['p', 'We do not sell your personal information, and we do not use it for marketing without your consent.'],
        ['h2', 'Storage and security'],
        ['p', 'Order and enquiry records are stored with our hosting and database providers. Account passwords are stored only as secure one-way hashes — we cannot see your password. Payment is made directly by bank transfer, PayID or cryptocurrency; we never collect card details on this website.'],
        ['h2', 'Cookies and local storage'],
        ['p', 'Your cart is stored in your own browser. If you sign in, we set one essential cookie to keep you signed in. We do not use advertising or tracking cookies.'],
        ['h2', 'Access and correction'],
        ['p', 'You can view and update your account details on the [My account](/account/) page, or ask us to access, correct or delete your information through our [contact form](/contact/).'],
        ['h2', 'Complaints'],
        ['p', 'If you have a privacy concern, contact us first and we will respond within 30 days. If you are not satisfied, you can contact the Office of the Australian Information Commissioner (OAIC).'],
      ]}
    />
  )
}
