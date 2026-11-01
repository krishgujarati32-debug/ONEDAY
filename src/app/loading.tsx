export default function Loading() {
  return (
    <div className="loading-screen" aria-label="Loading page" role="status">
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-line" />
      <div className="stats-grid">
        {[1, 2, 3, 4].map((i) => (
          <div className="skeleton skeleton-card" key={i} />
        ))}
      </div>
      <div className="skeleton skeleton-large" />
      <span className="sr-only">Loading your learning space…</span>
    </div>
  );
}
