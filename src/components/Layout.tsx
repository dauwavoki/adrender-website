import { Outlet } from 'react-router-dom'
import { BetaBanner } from './BetaBanner'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout() {
  return (
    <div className="site-root">
      <div className="site-rail site-rail-left" aria-hidden />
      <div className="site-rail site-rail-right" aria-hidden />
      <BetaBanner />
      <Header />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
