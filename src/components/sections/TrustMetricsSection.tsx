const metrics = [["20+", "Industry experience"], ["4+", "Insurance partners"], ["10K+", "Customers guided"], ["99%", "Customer retention"]];
export function TrustMetricsSection() {
  return <section className="trust section" aria-labelledby="trust-title"><div className="trust-container">
    <h2 id="trust-title">Confidence begins with trust.</h2>
    <div className="metrics">{metrics.map(([value,label]) => <div key={label}><p className="metric-value">{value}</p><p className="metric-label">{label}</p></div>)}</div>
  </div></section>;
}
