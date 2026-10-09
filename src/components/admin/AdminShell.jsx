'use client'
import Link from 'next/link'
import PasscodeGate from './PasscodeGate'
import { AdminPasscodeProvider } from './AdminPasscodeContext'
import { REPLY, SITE } from '@/config/site'

export default function AdminShell({ children }) {
  return (
    <div className="admin" style={{ '--admin-accent': REPLY.brand.primary }}>
      <PasscodeGate>
        {(passcode, signOut) => (
          <AdminPasscodeProvider passcode={passcode} signOut={signOut}>
            <nav className="admin-nav" aria-label="Admin">
              <div className="container">
                <Link href="/admin/" className="brand">
                  {SITE.name} · Admin
                </Link>
                <Link href="/admin/">Dashboard</Link>
                <Link href="/admin/orders/">Orders</Link>
                <Link href="/admin/enquiries/">Enquiries</Link>
                <Link href="/" target="_blank">
                  View site
                </Link>
                <button type="button" className="btn btn--ghost btn--sm" onClick={signOut}>
                  Sign out
                </button>
              </div>
            </nav>
            <main id="main" className="container" style={{ paddingTop: 28, paddingBottom: 60 }}>
              {children}
            </main>
          </AdminPasscodeProvider>
        )}
      </PasscodeGate>
    </div>
  )
}
