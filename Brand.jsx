export default function Brand() {
  return <span className="brand">
    <img src={`${import.meta.env.BASE_URL}images/brand-white.png`} width="220" height="56" alt="The Smart Innovation — الابتكار الذكي" onError={(event) => { event.currentTarget.hidden = true; event.currentTarget.nextElementSibling.hidden = false; }} />
    <span className="brand-fallback" hidden><span className="brand-symbol" aria-hidden="true">◇</span><span>The Smart<strong>Innovation</strong></span></span>
  </span>;
}
