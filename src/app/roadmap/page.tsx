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
        title="AI Systems Engineering Roadmap"
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
          <strong>Learning sequence</strong>
          <p>
            Follow the phases and lessons in order. Revisit completed material
            whenever you need a refresher.
          </p>
        </div>
      </div>
      <RoadmapExplorer />
    </>
  );
}
