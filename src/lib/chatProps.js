import { SITE, CHAT } from '../config/site.js'
import { encodeEmail } from '../components/EmailLink.jsx'

// Plain, serialisable props for the client-side SupportChat — keeps the rest of the config (and the product catalogue)
// out of the browser bundle. The email is passed entity-encoded (project rule: never plain text).
export const chatProps = {
  siteName: SITE.name,
  whatsapp: SITE.phoneRaw, // digits only, country code included, no +
  phoneIntl: SITE.phoneRaw, // tel: link uses +<digits>
  phoneDisplay: SITE.phone,
  emailEncoded: encodeEmail(SITE.email),
  tawk: SITE.tawk,
  quick: CHAT.quick,
}
