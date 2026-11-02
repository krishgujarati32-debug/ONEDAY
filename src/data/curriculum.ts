import outline from "./outline.json";
import knowledge from "./knowledge.json";
import definitions from "./lessons.json";
import { phaseResources, topicResources, resources } from "./resources";
import type { Phase, Topic, Priority } from "@/lib/types";
import { slugify } from "@/lib/slug";
const shortTitles = [
  "Computer Science Foundations",
  "Python & Programming",
  "Mathematics & Problem Solving",
  "Software, Data & Databases",
  "Data Science & Machine Learning",
  "Deep Learning & PyTorch",
  "NLP, Transformers & LLMs",
  "Backend & AI Engineering",
  "RAG, Agents & Knowledge",
  "System Design & Scalability",
  "Production, Security & MLOps",
  "Advanced AI Architecture",
];
const durations = [
  "3–4 weeks",
  "6–8 weeks",
  "Parallel · ongoing",
  "4–6 weeks",
  "6–8 weeks",
  "5–7 weeks",
  "5–7 weeks",
  "6–8 weeks",
  "5–7 weeks",
  "8–10 weeks",
  "6–8 weeks",
  "6–10 weeks",
];
const colors = [
  "#7360d9",
  "#4f82cb",
  "#c78c38",
  "#4b9c8c",
  "#9b68b6",
  "#cc6b7b",
  "#587cb9",
  "#60967b",
  "#9a77bd",
  "#c78c51",
  "#5d929a",
  "#746fbc",
];
const prereqNumbers: number[][] = [
  [],
  [0],
  [1],
  [1],
  [1, 2, 3],
  [2, 4],
  [5],
  [1, 3],
  [6, 7],
  [3, 7],
  [7],
  [8, 9, 10],
];
const exerciseStarts = [
  "Create a labeled diagram or safe local experiment",
  "Write and run a small self-contained program",
  "Calculate a tiny example by hand, then verify it with Python",
  "Build a minimal schema or data-processing example",
  "Run a small notebook experiment on held-out examples",
  "Run a tiny tensor or training experiment",
  "Trace a tiny text or probability example",
  "Write a small API example with a valid and an invalid request",
  "Build a tiny retrieval or tool-workflow example",
  "Simulate a small workload or failure case on your own service",
  "Create a reproducible configuration, test or threat-model example",
  "Write a measured design experiment or architecture decision",
];
const optionalTopicIds = new Set(["6.5", "8.4", "8.6"]);
export const phases: Phase[] = outline.map((p) => {
  const topics: Topic[] = p.topics.map((t, ti) => {
    const pack = knowledge[t.id as keyof typeof knowledge];
    const priority: Priority =
      p.number === 11 || optionalTopicIds.has(t.id) ? "advanced" : "core";
    const resourceIds = [
      ...new Set([
        ...(topicResources[t.id] ?? phaseResources[p.number]),
        ...resources
          .filter((r) => r.relatedTopicIds.includes(t.id))
          .map((r) => r.id),
      ]),
    ];
    const subtopics = t.subtopics.map((title, si) => {
      const explanation = (definitions as Record<string, string[]>)[t.id][si];
      const optional =
        /Apache Spark|Distributed training|CUDA|Kubernetes|Terraform|Qdrant|Weaviate|Triton|Generation Inference|vLLM/.test(
          title,
        );
      return {
        id: `${t.id}.${si + 1}`,
        title,
        explanation,
        why: `${pack.why} This lesson focuses on ${title.toLowerCase()} so you can explain the relevant behavior before adding complexity.`,
        study: [
          explanation,
          `Identify the assumptions and limitations of ${title.toLowerCase()}.`,
          `Connect this concept to ${pack.application.charAt(0).toLowerCase() + pack.application.slice(1)}`,
        ],
        application: pack.application,
        exercise: `${exerciseStarts[p.number]} focused on ${title.toLowerCase()}. Use the definition above to predict the result first; record the actual result and one edge case. Apply the result to the topic assignment below.`,
        criteria: [
          `Explain ${title.toLowerCase()} in your own words without reading the definition.`,
          `Produce the exercise artifact and explain why the observed result matches or differs from your prediction.`,
          `Show one limitation or failing case and describe what to study next.`,
        ],
        minutes: p.number < 2 ? 30 : p.number < 7 ? 45 : 60,
        priority: optional ? ("optional" as Priority) : priority,
        resources: resourceIds.slice(0, 3),
      };
    });
    return {
      id: t.id,
      slug: slugify(t.title),
      title: t.title,
      phase: p.number,
      ...pack,
      priority,
      difficulty:
        p.number < 4 ? "beginner" : p.number < 9 ? "intermediate" : "advanced",
      prerequisites:
        ti > 0
          ? [
              p.topics
                .slice(0, ti)
                .filter((x) => !optionalTopicIds.has(x.id))
                .at(-1)?.id ?? p.topics[0].id,
            ]
          : [],
      subtopics,
      hours: subtopics.reduce((n, s) => n + s.minutes, 0) / 60,
      resources: resourceIds,
      outcomes: [
        `Explain and demonstrate ${t.subtopics[0].toLowerCase()}.`,
        `Apply ${t.subtopics[Math.floor(t.subtopics.length / 2)].toLowerCase()} in a small worked example.`,
        `Complete the practical assignment and document ${t.subtopics.at(-1)?.toLowerCase()}.`,
      ],
      guidance: ("guidance" in t ? t.guidance : []) ?? [],
    };
  });
  return {
    id: `phase-${p.number}`,
    slug: slugify(shortTitles[p.number]),
    number: p.number,
    title: p.title,
    shortTitle: shortTitles[p.number],
    purpose: p.purpose,
    why: topics[0].why,
    weeks: durations[p.number],
    difficulty:
      p.number < 4 ? "beginner" : p.number < 9 ? "intermediate" : "advanced",
    priority: p.number === 11 ? "advanced" : "core",
    prerequisites: prereqNumbers[p.number].map((n) => `phase-${n}`),
    outcomes: topics.slice(0, 3).map((t) => t.assignment),
    topics,
    color: colors[p.number],
  };
});
const supporting = [
  {
    id: "1.7-java",
    title: "Java — Optional Backend Path",
    explanation:
      "Java is a statically typed language widely used for enterprise services. Explore it when maintaining an existing JVM service or when a role requires it; it is not needed before machine learning.",
    terms: [
      "JVM and compilation",
      "Classes and interfaces",
      "Collections and generics",
      "HTTP service fundamentals",
      "Testing with JUnit",
    ],
    defs: [
      "The JVM executes portable bytecode produced by the Java compiler.",
      "Classes define implementations; interfaces define contracts for interchangeable objects.",
      "Collections organize values while generics preserve compile-time element-type relationships.",
      "An HTTP service maps requests to validated application behavior.",
      "JUnit runs automated tests that compare behavior with explicit expectations.",
    ],
  },
  {
    id: "1.7-go",
    title: "Go — Optional Infrastructure Path",
    explanation:
      "Go is a compiled language with a small syntax and built-in concurrency primitives. Explore it for infrastructure or networking work after building your first AI application.",
    terms: [
      "Go modules and tooling",
      "Structs and interfaces",
      "Goroutines",
      "Channels and synchronization",
      "HTTP services and tests",
    ],
    defs: [
      "Modules identify versioned dependency units; go tooling builds and tests packages.",
      "Structs group data; interfaces are satisfied by compatible method sets.",
      "Goroutines are concurrently scheduled functions managed by the Go runtime.",
      "Channels communicate values; synchronization still needs clear ownership and cancellation.",
      "The standard library supports HTTP handlers and table-driven behavior tests.",
    ],
  },
  {
    id: "1.7-cpp",
    title: "C++ — Optional Systems Path",
    explanation:
      "C++ offers close control over memory and performance. Explore it when low-level serving or accelerator work demands it, after the core Python and ML path.",
    terms: [
      "Compilation and build systems",
      "Values and references",
      "RAII and smart pointers",
      "Standard containers",
      "Profiling and memory safety",
    ],
    defs: [
      "C++ source is compiled and linked into native programs using build configuration.",
      "Values own data; references and pointers refer to objects with defined lifetimes.",
      "RAII ties resource cleanup to object lifetime; smart pointers express ownership.",
      "Standard containers implement common structures such as vectors and hash maps.",
      "Profilers and sanitizers find measured bottlenecks and memory errors.",
    ],
  },
];
for (const x of supporting) {
  phases[1].topics.push({
    id: x.id,
    slug: slugify(x.title),
    title: x.title,
    phase: 1,
    explanation: x.explanation,
    why: "This is a situational supporting language, not a prerequisite for the main AI path.",
    application:
      "Maintaining an infrastructure service that uses this language.",
    assignment: `Build a small command-line program in ${x.title.split(" —")[0]}, add behavior tests and document when you would choose it over Python.`,
    outcomes: [
      "Build a small program.",
      "Explain its memory and execution model.",
    ],
    prerequisites: ["1.5"],
    difficulty: "intermediate",
    priority: "optional",
    hours: 5,
    resources: [
      x.id === "1.7-java" ? "java" : x.id === "1.7-go" ? "go" : "cpp",
    ],
    guidance: ["Explore only when a project or role calls for it."],
    subtopics: x.terms.map((title, i) => ({
      id: `${x.id}.${i + 1}`,
      title,
      explanation: x.defs[i],
      why: "The concept makes the language usable for its intended service work.",
      study: [x.defs[i], "Compare this behavior with the Python equivalent."],
      application: "A small independently tested infrastructure utility.",
      exercise: `Write a minimal example of ${title.toLowerCase()}, run it and document one failing input.`,
      criteria: [
        "Show working code and one error case.",
        "Explain how the behavior differs from Python.",
      ],
      minutes: 60,
      priority: "optional",
      resources: [
        x.id === "1.7-java" ? "java" : x.id === "1.7-go" ? "go" : "cpp",
      ],
    })),
  });
}
export const topics = phases.flatMap((p) => p.topics);
export const subtopics = topics.flatMap((t) => t.subtopics);
export const topicBySlug = Object.fromEntries(topics.map((t) => [t.slug, t]));
export const topicById = Object.fromEntries(topics.map((t) => [t.id, t]));
export const phaseBySlug = Object.fromEntries(phases.map((p) => [p.slug, p]));
export const lessonCounts = {
  phases: phases.length,
  topics: topics.length,
  subtopics: subtopics.length,
  core: subtopics.filter((s) => s.priority === "core").length,
};
