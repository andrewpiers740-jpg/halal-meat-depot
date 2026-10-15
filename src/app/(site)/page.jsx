import Link from 'next/link'
import Icon from '@/components/Icon'
import Email from '@/components/Email'
import SmartImage from '@/components/SmartImage'
import HeroSlider from '@/components/HeroSlider'
import { categoryImageSeo, imageObject } from '@/lib/imageSeo'
import ProductCard from '@/components/ProductCard'
import JsonLd from '@/components/JsonLd'
import { SITE, CATEGORIES, PRODUCTS, POSTS, FAQS, categoryImage } from '@/config/site'
import { organizationSchema, websiteSchema, faqSchema, speakableSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/meta'
import { waChatLink } from '@/lib/whatsapp'

export const metadata = pageMeta({
  title: 'Fresh Halal Meat Delivery Sydney & Australia | HMD',
  description:
    'Halal meat delivery from Sydney, Australia-wide: beef, lamb, goat, chicken, camel and more, certified by Halal Control Australia. Order online, depot prices.',
  path: '/',
})

const homeFaqs = FAQS.filter((f) => f.home)

// Homepage category tiles: Wholesale Cartons first, the rest in their usual order.
const homeCategories = [...CATEGORIES.filter((c) => c.slug === 'wholesale-cartons'), ...CATEGORIES.filter((c) => c.slug !== 'wholesale-cartons')]

// Hero background slides (sources in assets/hero/ → npm run images).
// AVIF at each generated width (scripts/images.mjs step 1c). Alt, title, caption and
// description carry the homepage focus keyword, "halal meat" (image SEO rule).
const HERO_SLIDES = [
  {
    name: 'hero-1',
    widths: [640, 768, 1080],
    height: 608, // intrinsic height at 1080px wide
    alt: 'Halal meat barbecue spread with sliced brisket, ribs and sausages',
    title: 'Halal meat for the barbecue',
    caption: 'Halal meat for the barbecue',
    description: 'A barbecue spread of halal meat — sliced brisket, ribs and sausages — from Halal Meat Depot, delivered Australia-wide.',
  },
  {
    name: 'hero-2',
    widths: [640, 768, 1080],
    height: 608, // intrinsic height at 1080px wide
    position: 'center top',
    alt: 'Halal meat: lamb leg, lamb chops and lamb racks with herbs and spices',
    title: 'Halal meat: lamb leg, chops and racks',
    caption: 'Halal meat: lamb leg, chops and racks',
    description: 'Raw halal meat — a whole lamb leg, lamb chops and frenched lamb racks — certified by Halal Control Australia.',
  },
  {
    name: 'hero-3',
    widths: [640, 768, 1080],
    height: 612, // intrinsic height at 1080px wide
    alt: 'Halal meat: raw steaks and whole chickens on a wooden board',
    title: 'Halal meat: steaks and whole chickens',
    caption: 'Halal meat: steaks and whole chickens',
    description: 'Raw halal meat — thick-cut steaks and whole chickens — from Halal Meat Depot in Greenacre, Sydney.',
  },
].map((s) => ({ ...s, src: `/images/hero/${s.name}-v2-${s.widths.at(-1)}.avif`, srcSet: s.widths.map((w) => `/images/hero/${s.name}-v2-${w}.avif ${w}w`).join(', ') }))

export default function HomePage() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8)
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
  const meatTypes = CATEGORIES.filter((c) => c.slug !== 'wholesale-cartons').length

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          websiteSchema(),
          faqSchema(homeFaqs),
          speakableSchema('/', ['.brand-statement', '.about-intro']),
          {
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: 'Halal meat from Halal Meat Depot',
            url: `${SITE.url}/`,
            image: HERO_SLIDES.map((s) => imageObject(`${SITE.url}${s.src}`, s, { encodingFormat: 'image/avif' })),
          },
        ]}
      />

      {/* 1 — Hero */}
      <section className="hero hero--slides" aria-labelledby="hero-title">
        <HeroSlider slides={HERO_SLIDES} />
        <div className="container">
          <div className="reveal">
            <span className="hero-pill">
              <Icon name="shield" /> Certified halal by {SITE.certifier}
            </span>
            <h1 id="hero-title">
              Halal meat delivery from Sydney to all of Australia, at <em>depot prices</em>
            </h1>
            <p className="brand-statement">{SITE.brandStatement}</p>
            <div className="btn-row" style={{ marginTop: 24 }}>
              <Link href="/halal-meat-shop/" className="btn btn--accent">
                Shop all halal meat <Icon name="arrow" />
              </Link>
              <Link href="/halal-meat-wholesale/" className="btn btn--light">
                Wholesale accounts
              </Link>
            </div>
            <div className="hero-facts">
              <span>
                <Icon name="truck" /> Free delivery over ${SITE.freeShipOver}
              </span>
              <span>
                <Icon name="percent" /> {SITE.cryptoDiscountPct}% off with crypto
              </span>
              <span>
                <Icon name="pin" /> Greenacre, Sydney · since {SITE.founded}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Trust bar */}
      <section className="section section--tint section--tight" aria-label="Why order from us">
        <div className="container trust">
          <div className="trust-item">
            <span className="icon-badge"><Icon name="shield" /></span>
            <div>
              <strong>Certified halal</strong>
              <span>Every product certified by {SITE.certifier}</span>
            </div>
          </div>
          <div className="trust-item">
            <span className="icon-badge"><Icon name="truck" /></span>
            <div>
              <strong>Australia-wide delivery</strong>
              <span>Free over ${SITE.freeShipOver}, otherwise ${SITE.flatShip} flat</span>
            </div>
          </div>
          <div className="trust-item">
            <span className="icon-badge"><Icon name="percent" /></span>
            <div>
              <strong>{SITE.cryptoDiscountPct}% off with crypto</strong>
              <span>Applied automatically at checkout</span>
            </div>
          </div>
          <div className="trust-item">
            <span className="icon-badge"><Icon name="chat" /></span>
            <div>
              <strong>Order online or on WhatsApp</strong>
              <span>Same order, same confirmation email</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Categories */}
      <section className="section" aria-labelledby="cats-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Shop by category</span>
            <h2 id="cats-title">Halal meat for every kitchen</h2>
            <p>Eight kinds of halal meat plus trade cartons — choose a category to see every cut, pack size and price.</p>
          </div>
          <div className="grid-3">
            {homeCategories.map((c, i) => {
              const img = categoryImageSeo(c)
              return (
                <Link key={c.slug} href={`${c.path}`} className="cat-tile">
                  <figure className="cat-figure">
                    <SmartImage src={`/images/categories/${categoryImage(c.slug)}`} alt={img.alt} title={img.title} fill sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw" />
                    <span className="scrim" aria-hidden="true" />
                    <figcaption className="cat-label">
                      <strong>{img.caption}</strong>
                      <span>{c.tagline}</span>
                    </figcaption>
                  </figure>
                </Link>
              )
            })}
          </div>
          <p style={{ marginTop: 24, textAlign: 'center' }}>
            Also popular: <Link href="/wagyu-steak/">Wagyu steak MB5+ and MB9+</Link> ·{' '}
            <Link href="/whole-lamb-aqeeqah-qurbani/">whole lamb and goat for Aqeeqah and Qurbani</Link>
          </p>
        </div>
      </section>

      {/* 4 — Featured products */}
      <section className="section section--tint" aria-labelledby="featured-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Popular at the depot</span>
            <h2 id="featured-title">Featured halal cuts and bulk packs</h2>
            <p>Our most-ordered packs — from whole lamb and goat to chicken fillets and Wagyu.</p>
          </div>
          <div className="product-grid product-grid--4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="center" style={{ marginTop: 32 }}>
            <Link href="/halal-meat-shop/" className="btn btn--primary">
              View all {PRODUCTS.length} products <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5 — Authority section */}
      <section className="section" aria-labelledby="about-title">
        <div className="container split">
          <div className="prose">
            <span className="eyebrow">About Halal Meat Depot</span>
            <h2 id="about-title">A Sydney halal meat depot serving all of Australia</h2>
            <p className="about-intro">
              Halal Meat Depot was established in {SITE.founded} at {SITE.addressLine}, in Sydney&apos;s south-west. We supply halal meat by the
              pack, the carcass and the carton to households, restaurants, takeaways, caterers and community groups, and we deliver
              Australia-wide.
            </p>
            <p>
              Every product we sell — from <Link href="/shop/halal-beef/">halal beef</Link> and <Link href="/shop/lamb/">lamb</Link> to{' '}
              <Link href="/shop/goat-meat-for-sale/">goat</Link>, <Link href="/shop/halal-chicken/">chicken</Link>, <Link href="/shop/camel-meat-australia/">camel</Link>,{' '}
              <Link href="/shop/duck-meat/">duck</Link>, <Link href="/shop/kangaroo-meat-for-sale/">kangaroo</Link> and{' '}
              <Link href="/shop/buffalo-meat/">water buffalo</Link> — is certified halal by {SITE.certifier}. We use one certifier across the whole
              range, so you always know exactly who stands behind the halal status of your meat. Read more on our <Link href="/halal-certified-meat/">halal certification page</Link>.
            </p>
            <h3>What makes us different</h3>
            <p>
              Unlike a typical retail butcher, we are set up as a depot: products are sold in practical bulk packs — 2kg, 3kg and 5kg packs,
              whole and half carcasses, and 10–20kg cartons — priced per pack with the price per kilo shown on every product. That makes
              it simple to stock a family freezer, cater an event or run a commercial kitchen.
            </p>
            <p>
              We also carry meats that are hard to find certified halal in one place. Alongside everyday beef, lamb, goat and chicken, you
              can order camel steaks and tomahawk, whole and corn-fed duck, kangaroo fillet and water buffalo tomahawk in the same order.
            </p>
            <h3>How ordering works</h3>
            <p>
              The minimum order is ${SITE.minOrder}. We deliver Australia-wide — free on orders over ${SITE.freeShipOver}, otherwise a flat $
              {SITE.flatShip}. We accept PayID, bank transfer and cryptocurrency — paying in crypto takes{' '}
              {SITE.cryptoDiscountPct}% off your meat total automatically. Fresh, unprocessed meat is GST-free in Australia.
            </p>
            <p>
              Restaurants and caterers can order <Link href="/shop/bulk-meat-boxes/">wholesale cartons</Link> online or{' '}
              <Link href="/halal-meat-wholesale/">apply for a weekly account</Link>. New to cooking camel or kangaroo? Start with our{' '}
              <Link href="/blog/cooking-camel-meat-buffalo-kangaroo/">guide to cooking lean meats</Link>.
            </p>
          </div>
          <div className="stack">
            <div className="card card--tint">
              <span className="icon-badge"><Icon name="store" /></span>
              <h3>Our depot</h3>
              <p className="muted" style={{ marginBottom: 8 }}>{SITE.addressLine}</p>
              <ul className="check-list">
                {SITE.hours.map((h) => (
                  <li key={h.days}>
                    <Icon name="clock" /> {h.days}: {h.opens}–{h.closes}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <span className="icon-badge"><Icon name="award" /></span>
              <h3>Registered Australian business</h3>
              <p className="muted" style={{ marginBottom: 0 }}>
                {SITE.legalName} trading as {SITE.name}
                <br />
                ABN{' '}
                <a href={SITE.abnUrl} target="_blank" rel="noopener noreferrer">
                  {SITE.abn}
                </a>{' '}
                · Operating since {SITE.founded}
                <br />
                <Email />
              </p>
            </div>
            <div className="card card--dark">
              <span className="icon-badge"><Icon name="chat" /></span>
              <h3>Questions before you order?</h3>
              <p>Message us on WhatsApp for cuts, quantities and event orders.</p>
              <a className="btn btn--wa" href={waChatLink()} target="_blank" rel="noopener noreferrer">
                WhatsApp {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Stat strip (real numbers only) */}
      <section className="section section--dark section--tight" aria-label="Halal Meat Depot in numbers">
        <div className="container stats">
          <div className="stat">
            <b>{SITE.founded}</b>
            <span>Established in Greenacre, Sydney</span>
          </div>
          <div className="stat">
            <b>{PRODUCTS.length}</b>
            <span>Products in our range</span>
          </div>
          <div className="stat">
            <b>{meatTypes}</b>
            <span>Kinds of halal meat</span>
          </div>
          <div className="stat">
            <b>AU-wide</b>
            <span>Delivery across Australia</span>
          </div>
        </div>
      </section>

      {/* 7 — How to order */}
      <section className="section section--tint" aria-labelledby="how-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Simple ordering</span>
            <h2 id="how-title">How to order halal meat online</h2>
            <p>Four steps from cart to your kitchen — no account needed.</p>
          </div>
          <ol className="grid-4" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              ['cart', 'Build your cart', `Choose packs from any category. The minimum order is $${SITE.minOrder}.`],
              ['file', 'Check out', 'Place the order online or send it on WhatsApp — you get a confirmation email either way.'],
              ['mail', 'Receive payment details', `We email payment details for PayID, bank transfer or crypto (${SITE.cryptoDiscountPct}% off).`],
              ['truck', 'Delivery', 'Once payment clears, we pack your order chilled and confirm your delivery date with you.'],
            ].map(([icon, title, text], i) => (
              <li key={title} className="card">
                <span className="icon-badge"><Icon name={icon} /></span>
                <h3>
                  {i + 1}. {title}
                </h3>
                <p className="muted" style={{ margin: 0 }}>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8 — FAQ */}
      <section className="section" aria-labelledby="faq-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Questions</span>
            <h2 id="faq-title">Halal Meat Depot FAQ</h2>
            <p>
              Quick answers about certification, delivery and ordering. See the <Link href="/faq/">full FAQ</Link> for more.
            </p>
          </div>
          <div className="faq">
            {homeFaqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <div className="answer">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9 — Blog */}
      <section className="section section--tint" aria-labelledby="blog-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Guides</span>
            <h2 id="blog-title">From the Halal Meat Depot blog</h2>
            <p>Cut guides, cooking tips and what halal certification means when you buy.</p>
          </div>
          <div className="grid-3">
            {posts.map((p) => (
              <article key={p.slug} className="post-card">
                <div className="post-band" aria-hidden="true">{p.kw}</div>
                <div className="post-body">
                  <time dateTime={p.date}>{new Date(p.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                  <h3>
                    <Link href={`/blog/${p.slug}/`}>{p.title}</Link>
                  </h3>
                  <p className="muted">{p.excerpt}</p>
                  <Link href={`/blog/${p.slug}/`} className="read" aria-label={`Read the guide: ${p.title}`}>
                    Read the guide →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — Wholesale CTA */}
      <section className="section section--dark" aria-labelledby="trade-title">
        <div className="container split" style={{ alignItems: 'center' }}>
          <div>
            <span className="eyebrow">For restaurants &amp; caterers</span>
            <h2 id="trade-title">Wholesale halal meat for your kitchen</h2>
            <p>
              Order trade cartons online, or open a weekly account with a price sheet for your regular cuts and standing orders scheduled
              with you.
            </p>
          </div>
          <div className="btn-row">
            <Link href="/halal-meat-wholesale/" className="btn btn--accent">
              Apply for a wholesale account
            </Link>
            <Link href="/shop/bulk-meat-boxes/" className="btn btn--light">
              Browse trade cartons
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
