import Link from 'next/link'
import { SITE, REGULATORS, regulatorsFor } from '@/config/site'

// Cites the official bodies that regulate or set standards for a category's meat,
// linking to each one's own website. Pass `cat` for one category, or omit for all.
export default function Regulators({ cat, title = 'Regulation and standards', id = 'regulation' }) {
  const list = cat ? regulatorsFor(cat) : REGULATORS
  return (
    <section aria-labelledby={id} className="regulators">
      <h2 id={id}>{title}</h2>
      <p className="muted">
        Meat sold in Australia is regulated for food safety and labelling by the bodies below. Halal certification of everything we sell is by{' '}
        {SITE.certifier} — <Link href="/halal-certified-meat/">how our meat is certified</Link>.
      </p>
      <ul>
        {list.map((r) => (
          <li key={r.url}>
            <a href={r.url} target="_blank" rel="noopener noreferrer">
              {r.name}
            </a>{' '}
            — {r.role}
          </li>
        ))}
      </ul>
    </section>
  )
}
