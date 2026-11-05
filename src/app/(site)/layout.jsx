import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatHub from '@/components/ChatHub'
import CartDelegate from '@/components/CartDelegate'
import Chunk from '@/components/Chunk'
import { SITE } from '@/config/site'
import { headerProps } from '@/lib/headerProps'

export default function SiteLayout({ children }) {
  return (
    <>
      <div className="announce">
        Certified halal by <strong>{SITE.certifier}</strong> · Free delivery over ${SITE.freeShipOver} · {SITE.cryptoDiscountPct}% off with crypto
      </div>
      <Header {...headerProps} />
      <main id="main">
        <Chunk>{children}</Chunk>
      </main>
      <Chunk>
        <Footer />
      </Chunk>
      <Chunk>
        <ChatHub />
      </Chunk>
      <CartDelegate />
    </>
  )
}
