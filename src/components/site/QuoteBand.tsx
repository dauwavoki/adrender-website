export function QuoteBand({ quote, attribution }: { quote: string; attribution: string }) {
  return (
    <section className="site-quote-band">
      <div className="site-column">
        <blockquote className="site-quote">“{quote}”</blockquote>
        <p className="site-quote-by">{attribution}</p>
      </div>
    </section>
  )
}
