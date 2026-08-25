import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { HashScroll } from './components/HashScroll'
import { Layout } from './components/Layout'
import { AffiliatesPage } from './pages/AffiliatesPage'
import { BlogIndexPage } from './pages/BlogIndexPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { ContactPage } from './pages/ContactPage'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'
import { TermsPage } from './pages/TermsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { VsPage } from './pages/VsPage'
import { SolutionRoutePage } from './pages/SolutionPage'
import { SolutionsIndexPage } from './pages/SolutionsIndexPage'
import { comparisons } from './data/comparisons'
import { solutions } from './data/solutions'

/** Shared route tree — used by the browser SPA and by SSG via StaticRouter. */
export function AppRoutes() {
  return (
    <Routes>
      {/* Public standalone pages — no Layout chrome */}
      <Route path="terms" element={<TermsPage />} />
      <Route path="privacy" element={<PrivacyPage />} />

      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="affiliates" element={<AffiliatesPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="blog" element={<BlogIndexPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        {/* Explicit paths preserve /vs-adcreative URLs under StaticRouter + BrowserRouter. */}
        {comparisons.map((c) => (
          <Route key={c.slug} path={`vs-${c.slug}`} element={<VsPage slug={c.slug} />} />
        ))}
        <Route path="solutions" element={<SolutionsIndexPage />} />
        {solutions.map((s) => (
          <Route key={s.slug} path={`solutions/${s.slug}`} element={<SolutionRoutePage slug={s.slug} />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <HashScroll />
      <AppRoutes />
    </BrowserRouter>
  )
}
