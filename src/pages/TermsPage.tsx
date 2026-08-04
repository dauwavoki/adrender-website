import { PageMeta } from '../components/PageMeta'

const TITLE = 'Terms and Conditions — AdRender'
const DESCRIPTION =
  'Terms governing use of AdRender — accounts, subscriptions, acceptable use, intellectual property, and liability for our AI ad generation service.'

export function TermsPage() {
  return (
    <div className="min-h-dvh bg-[#0a0a0f] text-zinc-300">
      <PageMeta title={TITLE} description={DESCRIPTION} path="/terms" />
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
            Terms and Conditions
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Last updated: June 2026 &nbsp;·&nbsp; Effective: June 2026
          </p>
        </div>

        <div className="space-y-10 text-[15px] leading-relaxed">

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">1. Introduction and Acceptance</h2>
            <p>
              These Terms and Conditions ("Terms") are a binding legal agreement between you ("you," "User," or
              "Customer") and ADRENDER LLC, a Florida limited liability company ("AdRender," "we," "us," or "our").
              By creating an account or using the AdRender platform at{' '}
              <a href="https://app.adrender.app" className="text-[#00e5ff] hover:underline">app.adrender.app</a>{' '}
              and related services (collectively, the "Service"), you agree to be bound by these Terms and our Privacy
              Policy. If you are accepting on behalf of a company, you represent that you have authority to bind that
              entity. You must be at least 18 years old to use the Service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">2. Description of the Service</h2>
            <p>
              AdRender is an AI-powered platform for creating static image advertisements. The Service includes: AI
              image generation via multiple third-party model providers operating under a multi-provider fallback
              architecture; access to a curated advertising template library sourced via Foreplay API integration;
              brand management tools including brand voice, color, logo, and product asset management; Shopify store
              integration for automated product import; image text overlays and ad variations; team collaboration with
              role-based permissions; AI-assisted customer support; and token-based metered AI generation. The Service
              does not currently include video generation. We may add, modify, or remove features at any time, with
              reasonable prior notice to paying subscribers for changes that materially reduce functionality.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">3. Accounts and Security</h2>
            <p>
              You must provide accurate, current, and complete information when registering. You are responsible for
              maintaining the confidentiality of your credentials and for all activity that occurs under your account.
              Notify us immediately at{' '}
              <a href="mailto:help@adrender.app" className="text-[#00e5ff] hover:underline">help@adrender.app</a>{' '}
              of any suspected unauthorized access. We are not liable for losses arising from your failure to secure
              your account credentials.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">4. Subscription Plans and Billing</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">4.1 Plans</h3>
                <p>
                  The Service is offered in tiered subscription plans (currently Free, Solo, Growth, Pro, and Scale,
                  each a "Plan"). Each Plan defines limits including monthly tokens, brand slots, product limits, team
                  seats, integrations, and feature access. Current Plan definitions, prices, and limits are published
                  at{' '}
                  <a href="https://adrender.app/pricing" className="text-[#00e5ff] hover:underline">adrender.app/pricing</a>{' '}
                  and may be updated with at least 30 days prior notice to paying subscribers.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">4.2 Billing Cycle and Renewal</h3>
                <p>
                  Paid subscriptions are billed in advance on a monthly or annual basis and renew automatically at the
                  end of each billing period at the then-current rate unless cancelled at least 24 hours before
                  renewal. You authorize us to charge your payment method on each renewal date.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">4.3 Upgrades</h3>
                <p>
                  Upgrading to a higher-priced plan takes effect immediately. A prorated charge for the remainder of
                  the current billing period is applied at the time of upgrade. Any additional tokens included in the
                  new plan are credited to your account immediately.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">4.4 Downgrades</h3>
                <p>
                  Downgrading to a lower-priced plan takes effect at the end of your current billing period. You
                  retain access to your current plan's features and token allotment until that date. No prorated
                  refund or credit is issued for the remaining days on your current plan. Your new lower-tier
                  allotment begins at the next renewal.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">4.5 Price Changes</h3>
                <p>
                  We may change subscription prices on prospective billing periods with at least 30 days notice. Price
                  changes do not affect the current paid period. Continued use after a price change becomes effective
                  constitutes acceptance.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">4.6 Cancellation</h3>
                <p>
                  You may cancel at any time through your account settings. Access continues through the end of the
                  current billing period. No partial-period refunds except as stated in Section 6.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">4.7 Taxes</h3>
                <p>
                  Prices exclude applicable sales tax, VAT, GST, and other governmental fees, which are your sole
                  responsibility.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">5. Token System</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">5.1 Nature of Tokens</h3>
                <p>
                  Tokens are an internal accounting unit used to meter consumption of AI generation features. Tokens
                  are not currency, are not redeemable for cash, have no monetary value outside the Service, and are
                  non-transferable.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">5.2 Monthly Allotments and Top-Up Packs</h3>
                <p>
                  Each Plan includes a monthly token allotment that resets at the start of each billing period. On a
                  plan downgrade, your current allotment remains unchanged until the end of the billing period; the
                  new lower allotment takes effect at the next renewal. Additional tokens may be purchased as one-time
                  top-up packs at prices published on the pricing page. Volume discounts apply — the effective
                  per-token rate decreases as pack size increases. Top-up tokens purchased under any plan are never
                  removed due to a plan change.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">5.3 Pricing Variability</h3>
                <p>
                  Token pack prices and per-generation token consumption rates may change at any time without prior
                  notice. The price applicable to any top-up purchase or generation action is always displayed before
                  you confirm it. You will never be charged for a generation or token pack without first seeing the
                  applicable cost.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">5.4 Expiration and Rollover</h3>
                <p>
                  Monthly allotment tokens expire at the end of each billing period and do not roll over, except that
                  annual subscribers may carry unused allotment tokens forward up to two times their monthly cap.
                  Balances above that ceiling are forfeited at month end. Top-up tokens expire 12 months after
                  purchase. All tokens are forfeited upon account termination, except where required by law.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">5.5 Top-Up Refunds</h3>
                <p>
                  Top-up token purchases are refundable in full only if requested within 7 days of purchase and fewer
                  than 10% of the purchased tokens have been consumed.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">6. Refund Policy</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">6.1 Subscriptions</h3>
                <p>
                  Monthly subscriptions are non-refundable once a billing period has begun. Annual subscriptions may
                  be refunded on a pro-rated basis only within 14 days of the initial purchase or the most recent
                  annual renewal, less the value of any tokens consumed during that period. Plan downgrades do not
                  entitle you to a refund for the remaining days on your current plan.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">6.2 Service Unavailability</h3>
                <p>
                  If the Service is materially unavailable for more than 72 consecutive hours due to our fault
                  (excluding scheduled maintenance and force majeure), you may request a pro-rated credit for the
                  unavailability period.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">6.3 No Refunds for Misuse</h3>
                <p>
                  We reserve the right to deny refunds where requests appear to be made in bad faith or following
                  violation of these Terms.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">7. AI Generation Disclaimers</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">7.1 Variability of Outputs</h3>
                <p>
                  The Service uses generative AI models supplied by third-party providers. AI-generated outputs are
                  inherently probabilistic. Quality, style, accuracy, and consistency may vary between requests,
                  providers, sessions, and over time. Identical prompts may produce different results.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">7.2 Your Responsibility</h3>
                <p>
                  You are solely responsible for reviewing all AI-generated content before use, publication, or
                  distribution, including verifying that outputs do not contain inaccurate claims, misleading imagery,
                  or content that violates applicable advertising laws or the policies of any platform on which you
                  place the output.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">7.3 Provider Availability</h3>
                <p>
                  We may add, remove, or substitute AI model providers at any time. Specific providers or models may
                  become unavailable. We do not guarantee continuous availability of any specific model or provider.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">7.4 No Human Review</h3>
                <p>
                  Outputs are generated by automated systems without human pre-review. We are not publishers of
                  AI-generated content.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">8. Template Library and Foreplay Integration</h2>
            <p>
              Templates available through the Service are sourced via Foreplay API integration, which aggregates
              publicly observed advertising creatives from sources including the Meta Ad Library and similar public
              repositories. Templates are provided for inspirational, benchmarking, and reference purposes only and
              do not constitute a license to copy, reproduce, or redistribute original advertisements. You must not
              reproduce protected elements of third parties (trademarks, logos, copyrighted images) or imply
              endorsement by brands depicted. You are solely responsible for ensuring your published advertisements
              do not infringe any third-party intellectual property, publicity, or privacy rights.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">9. Shopify Integration</h2>
            <p>
              If you connect a Shopify store, you authorize us to access and process your store data (product names,
              descriptions, images, variants, and metadata) solely to provide the Service. We do not access payment
              card information or customer personal data beyond what is necessary and disclosed. You represent that
              your use of the Service with your Shopify store complies with Shopify's Terms of Service, API License,
              and Acceptable Use Policy. You may disconnect at any time; we will delete or de-identify imported
              product data within 60 days of disconnection.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">10. Team Accounts</h2>
            <p>
              Where your Plan includes team seats, the account owner may invite members and assign role-based
              permissions. The account owner is responsible for all activity by team members and for their compliance
              with these Terms. We are not responsible for disputes between account owners and team members.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">11. User Content and Intellectual Property</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">11.1 Your Content</h3>
                <p>
                  You retain all right, title, and interest in brand documents, logos, product assets, prompts,
                  reference images, and other content you upload ("User Content"). You grant AdRender a limited,
                  worldwide, non-exclusive, royalty-free license to host, store, and process your User Content solely
                  to provide the Service.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">11.2 Generated Outputs</h3>
                <p>
                  Subject to your payment of applicable fees and compliance with these Terms, you own the
                  AI-generated static image outputs you create ("Generated Outputs") to the maximum extent permitted
                  by applicable law. You acknowledge that purely AI-generated works may have limited or no copyright
                  protection under current law and that you are responsible for assessing their legal status in your
                  jurisdiction.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">11.3 AdRender IP</h3>
                <p>
                  The Service, including all software, designs, the AdRender name and logo, Brain AI features, and
                  related intellectual property, is owned by AdRender or its licensors. No rights are granted beyond
                  those expressly stated.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">11.4 Feedback</h3>
                <p>
                  Any feedback or suggestions you provide may be used by AdRender without restriction or compensation
                  to you.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">12. Acceptable Use Policy</h2>
            <p className="mb-3">
              You must not use the Service to create, generate, store, or distribute content that:
            </p>
            <ol className="list-none space-y-2 pl-0">
              {[
                'infringes any intellectual property, publicity, or privacy rights;',
                'constitutes hate speech or discrimination against any individual or group based on a protected characteristic;',
                'depicts, simulates, or facilitates child sexual abuse material — violations will be reported to NCMEC and law enforcement;',
                'is sexually explicit;',
                'depicts real people without lawful basis, including non-consensual intimate imagery or impersonation;',
                'promotes illegal activity, violence, terrorism, self-harm, or eating disorders;',
                'constitutes deceptive advertising, fraud, or health misinformation;',
                'advertises regulated products in violation of applicable law;',
                'contains malware or interferes with the Service; or',
                'violates any applicable law, regulation, or platform policy including those of Meta, Google, TikTok, and Shopify.',
              ].map((item, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="shrink-0 text-zinc-500">({String.fromCharCode(97 + i)})</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <p className="mt-3">
              We may remove content, suspend or terminate accounts, and report violations to law enforcement.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">13. Account Suspension and Termination</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">13.1 By You</h3>
                <p>
                  You may close your account at any time through account settings or by contacting{' '}
                  <a href="mailto:help@adrender.app" className="text-[#00e5ff] hover:underline">help@adrender.app</a>.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">13.2 By Us</h3>
                <p>
                  We may suspend or terminate your account with or without notice for breach of these Terms,
                  non-payment, fraudulent or abusive behavior, or where your use creates legal risk.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">13.3 Effect of Termination</h3>
                <p>
                  On termination your access ends, outstanding fees become due, tokens are forfeited, and we will
                  delete or de-identify your account data within 60 days, subject to legal retention requirements.
                  Sections 7, 8, 11.3, 12, and 15–21 survive termination.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">14. Privacy and Data</h2>
            <p>
              Our Privacy Policy at{' '}
              <a href="https://adrender.app/privacy" className="text-[#00e5ff] hover:underline">adrender.app/privacy</a>{' '}
              governs our data practices and is incorporated into these Terms by reference. If you are protected by
              GDPR, CCPA, or equivalent privacy laws you have rights including access, correction, deletion,
              restriction, portability, and objection. Contact{' '}
              <a href="mailto:help@adrender.app" className="text-[#00e5ff] hover:underline">help@adrender.app</a>{' '}
              to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">15. Third-Party Services</h2>
            <p>
              The Service integrates with third-party services including Shopify, Foreplay, Meta, Google, and payment
              processors. We are not responsible for their availability, content, or data handling. Your use of
              third-party services is governed by their own terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">16. Disclaimers of Warranties</h2>
            <p className="text-zinc-400">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED,
              INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY,
              OR RELIABILITY. WE DO NOT WARRANT THAT AI OUTPUTS WILL BE ACCURATE, NON-INFRINGING, OR FIT FOR
              ADVERTISING USE. YOU ASSUME ALL RISK FROM USE OF AI-GENERATED CONTENT. SOME JURISDICTIONS DO NOT ALLOW
              EXCLUSION OF CERTAIN WARRANTIES; IN THOSE JURISDICTIONS EXCLUSIONS APPLY ONLY TO THE EXTENT PERMITTED
              BY LAW.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">17. Limitation of Liability</h2>
            <p className="text-zinc-400">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ADRENDER AND ITS AFFILIATES, OFFICERS, AND AGENTS
              WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE
              DAMAGES, INCLUDING LOST PROFITS, LOST DATA, LOSS OF GOODWILL, OR BUSINESS INTERRUPTION, ARISING FROM
              USE OF THE SERVICE OR AI-GENERATED CONTENT, EVEN IF ADVISED OF THE POSSIBILITY. ADRENDER'S AGGREGATE
              LIABILITY FOR ANY CLAIM WILL NOT EXCEED THE GREATER OF (A) THE AMOUNTS YOU PAID US IN THE 12 MONTHS
              PRECEDING THE CLAIM, OR (B) ONE HUNDRED US DOLLARS ($100). SOME JURISDICTIONS DO NOT ALLOW EXCLUSION
              OF CERTAIN DAMAGES; IN THOSE JURISDICTIONS LIABILITY IS LIMITED TO THE MAXIMUM EXTENT PERMITTED.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">18. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless AdRender and its officers, employees, and agents from
              claims, damages, liabilities, losses, costs, and expenses (including reasonable legal fees) arising
              from: (a) your User Content; (b) your published advertisements or campaigns; (c) your violation of
              these Terms or any applicable law; or (d) your violation of any third-party platform policy in
              connection with content created using the Service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">19. Governing Law and Venue</h2>
            <p>
              These Terms are governed by the laws of the State of Florida, without regard to conflict-of-laws
              principles. Subject to Section 20, you consent to the exclusive jurisdiction and venue of the state and
              federal courts of Miami-Dade County, Florida for any action not subject to arbitration.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">20. Dispute Resolution and Arbitration</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">20.1 Informal Resolution</h3>
                <p>
                  Before filing any formal claim, the parties agree to attempt informal resolution for 60 days by
                  contacting{' '}
                  <a href="mailto:help@adrender.app" className="text-[#00e5ff] hover:underline">help@adrender.app</a>{' '}
                  with a written description of the dispute.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">20.2 Binding Arbitration</h3>
                <p>
                  Any unresolved dispute shall be settled by binding individual arbitration administered by the
                  American Arbitration Association under its Commercial Arbitration Rules. Arbitration will take place
                  in Miami, Florida, or by video conference for claims under $25,000.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">20.3 Class Action Waiver</h3>
                <p>
                  Claims may only be brought in an individual capacity. Neither party may participate as a plaintiff
                  or class member in any class, collective, or representative proceeding.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">20.4 Exceptions</h3>
                <p>
                  Either party may seek injunctive relief in court to protect intellectual property rights or bring an
                  action in small-claims court within that court's jurisdictional limits.
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-medium text-zinc-200">20.5 Opt-Out</h3>
                <p>
                  You may opt out of arbitration by written notice to{' '}
                  <a href="mailto:help@adrender.app" className="text-[#00e5ff] hover:underline">help@adrender.app</a>{' '}
                  within 30 days of first accepting these Terms.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">21. Changes to These Terms</h2>
            <p>
              We may update these Terms periodically. Material changes will be communicated by email and/or
              in-platform notification at least 30 days before becoming effective for paying subscribers. Continued
              use after the effective date constitutes acceptance. If you disagree, you may cancel per Section 4.6.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">22. Miscellaneous</h2>
            <p>
              These Terms constitute the entire agreement between you and AdRender regarding the Service. If any
              provision is unenforceable the remainder stays in effect. Failure to enforce any provision is not a
              waiver. You may not assign these Terms without our written consent; we may assign them in connection
              with a merger, acquisition, or sale of assets. Neither party is liable for delays caused by events
              outside reasonable control. The parties are independent contractors.
            </p>
          </section>

          <section className="rounded-xl border border-white/[0.08] bg-[#12121a] p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">23. Contact</h2>
            <p className="mb-4 text-zinc-400">
              For questions about these Terms, billing, privacy, legal notices, or support:
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
