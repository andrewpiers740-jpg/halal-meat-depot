// "Add to cart" for product cards: plain markup with no React state, so a category page
// with 60+ cards doesn't hydrate 60+ interactive islands. A single <CartDelegate /> in the
// site layout handles every card's −/+ and Add clicks (speed audit, 2026-10-13).
// The product page keeps the full <AddToCart /> (one instance, with "View cart").
const cash = (n) => `$${Number(n).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

// `sizes` (carcasses sold in several weights) renders one radio chip per weight with its price;
// CartDelegate adds the checked chip's cart key (slug~size) instead of the plain slug.
export default function CardCart({ slug, name, idPrefix = 'q', sizes = null }) {
  const id = `${idPrefix}-${slug}`
  const label = `Quantity of ${name}`
  return (
    <>
    {sizes && (
      <fieldset className="card-sizes">
        <legend>Choose a weight — more kg, lower $/kg</legend>
        <div className="cs-list">
          {sizes.map((s) => (
            <label key={s.id} className="cs-o">
              <input type="radio" name={`${idPrefix}${slug}`} value={s.id} data-size="" defaultChecked={s.isDefault} />
              <span className="cs-k">{`${s.kg}kg`}</span>
              <span className="cs-p">{cash(s.price)}</span>
              <span className="cs-r">{`${cash(s.perKg)}/kg`}</span>
            </label>
          ))}
        </div>
      </fieldset>
    )}
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
    </>
  )
}
