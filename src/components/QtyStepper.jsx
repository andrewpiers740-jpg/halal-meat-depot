'use client'

export default function QtyStepper({ value, onChange, label = 'Quantity', id }) {
  const set = (v) => onChange(Math.max(1, Math.min(999, Math.floor(Number(v) || 1))))
  return (
    <div className="qty">
      <button type="button" aria-label={`Decrease ${label.toLowerCase()}`} onClick={() => set(value - 1)} disabled={value <= 1}>
        −
      </button>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input id={id} type="number" inputMode="numeric" min={1} max={999} value={value} onChange={(e) => set(e.target.value)} />
      <button type="button" aria-label={`Increase ${label.toLowerCase()}`} onClick={() => set(value + 1)}>
        +
      </button>
    </div>
  )
}
