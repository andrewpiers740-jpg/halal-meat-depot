import Breadcrumbs from './Breadcrumbs'
import RichText from './RichText'

export default function LegalPage({ title, path, crumb, intro, blocks, updated = '2026-10-09' }) {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: crumb, path }]} />
          <h1>{title}</h1>
          <p className="lead">{intro}</p>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <article className="card prose" style={{ maxWidth: 860 }}>
            <RichText blocks={blocks} />
            <p className="muted" style={{ fontSize: '0.85rem', marginBottom: 0 }}>
              Last updated <time dateTime={updated}>{new Date(updated).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</time>.
            </p>
          </article>
        </div>
      </div>
    </>
  )
}
