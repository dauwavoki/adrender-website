import { BrandScan } from './BrandScan'
import { ResultsShowcase } from './ResultsShowcase'
import { TemplateShowcase } from './TemplateShowcase'
import { NumberedStory } from '../site/NumberedStory'
import { Stage } from '../site/Stage'
import { SplitTitle } from '../site/SplitTitle'
import { PrimaryLink } from '../site/Buttons'
import { getSignupUrl } from '../../lib/appUrl'

/**
 * How it works — three steps, then the start line.
 * Shared by the homepage and landing pages. Check captions are not used here.
 */
export function HowItWorks() {
  const signupUrl = getSignupUrl()

  return (
    <section id="how-it-works" className="site-section scroll-mt-28">
      <div className="site-column">
        <SplitTitle as="h2" lead="How it works" />
        {/* PLACEHOLDER: intro video — insert the explainer video here when ready. Shared across homepage and all /lp/ landing pages. */}
        <div className="mt-14">
          <NumberedStory
            steps={[
              {
                id: 'how-add-your-brand',
                indexLabel: 'Add your brand',
                title: 'Add your brand',
                body: 'Scan your website and AdRender pulls your brand voice, colors, logo, product images and ad copy automatically. Or upload your assets, or connect your Shopify store. No URL needed to start, and you can add your assets any time later.',
                visual: (
                  <Stage>
                    <BrandScan />
                  </Stage>
                ),
              },
              {
                id: 'how-choose-templates',
                indexLabel: 'Choose winning templates',
                title: 'Choose winning templates',
                body: "Browse what's working, then render at scale. Filter 100M+ real ads running right now by longest-running, niche, platform, and more, to see exactly what’s working for your competitors.",
                visual: (
                  <Stage>
                    <TemplateShowcase />
                  </Stage>
                ),
              },
              {
                id: 'how-see-your-ads',
                indexLabel: 'See your ads',
                title: 'See your ads',
                body: 'Finished creatives, ready to launch. Brand colors, products, and winning formats applied.',
                visual: (
                  <Stage>
                    <ResultsShowcase />
                  </Stage>
                ),
              },
            ]}
          />
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <SplitTitle as="h2" lead="Sign up free." rest="Choose a template. Get your ads." />
          <p className="site-lead mt-4 max-w-xl">
            You don&apos;t need a website, photos or any design skills to start. Create a free account,
            pick a template and render your first ads.
          </p>
          <div className="mt-6">
            <PrimaryLink href={signupUrl}>Start free</PrimaryLink>
          </div>
        </div>
      </div>
    </section>
  )
}
