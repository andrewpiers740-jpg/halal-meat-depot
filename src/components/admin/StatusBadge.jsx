const LABELS = {
  pending: ['Pending', 'pending'],
  'payment-sent': ['Payment sent', 'sent'],
  'payment-confirmed': ['Payment confirmed', 'confirmed'],
  new: ['New', 'new'],
  replied: ['Replied', 'replied'],
}

export default function StatusBadge({ status }) {
  const [label, cls] = LABELS[status] || [status, 'channel']
  return <span className={`pill pill--${cls}`}>{label}</span>
}

export function ChannelBadge({ channel }) {
  return <span className="pill pill--channel">{channel === 'whatsapp' ? 'WhatsApp' : 'Website'}</span>
}
