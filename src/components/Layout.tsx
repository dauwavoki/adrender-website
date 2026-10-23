import { Outlet } from 'react-router-dom'
import { BetaBanner } from './BetaBanner'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col bg-bg-base">
      <BetaBanner />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
