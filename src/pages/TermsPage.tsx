import { PageMeta } from '../components/PageMeta'

const TITLE = 'Terms and Conditions — AdRender'
const DESCRIPTION =
  'Terms governing use of AdRender — accounts, subscriptions, acceptable use, intellectual property, and liability.'

export function TermsPage() {
  return (
    <div className="min-h-dvh bg-bg-base text-zinc-300">
      <PageMeta title={TITLE} description={DESCRIPTION} path="/terms" />
      {/* Minimal standalone header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-bg-base/90 backdrop-blur-md">
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
            Last updated: 21 October 2026 &nbsp;·&nbsp; Effective: 21 October 2026
          </p>
        </div>

        <div className="space-y-10 text-[15px] leading-relaxed">

          <section id="1" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">1. Introduction and Acceptance</h2>
            <p>These Terms and Conditions ("Terms") are a binding legal agreement between you ("you," "User," or "Customer") and ADRENDER LLC, a Florida limited liability company ("AdRender," "we," "us," or "our"). By creating an account or using the AdRender platform at <a href="https://app.adrender.app" className="text-[#00e5ff] hover:underline">app.adrender.app</a> and related services (collectively, the "Service"), you agree to be bound by these Terms and our Privacy Policy. If you are accepting on behalf of a company, you represent that you have authority to bind that entity. You must be at least 18 years old to use the Service.</p>

          </section>

          <section id="2" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">2. Description of the Service</h2>
            <p>AdRender is a platform for creating static image and video advertisements. The Service includes: image and video rendering through our rendering partners; our template library; brand management tools including brand voice, color, logo, and product asset management; Shopify store integration for product import; ad variations; workspaces with role-based permissions; customer support in the app; and token-based rendering. We may add, modify, or remove features at any time, with reasonable prior notice to paying subscribers for changes that materially reduce functionality.</p>

          </section>

          <section id="3" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">3. Accounts and Security</h2>
            <p>You must provide accurate, current, and complete information when registering. You are responsible for maintaining the confidentiality of your credentials and for all activity that occurs under your account. Notify us immediately at <a href="mailto:info@adrender.app" className="text-[#00e5ff] hover:underline">info@adrender.app</a>, or through in-app Support, of any suspected unauthorized access. We are not liable for losses arising from your failure to secure your account credentials.</p>

          </section>

          <section id="4" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">4. Subscription Plans and Billing</h2>
            <div className="space-y-4">
              <div id="4-1" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">4.1 Plans</h3>
            <p>The Service is offered in tiered subscription plans. On the AdRender web app the plans are currently Free, Solo, Growth, Pro, and Scale. The Shopify app also offers Volume and Agency (see Section 4A.6). Each of these is a "Plan". Each Plan defines limits including monthly tokens, brand slots, how many variations can run at once, and whether you can create extra workspaces. Plans do not include a seat limit. Current Plan definitions, prices, and limits are published at <a href="https://adrender.app/#pricing" className="text-[#00e5ff] hover:underline">adrender.app/#pricing</a> and, for Shopify-only plans, inside the Shopify app, and may be updated with at least 30 days prior notice to paying subscribers.</p>
              </div>
              <div id="4-2" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">4.2 Billing Cycle and Renewal</h3>
            <p>Paid subscriptions are billed in advance on a monthly or annual basis and renew automatically at the end of each billing period at the then-current rate unless cancelled at least 24 hours before renewal. You authorize us to charge your payment method on each renewal date. Where you are billed is fixed by Section 4A.2. This section's charge authorization applies to web-app billing through Stripe. Shopify-billed accounts are charged by Shopify (Section 4A).</p>
              </div>
              <div id="4-3" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">4.3 Upgrades</h3>
            <p>Upgrading to a higher-priced plan takes effect immediately. A prorated charge for the remainder of the current billing period is applied at the time of upgrade. Any additional tokens included in the new plan are credited to your account immediately.</p>
              </div>
              <div id="4-4" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">4.4 Downgrades</h3>
            <p>Downgrading to a lower-priced plan takes effect at the end of your current billing period. You retain access to your current plan's features and token allotment until that date. No prorated refund or credit is issued for the remaining days on your current plan. Your new lower-tier allotment begins at the next renewal.</p>
              </div>
              <div id="4-5" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">4.5 Price Changes</h3>
            <p>We may change subscription prices on prospective billing periods with at least 30 days notice. Price changes do not affect the current paid period. Continued use after a price change becomes effective constitutes acceptance.</p>
              </div>
              <div id="4-6" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">4.6 Cancellation</h3>
            <div className="space-y-3">
            <p>You may cancel a web-app subscription at any time under Profile → Plans &amp; Billing. Cancellation is not account deletion. You keep the plan you already paid for until the end of that billing period. After that, your account is on the Free plan. You keep full access to everything you already made. New work follows the Free limits (for example a new brand, or a new workspace, when Free does not allow it). Tokens already on the account are not deleted by cancellation. Plan tokens then follow the Free plan and Section 5.4. Top-up tokens stay until you use them or delete the account (Section 5.5). No partial-period refunds except as stated in Section 6. To delete your account, see Section 13.1.</p>
            <p>If you are billed by Shopify, the web app does not offer Cancel. Use Section 4A.3.</p>
            </div>
              </div>
              <div id="4-7" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">4.7 Taxes</h3>
            <p>Prices exclude applicable sales tax, VAT, GST, and other governmental fees, which are your sole responsibility.</p>
              </div>
            </div>
          </section>

          <section id="4a" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">4A. Shopify App Store Users</h2>
            <p>This section applies when Shopify is who bills you. Where it conflicts with Section 4, this section controls.</p>
            <div className="mt-4 space-y-4">
              <div id="4a-1" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">4A.1 Billing Provider</h3>
            <p>Subscription charges for a Shopify-billed account are processed by Shopify and appear on your Shopify invoice. We do not collect or store your payment details for those charges. Shopify's own billing cycle, payment retry, and collection terms apply. You are not charged more than your plan price (Section 4A.4).</p>
              </div>
              <div id="4a-2" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">4A.2 Where you are billed</h3>
            <div className="space-y-3">
            <p>You are billed only where you first signed up, and never in two places.</p>
            <p>If you created your account on the AdRender web app and later installed the Shopify app, the store uses your web plan and your web tokens, even on the Free plan, and there is nothing to pay in Shopify. Shopify plans are hidden. Web charges are processed by Stripe.</p>
            <p>If you created your account by installing the Shopify app, you are billed by Shopify, per store. You can sign in to the AdRender web app with the same email and use it, but billing stays with Shopify. There is no web checkout, no token top-up, no Cancel, and no Delete in the web app for that account. Those steps are in Shopify.</p>
            <p>To be billed in the other place, create an account with a different email. Subscriptions, token balances, and billing history do not move to that new account. Closing or deleting an account is not how you switch billing.</p>
            </div>
              </div>
              <div id="4a-3" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">4A.3 Plan changes and cancellation</h3>
            <div className="space-y-3">
            <p>You can upgrade, downgrade, or move to Free from Shopify's plan page inside the app. Only the store owner can change the plan. The owner is Shopify's account owner.</p>
            <p>Choosing Free ends the paid plan at the end of the period you already paid for. Then the account is on Free. Your ads, brands, and workspaces remain, and tokens already on the account are not deleted by that change. On Free you keep what you already made, and you cannot create new items beyond the Free limits. Choosing Free does not uninstall the app and does not delete the store's data.</p>
            <p>Uninstalling the app also ends future recurring charges. You may still be billed for the current cycle. Uninstalling is not the same as choosing Free, because Shopify then asks us to delete the store's data on the timetable in Section 9. To delete a web-billed account, see Section 13.1. A Shopify-billed account is not deleted from the web app.</p>
            </div>
              </div>
              <div id="4a-4" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">4A.4 Token limits</h3>
            <p>Top-up token packs are not sold in the Shopify app. They are sold in the AdRender web app, and only for accounts billed there. A paid Shopify plan includes a monthly token allotment. Unused plan tokens carry forward as described in Section 5.4. When your token balance is used up, rendering pauses until the next allotment is added or you move to a higher plan. You are never charged more than your plan price, and no additional usage charges apply.</p>
              </div>
              <div id="4a-5" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">4A.5 Refunds</h3>
            <p>Refunds for charges that appear on a Shopify invoice are handled through Shopify, or by us by hand. The refund terms in Section 6 apply. Talk to us through the customer service chat or send us an email at <a href="mailto:info@adrender.app" className="text-[#00e5ff] hover:underline">info@adrender.app</a>.</p>
              </div>
              <div id="4a-6" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">4A.6 Additional Plans</h3>
            <p>Accounts billed through the Shopify App Store may also choose two plans available only through that channel: Volume and Agency. Current definitions, prices, and limits for all plans, including these two, are published within the app.</p>
              </div>
            </div>
          </section>

          <section id="5" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">5. Token System</h2>
            <div className="space-y-4">
              <div id="5-1" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">5.1 Nature of Tokens</h3>
            <p>Tokens are an internal accounting unit used to meter rendering. Tokens are not currency, are not redeemable for cash, have no monetary value outside the Service, and are non-transferable. You have plan tokens and top-up tokens. Plan tokens are spent first.</p>
              </div>
              <div id="5-2" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">5.2 Monthly Allotments and Top-Up Packs</h3>
            <p>Each Plan includes a monthly token allotment. How unused plan tokens carry forward is in Section 5.4. On a plan downgrade, your current allotment remains unchanged until the end of the billing period; the new lower allotment takes effect at the next renewal. Additional tokens may be purchased as one-time top-up packs in the AdRender web app, at prices published on the pricing page, and only if you are billed there. Top-up packs are not sold in the Shopify app. Volume discounts apply — the effective per-token rate decreases as pack size increases. Top-up tokens are never removed because of a plan change.</p>
              </div>
              <div id="5-3" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">5.3 Pricing Variability</h3>
            <p>Token pack prices and per-render token rates may change at any time without prior notice. The price applicable to any top-up purchase or render is always displayed before you confirm it. You will never be charged for a render or token pack without first seeing the applicable cost. This flexibility applies specifically to token pricing and render rates; it does not affect the 30-day notice period for overall subscription plan price changes described in Section 4.5.</p>
              </div>
              <div id="5-4" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">5.4 Expiration and Rollover</h3>
            <div className="space-y-3">
            <p>On a monthly plan billed in the AdRender web app, unused plan tokens reset to that plan's allowance each billing cycle.</p>
            <p>On a yearly plan billed in the AdRender web app, and on a paid Shopify plan (monthly or yearly), unused plan tokens carry forward. You may carry forward up to two months' worth. The balance is never more than three months' worth. When the next month's tokens are added, anything above that ceiling is trimmed. The trim happens when the next grant is added. There is no separate end-of-month forfeiture.</p>
            <p>The Free plan does not use this carry-forward. Free includes up to 10 plan tokens. Every 30 days from the day the workspace was created, plan tokens are topped back up to 10. Missed periods are not paid back. The refill never changes top-up tokens. Free tokens do not stack above 10.</p>
            <p>Top-up tokens never expire while the account exists. They stay until you use them or the account is deleted. All tokens are removed when the account is deleted or terminated, except where required by law.</p>
            <p>On a Free workspace older than 30 days, template search locks until you upgrade.</p>
            </div>
              </div>
              <div id="5-5" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">5.5 Top-Up Purchases Are Non-Refundable</h3>
            <p>All top-up token purchases are final and non-refundable, regardless of how many tokens have been consumed or how much time has passed since purchase. Top-up tokens never expire. They remain on the account until they are used or the account is deleted.</p>
              </div>
              <div id="5-6" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">5.6 Render outcomes</h3>
            <div className="space-y-3">
            <p>If a render fails, the tokens charged for that render are returned.</p>
            <p>If an image render is still running 10 minutes after it started, you may cancel it and the tokens charged for that render are returned.</p>
            <p>If a video render stays stuck, the tokens charged for that render are returned automatically. That refund happens 20 minutes after the video was sent to render. If it was never sent, those 20 minutes start when the render was created.</p>
            <p>If a sharper video pass fails, the lower resolution is delivered and the difference in tokens is returned. You may retry that resolution at that discounted difference, up to 3 times for that video and that resolution.</p>
            </div>
              </div>
            </div>
          </section>

          <section id="6" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">6. Refund Policy</h2>
            <div className="space-y-4">
              <div id="6-1" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">6.1 Subscriptions</h3>
            <div className="space-y-3">
            <p>Monthly subscriptions are non-refundable once a billing period has begun. Annual subscriptions may be refunded only within 14 days of the initial purchase or the most recent annual renewal. The refund is the plan price minus the number of tokens used in that period multiplied by $0.12, and it is never below $0. Plan downgrades do not entitle you to a refund for the remaining days on your current plan. Top-up purchases are non-refundable (Section 5.5).</p>
            <p>A charge on a Shopify invoice is refunded through Shopify, or by us by hand (Section 4A.5). A charge on the web app is refunded by AdRender through Stripe when Section 6.1 allows it.</p>
            </div>
              </div>
              <div id="6-2" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">6.2 Service Unavailability</h3>
            <p>If the Service is materially unavailable for more than 72 consecutive hours due to our fault (excluding scheduled maintenance and events outside our reasonable control), you may request a pro-rated credit for the unavailability period.</p>
              </div>
              <div id="6-3" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">6.3 No Refunds for Misuse</h3>
            <p>We reserve the right to deny refunds where requests appear to be made in bad faith or following violation of these Terms.</p>
              </div>
            </div>
          </section>

          <section id="7" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">7. Rendering Disclaimers</h2>
            <div className="space-y-4">
              <div id="7-1" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">7.1 Variability of Outputs</h3>
            <p>The Service uses rendering models supplied by our rendering partners. Results are not guaranteed to be identical from one try to the next. Quality, style, accuracy, and consistency may vary between requests, partners, sessions, and over time. The same request may render differently.</p>
              </div>
              <div id="7-2" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">7.2 Your Responsibility</h3>
            <p>You are solely responsible for reviewing all rendered ads before use, publication, or distribution, including checking that they do not contain inaccurate claims, misleading imagery, or content that violates applicable advertising laws or the policies of any platform on which you place them.</p>
              </div>
              <div id="7-3" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">7.3 Partner Availability</h3>
            <p>We may add, remove, or substitute rendering partners at any time. A partner may become unavailable. We do not guarantee continuous availability of any specific partner.</p>
              </div>
              <div id="7-4" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">7.4 No Human Review</h3>
            <p>Outputs are rendered by automated systems without human pre-review. We are not publishers of those ads.</p>
              </div>
            </div>
          </section>

          <section id="8" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">8. Template Library</h2>
            <p>Our template library is provided for inspiration, benchmarking, and reference. It does not give you a license to copy, reproduce, or redistribute someone else's advertisement. You must not reproduce protected elements of third parties (trademarks, logos, copyrighted images) or imply endorsement by brands depicted. You are solely responsible for ensuring your published advertisements do not infringe any third-party intellectual property, publicity, or privacy rights.</p>

          </section>

          <section id="9" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">9. Shopify Integration</h2>
            <div className="space-y-3">
            <p>If you connect a Shopify store, you authorize us to access and process your store data (product names, descriptions, images, variants, pricing, and metadata) solely to provide the Service. We do not access payment card information or your customers' personal data. You represent that your use of the Service with your Shopify store complies with Shopify's Terms of Service, API License, and Acceptable Use Policy.</p>
            <p>You may disconnect a store from a brand inside the app. Disconnecting a product link is not the same as uninstalling the Shopify app, and it is not account deletion.</p>
            <p>If you uninstall the Shopify app, we email you straight away. If you reinstall within 48 hours, everything is as before. After 48 hours, Shopify asks us to delete the store's data, and we permanently delete that store's brands, ads, products, and tokens. We email you again when that deletion is done. That email includes links to the Shopify App Store and the web app.</p>
            <p>If you signed up through Shopify and that was your last store, your AdRender account is closed as well. If you signed up on the web app first, your web account is not closed. The store's data is still deleted after the 48 hours.</p>
            <p>Reinstalling after that deletion is a fresh start, on the Free plan, billed through Shopify.</p>
            <p>Choosing Free on Shopify's plan page (Section 4A.3) does not start this deletion.</p>
            </div>

          </section>

          <section id="10" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">10. Workspaces</h2>
            <div className="space-y-4">
              <div id="10-1" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">10.1 Who can create them</h3>
            <div className="space-y-3">
            <p>Plans that allow it can create extra workspaces and invite members. The Free plan cannot create extra workspaces. There is no seat limit.</p>
            <p>The account owner is responsible for all activity by members and for their compliance with these Terms. We are not responsible for disputes between account owners and members.</p>
            </div>
              </div>
              <div id="10-2" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">10.2 Web-first and Shopify-first</h3>
            <div className="space-y-3">
            <p>If you signed up on the web app, your stores use your web plan and your web tokens. There is not a separate Shopify bill per store.</p>
            <p>If you signed up through Shopify, each installed store is billed by Shopify. You can also create extra web workspaces. The number follows the paying store's plan. You pick which store those workspaces take tokens from. Members of that workspace see that store's plan.</p>
            <p>Invites work both ways. You can invite someone into a workspace, and you can join a workspace you were invited to. Only the Shopify account owner can change that store's plan.</p>
            </div>
              </div>
              <div id="10-3" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">10.3 Affiliates</h3>
            <p>The affiliate program is for web app accounts and is paid through Stripe. It is not part of Shopify billing.</p>
              </div>
            </div>
          </section>

          <section id="11" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">11. User Content and Intellectual Property</h2>
            <div className="space-y-4">
              <div id="11-1" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">11.1 Your Content</h3>
            <p>You retain all right, title, and interest in brand documents, logos, product assets, the text you submit, reference images, reference videos, and other content you upload ("User Content"). You grant AdRender a limited, worldwide, non-exclusive, royalty-free license to host, store, and process your User Content solely to provide the Service.</p>
              </div>
              <div id="11-2" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">11.2 Rendered ads</h3>
            <p>Subject to your payment of applicable fees and compliance with these Terms, you own the static image and video ads you render ("Rendered Ads") to the maximum extent permitted by applicable law. You acknowledge that works produced mainly by automated rendering may have limited or no copyright protection under current law and that you are responsible for assessing their legal status in your jurisdiction.</p>
              </div>
              <div id="11-3" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">11.3 AdRender IP</h3>
            <p>The Service, including all software, designs, the AdRender name and logo, Brain (our tools for researching brands and preparing ad copy), and related intellectual property, is owned by AdRender or its licensors. No rights are granted beyond those expressly stated.</p>
              </div>
              <div id="11-4" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">11.4 Feedback</h3>
            <p>Any feedback or suggestions you provide may be used by AdRender without restriction or compensation to you.</p>
              </div>
            </div>
          </section>

          <section id="12" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">12. Acceptable Use Policy</h2>
            <div className="space-y-3">
            <p>You must not use the Service to create, render, store, or distribute content that:</p>
            <ol className="list-none space-y-2 pl-0">
              <li className="flex gap-2.5">
                <span className="shrink-0 text-zinc-500">(a)</span>
                <span>infringes any intellectual property, publicity, or privacy rights;</span>
              </li>
              <li className="flex gap-2.5">
                <span className="shrink-0 text-zinc-500">(b)</span>
                <span>constitutes hate speech or discrimination against any individual or group based on a protected characteristic;</span>
              </li>
              <li className="flex gap-2.5">
                <span className="shrink-0 text-zinc-500">(c)</span>
                <span>depicts, simulates, or facilitates child sexual abuse material — violations will be reported to NCMEC and law enforcement;</span>
              </li>
              <li className="flex gap-2.5">
                <span className="shrink-0 text-zinc-500">(d)</span>
                <span>is sexually explicit;</span>
              </li>
              <li className="flex gap-2.5">
                <span className="shrink-0 text-zinc-500">(e)</span>
                <span>depicts real people without lawful basis, including non-consensual intimate imagery or impersonation;</span>
              </li>
              <li className="flex gap-2.5">
                <span className="shrink-0 text-zinc-500">(f)</span>
                <span>promotes illegal activity, violence, terrorism, self-harm, or eating disorders;</span>
              </li>
              <li className="flex gap-2.5">
                <span className="shrink-0 text-zinc-500">(g)</span>
                <span>constitutes deceptive advertising, fraud, or health misinformation;</span>
              </li>
              <li className="flex gap-2.5">
                <span className="shrink-0 text-zinc-500">(h)</span>
                <span>advertises regulated products in violation of applicable law;</span>
              </li>
              <li className="flex gap-2.5">
                <span className="shrink-0 text-zinc-500">(i)</span>
                <span>contains malware or interferes with the Service; or</span>
              </li>
              <li className="flex gap-2.5">
                <span className="shrink-0 text-zinc-500">(j)</span>
                <span>violates any applicable law, regulation, or platform policy, including those of Meta, TikTok, Shopify, and other advertising platforms.</span>
              </li>
            </ol>
            <p>We may remove content, suspend or terminate accounts, and report violations to law enforcement.</p>
            </div>

          </section>

          <section id="13" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">13. Cancellation, Deletion, Suspension, and Termination</h2>
            <p>Cancelling a subscription, deleting your account, and suspension or termination by AdRender are different actions and are not interchangeable. A payment that is past due is not the Free plan.</p>
            <div className="mt-4 space-y-4">
              <div id="13-1" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">13.1 Delete Account (Self-Initiated)</h3>
            <div className="space-y-3">
            <p>On a web-billed account, you may delete your account from Profile → My Account → Delete my account, on the personal workspace only. You may also ask us to delete it. Account deletion is not subscription cancellation. To cancel a subscription and keep your account and content, see Section 4.6.</p>
            <p>When you delete your account, your login is removed right away and any Stripe subscription is cancelled. The account is archived for 30 days. During that window you can ask us to restore it. Talk to us through the customer service chat or send us an email at <a href="mailto:info@adrender.app" className="text-[#00e5ff] hover:underline">info@adrender.app</a>. After 30 days, everything is permanently deleted and restoration is not possible.</p>
            <p>Deletion is blocked while a payment is past due.</p>
            <p>A Shopify-billed account cannot be deleted from the web app. If a web account is deleted while a Shopify store is still installed, the store owner sees a screen where they can ask us to restore the account by emailing <a href="mailto:info@adrender.app" className="text-[#00e5ff] hover:underline">info@adrender.app</a>, or choose "Delete web account and start fresh". That fresh start is blocked while affiliate commission is unpaid. Staff see: "The store owner has closed the AdRender account linked to this store. Please ask the store owner." The owner is Shopify's account owner.</p>
            <p>You may ask us to delete immediately and skip the 30-day archive by emailing <a href="mailto:info@adrender.app" className="text-[#00e5ff] hover:underline">info@adrender.app</a> from your account's email.</p>
            </div>
              </div>
              <div id="13-2" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">13.2 By Us</h3>
            <p>We may suspend or terminate your account with or without notice for breach of these Terms, non-payment, fraudulent or abusive behavior, or where your use creates legal risk.</p>
              </div>
              <div id="13-3" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">13.3 Payment-Related Account Status</h3>
            <div className="space-y-3">
            <p>If a payment for a web-app subscription fails, we email you and send a message in the customer service chat. The account is past due. It is not moved to Free because of that failure. If it is still unpaid 3 days after that first failure, the account is suspended: rendering, templates, the library, and brands are paused. You can still sign in. Plans &amp; Billing and the customer service chat stay open. Access returns on its own when a payment succeeds.</p>
            <p>If Stripe then cancels the subscription because payment could not be collected, the account moves to the Free plan as in Section 4.6, and we email you. Those changes are not account deletion under Section 13.1. Payment retries and the final cancellation decision follow Stripe's timeline.</p>
            <p>Shopify-billed accounts follow Shopify's billing for failed charges (Section 4A). They are not put through this web-app suspension.</p>
            </div>
              </div>
              <div id="13-4" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">13.4 Effect of Cancellation, Deletion, and Termination</h3>
            <div className="space-y-3">
            <p>If you cancel a subscription (Section 4.6 or Section 4A.3), you keep the plan until the period you already paid for ends, and then the account is on the Free plan. All content — ads, brands, and workspaces — is kept, except where Section 9 deletes a store's data after uninstall. Tokens already on the account are not deleted by cancellation. On the Free plan you cannot create new items beyond the Free limits. Cancellation does not delete your account.</p>
            <p>If you delete your account (Section 13.1), access ends immediately, outstanding fees become due, and tokens are removed with the account. The account is archived for 30 days as described above, then permanently deleted, unless you ask us to restore it in that window or you ask for immediate deletion.</p>
            <p>If we suspend or terminate your account (Section 13.2), your access ends, outstanding fees become due, tokens are forfeited, and we will delete or de-identify your account data within 30 days, subject to legal retention requirements.</p>
            <p>Sections 4A, 5, 7, 8, 9, 10, 11.3, 12, 14, and 15–21 survive termination.</p>
            </div>
              </div>
            </div>
          </section>

          <section id="14" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">14. Privacy and Data</h2>
            <p>Our Privacy Policy at <a href="https://adrender.app/privacy" className="text-[#00e5ff] hover:underline">adrender.app/privacy</a> governs our data practices and is incorporated into these Terms by reference. If you are protected by GDPR, CCPA, or equivalent privacy laws you have rights including access, correction, deletion, restriction, portability, and objection. Contact <a href="mailto:info@adrender.app" className="text-[#00e5ff] hover:underline">info@adrender.app</a> to exercise these rights.</p>

          </section>

          <section id="15" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">15. Third-Party Services</h2>
            <p>The Service works with third-party services including Shopify and Meta, and with payment processors including Stripe. We are not responsible for their availability, content, or data handling. Your use of third-party services is governed by their own terms.</p>

          </section>

          <section id="16" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">16. Disclaimers of Warranties</h2>
            <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY, OR RELIABILITY. WE DO NOT WARRANT THAT RENDERED ADS WILL BE ACCURATE, NON-INFRINGING, OR FIT FOR ADVERTISING USE. YOU ASSUME ALL RISK FROM USE OF RENDERED ADS. SOME JURISDICTIONS DO NOT ALLOW EXCLUSION OF CERTAIN WARRANTIES; IN THOSE JURISDICTIONS EXCLUSIONS APPLY ONLY TO THE EXTENT PERMITTED BY LAW.</p>

          </section>

          <section id="17" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">17. Limitation of Liability</h2>
            <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ADRENDER AND ITS AFFILIATES, OFFICERS, AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST DATA, LOSS OF GOODWILL, OR BUSINESS INTERRUPTION, ARISING FROM USE OF THE SERVICE OR RENDERED ADS, EVEN IF ADVISED OF THE POSSIBILITY. ADRENDER'S AGGREGATE LIABILITY FOR ANY CLAIM WILL NOT EXCEED THE GREATER OF (A) THE AMOUNTS YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED US DOLLARS ($100). SOME JURISDICTIONS DO NOT ALLOW EXCLUSION OF CERTAIN DAMAGES; IN THOSE JURISDICTIONS LIABILITY IS LIMITED TO THE MAXIMUM EXTENT PERMITTED.</p>

          </section>

          <section id="18" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">18. Indemnification</h2>
            <p>You agree to defend, indemnify, and hold harmless AdRender and its officers, employees, and agents from claims, damages, liabilities, losses, costs, and expenses (including reasonable legal fees) arising from: (a) your User Content; (b) your published advertisements or campaigns; (c) your violation of these Terms or any applicable law; or (d) your violation of any third-party platform policy in connection with content created using the Service.</p>

          </section>

          <section id="19" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">19. Governing Law and Venue</h2>
            <p>These Terms are governed by the laws of the State of Florida, without regard to conflict-of-laws principles. Subject to Section 20, you consent to the exclusive jurisdiction and venue of the state and federal courts of Miami-Dade County, Florida for any action not subject to arbitration.</p>

          </section>

          <section id="20" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">20. Dispute Resolution and Arbitration</h2>
            <div className="space-y-4">
              <div id="20-1" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">20.1 Informal Resolution</h3>
            <p>Before filing any formal claim, the parties agree to attempt informal resolution for 60 days by contacting <a href="mailto:info@adrender.app" className="text-[#00e5ff] hover:underline">info@adrender.app</a> with a written description of the dispute.</p>
              </div>
              <div id="20-2" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">20.2 Binding Arbitration</h3>
            <p>Any unresolved dispute shall be settled by binding individual arbitration administered by the American Arbitration Association under its Commercial Arbitration Rules. Arbitration will take place in Miami, Florida, or by video conference for claims under $25,000.</p>
              </div>
              <div id="20-3" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">20.3 Class Action Waiver</h3>
            <p>Claims may only be brought in an individual capacity. Neither party may participate as a plaintiff or class member in any class, collective, or representative proceeding.</p>
              </div>
              <div id="20-4" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">20.4 Exceptions</h3>
            <p>Either party may seek injunctive relief in court to protect intellectual property rights or bring an action in small-claims court within that court's jurisdictional limits.</p>
              </div>
              <div id="20-5" className="scroll-mt-24">
                <h3 className="mb-1.5 font-medium text-zinc-200">20.5 Opt-Out</h3>
            <p>You may opt out of arbitration by written notice to <a href="mailto:info@adrender.app" className="text-[#00e5ff] hover:underline">info@adrender.app</a> within 30 days of first accepting these Terms.</p>
              </div>
            </div>
          </section>

          <section id="21" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">21. Changes to These Terms</h2>
            <p>We may update these Terms periodically. Material changes will be communicated by email and/or in-platform notification at least 30 days before becoming effective for paying subscribers. Continued use after the effective date constitutes acceptance. If you disagree, you may cancel per Section 4.6 or Section 4A.3.</p>

          </section>

          <section id="22" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-semibold text-white">22. Miscellaneous</h2>
            <p>These Terms constitute the entire agreement between you and AdRender regarding the Service. If any provision is unenforceable the remainder stays in effect. Failure to enforce any provision is not a waiver. You may not assign these Terms without our written consent; we may assign them in connection with a merger, acquisition, or sale of assets. Neither party is liable for delays caused by events outside reasonable control. The parties are independent contractors.</p>

          </section>

          <section id="23" className="scroll-mt-24 rounded-xl border border-white/[0.08] bg-[#12121a] p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">23. Contact</h2>
            <p className="mb-4 text-zinc-400">For questions about these Terms, billing, privacy, legal notices, or support:</p>
            <address className="not-italic space-y-1 text-zinc-300">
              <p className="font-medium text-white">ADRENDER LLC</p>
              <p>Miami, Florida, United States</p>
              <p>Talk to us through the customer service chat or send us an email at <a href="mailto:info@adrender.app" className="text-[#00e5ff] hover:underline">info@adrender.app</a>.</p>
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
