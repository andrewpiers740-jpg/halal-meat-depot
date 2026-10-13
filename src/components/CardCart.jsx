// "Add to cart" for product cards: plain markup with no React state, so a category page
// with 60+ cards doesn't hydrate 60+ interactive islands. A single <CartDelegate /> in the
// site layout handles every card's −/+ and Add clicks (speed audit, 2026-10-13).
// The product page keeps the full <AddToCart /> (one instance, with "View cart").
export default function CardCart({ slug, name, idPrefix = 'q' }) {
  const id = `${idPrefix}-${slug}`
  const label = `Quantity of ${name}`
  return (
    <div className="add-row" data-cart={slug} data-name={name}>
      <div className="qty">
        <button type="button" data-qty="-1" aria-label={`Decrease ${label.toLowerCase()}`} disabled>
          −
        </button>
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <input id={id} type="number" inputMode="numeric" min={1} max={999} defaultValue={1} data-qty-input="" />
        <button type="button" data-qty="1" aria-label={`Increase ${label.toLowerCase()}`}>
          +
        </button>
      </div>
      <button type="button" className="btn btn--primary" data-add="" aria-label={`Add to cart: ${name}`}>
        <span className="when-idle">Add to cart</span>
        <span className="when-added">Added ✓</span>
      </button>
    </div>
  )
}
