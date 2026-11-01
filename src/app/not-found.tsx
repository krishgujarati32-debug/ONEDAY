import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function NotFound() {
  return (
    <div className="empty-state">
      <span className="eyebrow">404 · A SMALL DETOUR</span>
      <h1>This page isn’t on the roadmap.</h1>
      <p>The link may be outdated. Your next lesson is still waiting.</p>
      <Link className="button button-primary" href="/roadmap">
        Back to the roadmap
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
