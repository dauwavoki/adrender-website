export function PrivacyPage() {
  return (
    <div className="min-h-dvh bg-[#0a0a0f] text-zinc-300">
      {/* Minimal standalone header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0f]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 md:px-6">
          <a
            href="https://adrender.app"
            className="inline-flex shrink-0 items-center gap-2.5 font-semibold tracking-tight text-white"
            style={{ fontFamily: "'Syne', ui-sans-serif, system-ui, sans-serif" }}
          >
            <img
              src="/WebApp_Main_Logo.png"
              alt=""
              aria-hidden
              className="h-[32px] w-auto"
            />
            <span className="text-[18px] leading-none">AdRender</span>
          </a>
          <a
            href="https://app.adrender.app"
            className="flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-[#00e5ff]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
            Back
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 pb-24 pt-12 md:px-6">
        {/* Page title */}
        <div className="mb-10 border-b border-white/[0.06] pb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Last updated: June 2026 &nbsp;·&nbsp; Effective: June 2026
          </p>
        </div>

        <div className="space-y-10 text-[15px] leading-relaxed">

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">1. Introduction</h2>
            <p>
              ADRENDER LLC, a Florida limited liability company ("AdRender," "we," "us," or "our"), operates the
              AdRender platform at{' '}
              <a href="https://app.adrender.app" className="text-[#00e5ff] hover:underline">app.adrender.app</a>.
              This Privacy Policy explains how we collect, use, disclose, and protect your information when you use
              our Service. By using the Service you agree to the practices described here. Capitalized terms not
              defined here have the meanings given in our Terms and Conditions at{' '}
              <a href="https://adrender.app/terms" className="text-[#00e5ff] hover:underline">adrender.app/terms</a>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">2. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">2.1 Information You Provide</h3>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <span className="font-medium text-zinc-200">Account information:</span> name, email address, and
                    password when you register.
                  </li>
                  <li>
                    <span className="font-medium text-zinc-200">Brand assets:</span> logos, color palettes, brand
                    documents, product images, and other files you upload to build your brand profile.
                  </li>
                  <li>
                    <span className="font-medium text-zinc-200">Prompts and generation inputs:</span> text prompts,
                    reference images, and settings you provide when generating ads.
                  </li>
                  <li>
                    <span className="font-medium text-zinc-200">Support communications:</span> messages and attachments
                    you send through our in-app support system.
                  </li>
                  <li>
                    <span className="font-medium text-zinc-200">Payment information:</span> billing details collected
                    and processed directly by Stripe. We do not store full card numbers or bank account details.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">2.2 Information We Collect Automatically</h3>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <span className="font-medium text-zinc-200">Usage data:</span> pages visited, features used,
                    generation history, filter selections, and session duration.
                  </li>
                  <li>
                    <span className="font-medium text-zinc-200">Device and connection data:</span> IP address, browser
                    type, operating system, and referring URLs.
                  </li>
                  <li>
                    <span className="font-medium text-zinc-200">Log data:</span> error logs, performance data, and API
                    request logs retained for up to 90 days.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">2.3 Information From Third Parties</h3>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <span className="font-medium text-zinc-200">Shopify:</span> if you connect a Shopify store, we
                    receive product names, descriptions, images, variants, pricing, and store metadata via Shopify's
                    API, solely to provide the Service. We do not receive customer payment data or order financial
                    details from Shopify.
                  </li>
                  <li>
                    <span className="font-medium text-zinc-200">Foreplay API:</span> we receive advertising template
                    metadata (brand names, ad copy, niche tags, platform data) to power the template discovery feature.
                    This is aggregated public advertising data, not personal data about you.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">3. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Create and maintain your account and provide the Service.</li>
              <li>Generate AI-powered ad images based on your inputs and brand assets.</li>
              <li>Process payments and manage your subscription and token balance.</li>
              <li>Send transactional emails (receipts, plan changes, renewal reminders, support replies).</li>
              <li>Respond to support requests and resolve disputes.</li>
              <li>Detect, investigate, and prevent fraud, abuse, and security incidents.</li>
              <li>
                Improve and develop the Service, including training internal systems on aggregated, de-identified
                usage patterns (never on your brand assets or generated outputs without your explicit consent).
              </li>
              <li>Comply with legal obligations.</li>
            </ul>
            <p className="mt-3">
              We do not use your data for third-party advertising and we do not sell your personal information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">4. How We Share Your Information</h2>
            <p className="mb-4">
              We share your information only in the following circumstances:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">4.1 Service Providers (Sub-processors)</h3>
                <p className="mb-3">
                  We use the following third-party service providers to operate the Service. Each processes data only
                  as instructed by us and under confidentiality obligations:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <span className="font-medium text-zinc-200">Supabase</span> (database, authentication, and
                    server-side functions) — United States
                  </li>
                  <li>
                    <span className="font-medium text-zinc-200">Vercel</span> (application hosting and edge delivery)
                    — United States / global CDN
                  </li>
                  <li>
                    <span className="font-medium text-zinc-200">Stripe</span> (payment processing and subscription
                    management) — United States
                  </li>
                  <li>
                    <span className="font-medium text-zinc-200">Resend</span> (transactional email delivery) — United
                    States
                  </li>
                  <li>
                    <span className="font-medium text-zinc-200">Bunny CDN</span> (media storage and delivery for
                    generated ads and brand assets) — European Union / global CDN
                  </li>
                  <li>
                    <span className="font-medium text-zinc-200">Foreplay</span> (advertising template data API) —
                    United States
                  </li>
                  <li>
                    <span className="font-medium text-zinc-200">AI model providers</span> (image generation): Fal,
                    OpenRouter, APIYI, EvoLink, KIE.ai, and Google — United States. Your prompts, reference images,
                    and brand inputs are transmitted to these providers solely to generate your requested outputs.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">4.2 Legal Requirements</h3>
                <p>
                  We may disclose information when required by law, court order, or governmental authority, or where
                  we believe disclosure is necessary to protect our rights, your safety, or the safety of others.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">4.3 Business Transfers</h3>
                <p>
                  If AdRender is involved in a merger, acquisition, financing, or sale of assets, your information
                  may be transferred as part of that transaction. We will notify you of any such change and any
                  choices you may have.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">4.4 With Your Consent</h3>
                <p>
                  We may share information for other purposes with your explicit prior consent.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">5. Data Retention</h2>
            <p className="mb-3">
              We retain your account data and brand assets for as long as your account is active. If you close your
              account, we delete or de-identify your personal data and uploaded content within 60 days, except where:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Retention is required to comply with legal obligations.</li>
              <li>Data is needed to resolve open disputes or enforce agreements.</li>
              <li>Data is contained in backup systems (retained up to 12 months in the ordinary course, then overwritten).</li>
              <li>Content has been shared publicly with your consent (e.g. community template contributions).</li>
            </ul>
            <p className="mt-3">
              Log data and usage analytics are retained for up to 90 days in identifiable form and may be retained
              longer in aggregated, de-identified form.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">6. Your Privacy Rights</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">6.1 All Users</h3>
                <p>
                  You may access, update, or delete your account information at any time through your account settings.
                  You may also contact us at{' '}
                  <a href="mailto:help@adrender.app" className="text-[#00e5ff] hover:underline">help@adrender.app</a>{' '}
                  to request access to, correction of, or deletion of your personal data.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">6.2 European Users (GDPR)</h3>
                <p className="mb-3">
                  If you are located in the European Economic Area or United Kingdom, you have the following rights
                  under the General Data Protection Regulation:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li><span className="font-medium text-zinc-200">Right of access:</span> obtain a copy of your personal data.</li>
                  <li><span className="font-medium text-zinc-200">Right to rectification:</span> correct inaccurate or incomplete data.</li>
                  <li><span className="font-medium text-zinc-200">Right to erasure:</span> request deletion of your data where no overriding legal basis applies.</li>
                  <li><span className="font-medium text-zinc-200">Right to restriction:</span> request that we limit processing in certain circumstances.</li>
                  <li><span className="font-medium text-zinc-200">Right to data portability:</span> receive your data in a structured, machine-readable format.</li>
                  <li><span className="font-medium text-zinc-200">Right to object:</span> object to processing based on legitimate interests.</li>
                  <li><span className="font-medium text-zinc-200">Right to withdraw consent:</span> where processing is based on consent, withdraw it at any time without affecting prior processing.</li>
                </ul>
                <p className="mt-3">
                  Our legal bases for processing are: performance of our contract with you (account management, service
                  delivery, billing); our legitimate interests (security, fraud prevention, service improvement);
                  compliance with legal obligations; and your consent where applicable.
                </p>
                <p className="mt-3">
                  ADRENDER LLC acts as the data controller for personal data processed through the Service. To exercise
                  any GDPR right or to request a Data Processing Addendum for business compliance purposes, contact{' '}
                  <a href="mailto:help@adrender.app" className="text-[#00e5ff] hover:underline">help@adrender.app</a>.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">6.3 California Users (CCPA/CPRA)</h3>
                <p className="mb-3">If you are a California resident, you have the right to:</p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Know what personal information we collect, use, disclose, and sell (we do not sell personal information).</li>
                  <li>Request deletion of personal information, subject to certain exceptions.</li>
                  <li>Correct inaccurate personal information.</li>
                  <li>Opt out of the sale or sharing of personal information (we do not sell or share personal information for cross-context behavioral advertising).</li>
                  <li>Non-discrimination for exercising your privacy rights.</li>
                </ul>
                <p className="mt-3">
                  Categories of personal information we collect: identifiers (name, email, IP address); commercial
                  information (subscription and payment records); internet or network activity (usage logs); and
                  user-generated content (brand assets, prompts, generated outputs). To submit a CCPA request, contact{' '}
                  <a href="mailto:help@adrender.app" className="text-[#00e5ff] hover:underline">help@adrender.app</a>.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">7. Cookies and Tracking</h2>
            <p className="mb-3">
              This marketing site (adrender.app) does not set cookies and does not run analytics that track individual
              users. The AdRender application (app.adrender.app) uses session cookies for authentication and may
              collect usage analytics to improve the product. For full details on data collected within the
              application, see Section 2 (Information We Collect) above.
            </p>
            <p>
              We do not use third-party advertising cookies or sell cookie data to advertisers. You may disable cookies
              through your browser settings; however, disabling session cookies will prevent you from staying logged in
              to the application.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">8. International Data Transfers</h2>
            <p>
              AdRender is based in the United States. If you use the Service from outside the United States, your
              information will be transferred to and processed in the United States and in other countries where our
              service providers operate. Where required by applicable law (including GDPR), we ensure appropriate
              safeguards are in place for international transfers, including Standard Contractual Clauses where
              applicable.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">9. Children's Privacy</h2>
            <p>
              The Service is not directed to individuals under 18 years of age. We do not knowingly collect personal
              information from children. If we learn that we have collected personal information from a child under 18,
              we will delete it promptly. If you believe we may have collected information from a minor, contact us at{' '}
              <a href="mailto:help@adrender.app" className="text-[#00e5ff] hover:underline">help@adrender.app</a>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">10. Security</h2>
            <p>
              We implement industry-standard technical and organizational measures to protect your information,
              including encryption in transit (TLS), encrypted storage, access controls, and monitoring. However, no
              method of transmission over the internet is 100% secure. We cannot guarantee absolute security and are
              not responsible for unauthorized access resulting from circumstances beyond our reasonable control.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">11. Third-Party Links</h2>
            <p>
              The Service may contain links to third-party websites and services (including Shopify, Meta, Google, and
              Foreplay). We are not responsible for the privacy practices of those third parties. We encourage you to
              review their privacy policies before providing any information to them.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">12. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material changes by email or
              in-platform notification before the change becomes effective. The "Last updated" date at the top of this
              page reflects the most recent revision. Continued use of the Service after changes become effective
              constitutes acceptance.
            </p>
          </section>

          <section className="rounded-xl border border-white/[0.08] bg-[#12121a] p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">13. Contact</h2>
            <p className="mb-4 text-zinc-400">
              For privacy questions, data requests, or to report a privacy concern:
            </p>
            <address className="not-italic space-y-1 text-zinc-300">
              <p className="font-medium text-white">ADRENDER LLC</p>
              <p>Miami, Florida, United States</p>
              <p>
                Email:{' '}
                <a href="mailto:help@adrender.app" className="text-[#00e5ff] hover:underline">
                  help@adrender.app
                </a>
              </p>
            </address>
            <p className="mt-4 text-zinc-400">
              For GDPR-related inquiries or to request a Data Processing Addendum:{' '}
              <a href="mailto:help@adrender.app" className="text-[#00e5ff] hover:underline">
                help@adrender.app
              </a>
            </p>
          </section>

        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-white/[0.06] py-6 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} ADRENDER LLC. All rights reserved.
      </footer>
    </div>
  )
}
