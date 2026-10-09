import AdminShell from '@/components/admin/AdminShell'

export const metadata = {
  title: 'Admin | Halal Meat Depot',
  robots: { index: false, follow: false, nocache: true },
}

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>
}
