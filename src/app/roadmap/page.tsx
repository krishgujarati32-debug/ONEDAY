import { PageHeading, Pill } from "@/components/ui";
import { RoadmapExplorer } from "@/components/roadmap";
import { lessonCounts } from "@/data/curriculum";
import { Compass } from "lucide-react";
export const metadata = { title: "The complete roadmap" };
export default function Roadmap() {
  return (
    <>
      <PageHeading
        eyebrow="YOUR NORTH STAR"
        title="One path. Connected possibilities."
        description="A carefully ordered journey from your first foundations to production AI systems."
        action={
          <Pill tone="purple">
            <Compass size={13} />
            {lessonCounts.phases} phases ·{" "}
            {lessonCounts.subtopics.toLocaleString()} lessons
          </Pill>
        }
      />
      <div className="roadmap-intro">
        <div className="intro-marker">↳</div>
        <div>
          <strong>Your roadmap, your pace.</strong>
          <p>
            Follow the core path in order, learn mathematics alongside
            programming, and explore advanced topics whenever you’re curious.
            Prerequisites are recommendations, not locked doors. Time estimates
            are flexible.
          </p>
        </div>
      </div>
      <RoadmapExplorer />
    </>
  );
}
