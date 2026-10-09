import Link from 'next/link'
import JsonLd from './JsonLd'
import { breadcrumbSchema } from '@/lib/schema'

// Visible breadcrumbs and BreadcrumbList schema are built from the same array,
// so they can never disagree. crumbs: [{ name, path }] (Home is added).
export default function Breadcrumbs({ crumbs }) {
  const all = [{ name: 'Home', path: '/' }, ...crumbs]
  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        <ol>
          {all.map((c, i) => (
            <li key={c.path}>
              {i === all.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.path}>{c.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  )
}
