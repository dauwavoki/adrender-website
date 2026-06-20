import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { TermsPage } from './pages/TermsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public standalone page — no Layout chrome */}
        <Route path="terms" element={<TermsPage />} />

        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
