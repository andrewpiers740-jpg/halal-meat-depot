import Icon from './Icon'
import { CHAT } from '@/config/site'
import { waChatLink } from '@/lib/whatsapp'

// One link channel and no widget → a direct floating button. Real <a href>,
// works without JavaScript, zero third-party scripts.
export default function ChatHub() {
  const wa = CHAT.channels.find((c) => c.type === 'whatsapp')
  if (!wa) return null
  return (
    <a className="chat-fab" href={waChatLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
      <Icon name="chat" />
      <span>WhatsApp us</span>
    </a>
  )
}
