import { SITE } from '@/config/site'
import EmailLink from './EmailLink'

// The business email (SITE.email), entity-encoded. Never render a business
// email as plain text. Client components: use <EmailLink address={...} />.
export default function Email({ address = SITE.email, className, style }) {
  return <EmailLink address={address} className={className} style={style} />
}
