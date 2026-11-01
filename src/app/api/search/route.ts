import { NextRequest, NextResponse } from "next/server";
import { phases, topics } from "@/data/curriculum";
import { projects } from "@/data/projects";
import { technologies } from "@/data/technologies";
import { resources } from "@/data/resources";
const records = [
  ...phases.map((p) => ({
    label: p.shortTitle,
    type: "Phase",
    description: p.purpose,
    href: "/roadmap/" + p.slug,
  })),
  ...topics.map((t) => ({
    label: t.title,
    type: "Topic",
    description: t.explanation,
    href: "/learn/" + t.slug,
  })),
  ...topics.flatMap((t) =>
    t.subtopics.map((s) => ({
      label: s.title,
      type: "Lesson",
      description: t.title + " · " + s.explanation,
      href: "/learn/" + t.slug + "#" + s.id,
    })),
  ),
  ...projects.map((p) => ({
    label: p.title,
    type: "Project",
    description: p.purpose,
    href: "/projects/" + p.slug,
  })),
  ...technologies.map((t) => ({
    label: t.name,
    type: "Technology",
    description: t.description,
    href: "/technology-stack#" + t.id,
  })),
  ...resources.map((r) => ({
    label: r.title,
    type: "Resource",
    description: r.provider + " · " + r.description,
    href: "/resources#" + r.id,
  })),
];
export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get("q") ?? "")
    .trim()
    .toLowerCase()
    .slice(0, 100);
  if (!q)
    return NextResponse.json({
      results: records.filter((r) => r.type === "Phase").slice(0, 6),
    });
  const words = q.split(/\s+/);
  const results = records
    .filter((r) =>
      words.every((w) =>
        (r.label + " " + r.description).toLowerCase().includes(w),
      ),
    )
    .sort(
      (a, b) =>
        Number(b.label.toLowerCase().includes(q)) -
        Number(a.label.toLowerCase().includes(q)),
    )
    .slice(0, 40);
  return NextResponse.json({ results });
}
