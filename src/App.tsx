import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { TermsPage } from './pages/TermsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { VsAdCreative } from './pages/VsAdCreative'
import { VsCanva } from './pages/VsCanva'
import { VsPredis } from './pages/VsPredis'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public standalone pages — no Layout chrome */}
        <Route path="terms" element={<TermsPage />} />
        <Route path="privacy" element={<PrivacyPage />} />

        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="vs-adcreative" element={<VsAdCreative />} />
          <Route path="vs-canva" element={<VsCanva />} />
          <Route path="vs-predis" element={<VsPredis />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
