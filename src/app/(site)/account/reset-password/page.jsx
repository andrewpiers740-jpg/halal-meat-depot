import { Suspense } from 'react'
import ResetPasswordForm from '@/components/ResetPasswordForm'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Reset Password | Halal Meat Depot',
  description: 'Choose a new password for your Halal Meat Depot account. Reset links expire after one hour and can only be used once for your security.',
  path: '/account/reset-password/',
  noindex: true,
})

export default function ResetPasswordPage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 560 }}>
        <div className="card stack">
          <h1 style={{ fontSize: '1.8rem' }}>Choose a new password</h1>
          <Suspense fallback={null}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
