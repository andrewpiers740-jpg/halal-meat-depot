import Link from 'next/link'
import { CATEGORIES } from '@/config/site'

// Real links, not JS filters — every category is a crawlable URL.
export default function CategoryChips({ current }) {
  return (
    <nav aria-label="Categories">
      <ul className="chips">
        <li>
          <Link href="/halal-meat-shop/" aria-current={!current ? 'page' : undefined}>
            All products
          </Link>
        </li>
        {CATEGORIES.map((c) => (
          <li key={c.slug}>
            <Link href={`${c.path}`} aria-current={current === c.slug ? 'page' : undefined}>
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
