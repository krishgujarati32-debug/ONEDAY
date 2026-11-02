import outline from "./outline.json";
import revisitsJson from "./resource-revisits.json";
import plansJson from "./resource-plans.json";
import verification from "./resource-verification.json";
import type {
  Priority,
  Resource,
  ResourceLearningMoment,
  ResourceStage,
} from "@/lib/types";
type ResourceBase = Pick<
  Resource,
  | "id"
  | "title"
  | "provider"
  | "category"
  | "description"
  | "url"
  | "type"
  | "free"
  | "phases"
>;
type Plan = {
  priority: string;
  topicId: string;
  stageType: string;
  prerequisites: string[];
  focusSections: string[];
  objectives: string[];
  startWhen: string;
  why: string;
  task: string;
  criteria: string[];
  nextTopicId: string;
  projects: string[];
  notes: string;
};
const plans = plansJson as Record<string, Plan>;
type RevisitPlan = Pick<
  ResourceLearningMoment,
  | "prerequisiteTopicIds"
  | "focusSections"
  | "startWhen"
  | "whyAtThisStage"
  | "practicalTask"
  | "learningObjectives"
  | "completionCriteria"
  | "projectIds"
  | "nextTopicId"
  | "stageType"
>;
const revisits = revisitsJson as Record<string, RevisitPlan>;
const topicInfo = Object.fromEntries(
  outline.flatMap((p) =>
    p.topics.map((t, i) => [
      t.id,
      {
        ...t,
        phase: p.number,
        order: i,
        previous: p.topics
          .slice(0, i)
          .filter((t) => !["6.5", "8.4", "8.6"].includes(t.id))
          .at(-1)?.id,
      },
    ]),
  ),
);
for (const [i, id] of ["1.7-java", "1.7-go", "1.7-cpp"].entries())
  topicInfo[id] = {
    id,
    title: [
      "Java — Optional Backend Path",
      "Go — Optional Infrastructure Path",
      "C++ — Optional Systems Path",
    ][i],
    subtopics: [],
    phase: 1,
    order: 8 + i,
    previous: "1.5",
  };
const name = (id: string) => topicInfo[id]?.title ?? id;
function moment(
  id: string,
  p: Plan,
  topicId: string,
  overrides: Partial<ResourceLearningMoment> = {},
): ResourceLearningMoment {
  const nextId =
    "nextTopicId" in overrides ? overrides.nextTopicId : p.nextTopicId;
  const t = topicInfo[topicId];
  if (!t) throw new Error("Unknown resource topic " + topicId);
  return {
    id,
    phaseId: `phase-${t.phase}`,
    phaseNumber: t.phase,
    topicId,
    stageType: p.stageType as ResourceStage,
    sequenceOrder: t.phase * 10000 + t.order * 100 + 10,
    isPrimaryMoment: true,
    recommendedTiming: p.startWhen,
    startWhen: p.startWhen,
    prerequisiteTopicIds: p.prerequisites,
    previousLessonIds: [],
    focusSections: p.focusSections,
    learningObjectives: p.objectives,
    whyAtThisStage: p.why,
    practicalTask: p.task,
    completionCriteria: p.criteria,
    nextStep: nextId
      ? `After the exercise, continue to ${name(nextId)}. Use the linked project milestone to connect these skills.`
      : "Complete the related project milestone and document the result before adding another tool.",
    nextTopicId: nextId || undefined,
    projectIds: p.projects,
    estimatedMinutes: p.priority === "advanced" ? 120 : 60,
    advanced:
      p.priority === "advanced" ||
      t.phase === 11 ||
      ["6.5", "8.4", "8.6"].includes(topicId),
    ...overrides,
  };
}
const extras: Record<string, Partial<ResourceLearningMoment>[]> = {
  web: [
    {
      topicId: "1.6-javascript",
      prerequisiteTopicIds: ["1.2", "1.5"],
      focusSections: [
        "JavaScript language fundamentals",
        "Functions, arrays and objects",
        "DOM and events",
        "Promises and fetch",
        "HTTP requests from a browser",
      ],
      startWhen:
        "Return to the JavaScript learning sections in Phase 01 after functions and professional Python development. Read the browser examples alongside the TypeScript Handbook, after basic JavaScript syntax.",
      whyAtThisStage:
        "You can transfer programming ideas to the browser while separating JavaScript runtime behavior from TypeScript compile-time checking.",
      learningObjectives: [
        "Explain a browser event and an asynchronous request.",
        "Distinguish JavaScript execution from static type checking.",
      ],
      practicalTask:
        "Build a tiny browser form that fetches sample JSON and renders a valid response, handling an error without unsafe HTML insertion.",
      completionCriteria: [
        "A loading and a failure case are visible.",
        "Explain the request and DOM update flow.",
      ],
      nextTopicId: "1.6-sql",
    },
  ],
  "information-theory": [
    {
      topicId: "6.4",
      prerequisiteTopicIds: ["2.7", "6.2", "6.3"],
      focusSections: [
        "Entropy and uncertainty",
        "Conditional entropy",
        "Cross-entropy interpretation",
        "Mutual information overview",
      ],
      startWhen:
        "Revisit only the entropy and uncertainty material during LLM Internals in Phase 06, after the Phase 02 introduction and transformer fundamentals.",
      whyAtThisStage:
        "Token distributions and language-model loss now give the earlier probability ideas a concrete interpretation.",
      learningObjectives: [
        "Connect predictive uncertainty with entropy.",
        "Explain what token-level loss does and does not measure.",
      ],
      practicalTask:
        "Compute entropy for two tiny token distributions and compare their uncertainty; interpret a supplied cross-entropy example without treating it as application quality.",
      completionCriteria: [
        "Probability distributions are normalized.",
        "Separate prediction loss from answer usefulness.",
      ],
      nextTopicId: "6.7",
    },
  ],
  pytest: [
    {
      topicId: "7.2",
      prerequisiteTopicIds: ["1.5", "7.1"],
      focusSections: [
        "Fixtures",
        "Parametrized tests",
        "Mocking external dependencies",
        "Request/response assertions",
        "Error and authentication cases",
      ],
      startWhen:
        "Reopen the testing sections while implementing your first FastAPI endpoints in Phase 07, after API Engineering. Keep tests local or mock provider requests.",
      whyAtThisStage:
        "A real request/response boundary lets you test validation and failure behavior independently of a model provider.",
      learningObjectives: [
        "Verify API contracts with controlled fixtures.",
        "Cover invalid requests and dependency failures.",
      ],
      practicalTask:
        "Test a prediction route with valid input, a schema error and a failed dependency; keep secrets and paid calls out of the suite.",
      completionCriteria: [
        "Tests are deterministic and run without a paid provider.",
        "Each case asserts the response status and contract.",
      ],
      nextTopicId: "7.3",
    },
  ],
  "prompt-engineering": [
    {
      topicId: "7.4",
      prerequisiteTopicIds: ["6.7", "7.2"],
      focusSections: [
        "Message roles and instruction boundaries",
        "Typed template variables",
        "Schema validation",
        "Versioned prompt fixtures",
        "Context limits",
      ],
      startWhen:
        "Revisit the provider implementation details during AI Provider Integration in Phase 07, after designing a tested prompt contract in Phase 06.",
      whyAtThisStage:
        "The prompt is now part of a validated API boundary with explicit credentials, timeout handling and output checks.",
      learningObjectives: [
        "Keep provider syntax behind an adapter.",
        "Validate structured output before application use.",
      ],
      practicalTask:
        "Integrate one versioned template through a mockable provider adapter, rejecting invalid output and recording the template version without logging private inputs.",
      completionCriteria: [
        "The adapter can be tested with supplied responses.",
        "Invalid JSON or semantic values produce controlled errors.",
      ],
      nextTopicId: "7.5",
    },
    {
      topicId: "11.2",
      prerequisiteTopicIds: ["6.7", "7.4", "10.4", "11.1"],
      focusSections: [
        "Prompt/version comparison",
        "Context selection",
        "Task contracts",
        "Structured output validation",
        "Regression evaluations",
      ],
      startWhen:
        "Return during Intelligent Model Routing in Phase 11 only after evaluation fundamentals and provider adapters are working.",
      whyAtThisStage:
        "Changing the selected model or context assembly can change task behavior even when the prompt text remains identical.",
      learningObjectives: [
        "Evaluate routing and prompt changes together.",
        "Record provider-specific differences rather than assuming portability.",
      ],
      practicalTask:
        "Compare two CCAI routing/prompt configurations on the same fixtures; record quality, cost, latency and validation failures.",
      completionCriteria: [
        "The comparison uses identical cases and a fixed baseline.",
        "A provider-specific regression is documented.",
      ],
      nextTopicId: "11.3",
      advanced: true,
    },
  ],
  mlflow: [
    {
      topicId: "4.6",
      stageType: "after_topic",
      prerequisiteTopicIds: ["4.2", "4.5"],
      focusSections: [
        "Tracking runs",
        "Parameters",
        "Metrics",
        "Artifacts",
        "Comparing experiments",
      ],
      learningObjectives: [
        "Record comparable experiments with data and code provenance.",
        "Choose a candidate using consistent metrics rather than the best training score.",
      ],
      startWhen:
        "Open the tracking-only sections after training and comparing your first models in Phase 04, during Model Training and Improvement.",
      whyAtThisStage:
        "A real pair of model experiments gives parameters, metrics and artifacts something concrete to describe.",
      practicalTask:
        "Track two model runs on the same split, log their parameters and metrics, save artifacts and explain the comparison.",
      completionCriteria: [
        "Both runs can be reproduced and compared.",
        "The report records dataset, code and validation choices.",
      ],
      nextTopicId: "10.9",
      nextStep:
        "Use these experiment records in Project 02; return to model registry and lifecycle sections during MLOps in Phase 10.",
      projectIds: ["project-2"],
      sequenceOrder: 40590,
    },
  ],
  ragas: [
    {
      topicId: "8.3",
      stageType: "after_topic",
      prerequisiteTopicIds: ["8.1", "8.2", "8.3"],
      previousLessonIds: ["8.3.19"],
      focusSections: [
        "Representative evaluation dataset",
        "Capturing retrieved contexts and answers",
        "Selected faithfulness and retrieval metrics",
        "Inspecting failures",
        "Comparing a baseline",
      ],
      learningObjectives: [
        "Measure retrieval separately from answer support.",
        "Recognize the limitations of judge-generated scores.",
      ],
      startWhen:
        "Open after building a working Traditional RAG baseline in Phase 08 and reading its RAG evaluation lesson. Capture questions, evidence and answers before installing an evaluator.",
      whyAtThisStage:
        "The first document assistant now produces inspectable retrieval and answer traces, so evaluation can improve an actual baseline.",
      practicalTask:
        "Create a small versioned set of answerable and unanswerable PDF questions, evaluate the baseline with one chosen tool and inspect low-scoring cases.",
      completionCriteria: [
        "The same questions and settings are retained for a later comparison.",
        "A short report separates retrieval failures from unsupported generated claims.",
      ],
      nextTopicId: "8.4",
      nextStep:
        "Improve only a measured retrieval weakness in Advanced RAG. Return for broader regression evaluation in Phase 10.",
      projectIds: ["project-4"],
      sequenceOrder: 80290,
    },
  ],
  cuda: [
    {
      topicId: "11.3",
      stageType: "later_reference",
      advanced: true,
      prerequisiteTopicIds: ["5.4", "6.4", "9.6", "1.7-cpp"],
      previousLessonIds: ["11.3.6"],
      focusSections: [
        "Kernel execution concepts",
        "Memory access and transfers",
        "Profiling",
        "Performance trade-offs",
        "Multi-GPU concepts only when needed",
      ],
      startWhen:
        "Return in Phase 11 after serving/inference basics and only if you choose low-level CUDA programming. Learn C++ ownership and the necessary language subset before writing custom kernels.",
      whyAtThisStage:
        "A measured serving bottleneck is needed to justify the extra complexity of low-level accelerator code.",
      practicalTask:
        "With compatible hardware, profile one small existing computation before and after a single change. Without it, analyze a documented kernel and produce a testable experiment plan.",
      completionCriteria: [
        "Separate measured results from reference-only analysis.",
        "Document correctness, precision, memory and timing assumptions.",
      ],
      nextTopicId: "11.4",
      sequenceOrder: 110240,
    },
  ],
  ray: [
    {
      id: "ray-serve",
      topicId: "11.3",
      stageType: "project",
      advanced: true,
      prerequisiteTopicIds: ["1.4", "6.4", "9.4", "9.5", "9.7", "11.1"],
      previousLessonIds: ["11.3.1", "11.3.6"],
      focusSections: [
        "Ray Serve overview",
        "Deployments and replicas",
        "Request handling",
        "Model composition",
        "Resource allocation",
        "Failure behavior",
      ],
      startWhen:
        "Consider Ray Serve during the advanced production-platform project only after the Ray Core exercise and evidence that distributed serving is required.",
      whyAtThisStage:
        "Serving orchestration adds operational cost; the parallel-workload comparison should establish a need before a framework is adopted.",
      practicalTask:
        "If justified, serve one small model and test a failure or concurrency limit, comparing the design with a simpler single-process baseline.",
      completionCriteria: [
        "State why a simpler deployment is insufficient.",
        "Record model, workload, resources and failure behavior.",
      ],
      nextTopicId: "11.4",
      sequenceOrder: 110250,
    },
  ],
  postgres: [
    {
      topicId: "1.6-sql",
      stageType: "during_topic",
      prerequisiteTopicIds: ["1.2"],
      focusSections: [
        "Tables and types",
        "SELECT and WHERE",
        "INSERT, UPDATE and DELETE",
        "GROUP BY and joins",
        "Basic constraints",
      ],
      startWhen:
        "Open only the introductory SQL tutorial sections while studying SQL in Phase 01 after functions and basic programming. Leave administration and deeper query planning for Phase 03.",
      whyAtThisStage:
        "A tiny local schema lets the SQL syntax operate on real rows without requiring full database-engineering knowledge.",
      practicalTask:
        "Create a small students/results schema and write a filtered query, a join and a grouped summary.",
      completionCriteria: [
        "Queries return the intended rows.",
        "User-supplied values are kept separate from query syntax.",
      ],
      nextTopicId: "1.6-bash",
      projectIds: ["project-1"],
      sequenceOrder: 10610,
    },
  ],
  pandas: [
    {
      topicId: "3.4",
      stageType: "during_topic",
      prerequisiteTopicIds: ["1.4", "3.2"],
      focusSections: [
        "Reading CSV/JSON",
        "Inspecting dtypes",
        "Missing values and duplicates",
        "Validation and row counts",
        "Writing a processed dataset",
      ],
      startWhen:
        "Use the ingestion and validation sections during Data Engineering Fundamentals in Phase 03. Return to broader analysis after NumPy in Phase 04.",
      whyAtThisStage:
        "A repeatable data pipeline needs explicit schemas and row-count checks before it needs advanced analysis.",
      practicalTask:
        "Build a small validated CSV transformation that quarantines malformed rows and records input/output counts.",
      completionCriteria: [
        "The pipeline is rerunnable.",
        "Rejected rows and validation rules are documented.",
      ],
      nextTopicId: "3.5",
      sequenceOrder: 30310,
    },
  ],
  numpy: [
    {
      topicId: "2.5",
      stageType: "later_reference",
      prerequisiteTopicIds: ["1.2", "2.1"],
      focusSections: [
        "Creating tiny arrays",
        "Shapes",
        "Dot products",
        "Matrix multiplication",
      ],
      startWhen:
        "Use only tiny array examples to verify hand calculations during Linear Algebra in Phase 02; study the wider NumPy workflow later in Phase 04.",
      whyAtThisStage:
        "Small numerical checks connect matrix dimensions to executable operations without making the whole library a mathematics prerequisite.",
      practicalTask:
        "Verify one hand-computed vector dot product and matrix multiplication using tiny arrays.",
      completionCriteria: [
        "Show matching expected and computed values.",
        "Explain the shapes and any incompatible multiplication.",
      ],
      nextTopicId: "2.6",
      sequenceOrder: 20420,
    },
  ],
  huggingface: [
    {
      topicId: "6.2",
      stageType: "during_topic",
      prerequisiteTopicIds: ["1.4", "5.2", "6.1"],
      focusSections: [
        "What transformers can do",
        "Tokenizer examples",
        "Model input/output overview",
        "Small inference walkthrough",
      ],
      startWhen:
        "Open selected introductory course sections after NLP fundamentals, while studying Language Model Fundamentals in Phase 06. Return for full model-loading and ecosystem practice in 6.6.",
      whyAtThisStage:
        "Token examples provide a bridge from NLP representations to language-model behavior before advanced adaptation.",
      practicalTask:
        "Inspect token IDs for a few sentences and trace a small CPU-compatible inference or supplied sample response.",
      completionCriteria: [
        "Explain why tokens do not map one-to-one to words.",
        "Record the model/tokenizer choice and a context limitation.",
      ],
      nextTopicId: "6.3",
      sequenceOrder: 60110,
    },
  ],
  "ml-course": [
    {
      topicId: "4.1",
      stageType: "during_topic",
      prerequisiteTopicIds: ["1.1", "2.1", "2.3", "2.4"],
      focusSections: [
        "Problem framing",
        "Features and labels",
        "Data preparation preview",
      ],
      startWhen:
        "Read a short problem-framing/data preview at the start of Data Science Fundamentals in Phase 04, then practice NumPy and Pandas before returning to model training.",
      whyAtThisStage:
        "A concrete question makes the purpose of data preparation clear without introducing estimator APIs prematurely.",
      practicalTask:
        "Choose a dataset question and identify a target, available features and a possible leakage risk.",
      completionCriteria: [
        "The target is observable and the feature timing is stated.",
        "Explain why a suspicious feature would leak the answer.",
      ],
      nextTopicId: "4.2",
      sequenceOrder: 40001,
    },
  ],
  statistics: [
    {
      topicId: "2.4",
      stageType: "during_topic",
      prerequisiteTopicIds: ["2.3"],
      focusSections: [
        "Random variables",
        "Discrete and continuous distributions",
        "Sampling",
        "Distribution functions",
        "Interpreting a statistical test",
      ],
      startWhen:
        "Return to distribution and test examples during Probability in Phase 02 after the descriptive-statistics visit. Learn the probability concept before calling the function.",
      whyAtThisStage:
        "The same dataset can now illustrate uncertainty rather than only descriptive summaries.",
      practicalTask:
        "Simulate or calculate a tiny probability example, compare it with a SciPy distribution and state sampling assumptions.",
      completionCriteria: [
        "Explain probability versus density.",
        "Interpret results with the correct assumptions and units.",
      ],
      nextTopicId: "2.5",
      sequenceOrder: 20310,
    },
  ],
  pgvector: [
    {
      topicId: "3.5",
      stageType: "later_reference",
      prerequisiteTopicIds: ["2.5", "3.2"],
      focusSections: [
        "Vector columns",
        "Source metadata and dimensions",
        "Ownership filters",
        "Index/storage overview",
      ],
      startWhen:
        "Consult the storage-model overview during Data Modeling and Storage for AI in Phase 03. Return for actual embedding retrieval after Embeddings and Vector Search in Phase 08.",
      whyAtThisStage:
        "You can plan where vectors and permissions belong without needing to build a full retriever yet.",
      practicalTask:
        "Draw a document/chunk/vector schema with tenant ownership, model version and source-deletion behavior.",
      completionCriteria: [
        "Dimensions and metadata have an explicit home.",
        "Deletion and access-control behavior are documented.",
      ],
      nextTopicId: "8.1",
      sequenceOrder: 30410,
    },
  ],
  otel: [
    {
      topicId: "9.8",
      stageType: "later_reference",
      prerequisiteTopicIds: ["7.2", "9.1"],
      focusSections: [
        "Metrics versus traces overview",
        "Request latency boundaries",
        "Resource-measurement planning",
      ],
      startWhen:
        "Consult the telemetry overview while planning load-test measurements in Phase 09; implement full instrumentation during Logging, Monitoring, and Observability in Phase 10.",
      whyAtThisStage:
        "A performance test first needs a definition of what is timed and what resources are measured.",
      practicalTask:
        "Sketch the request spans and metrics needed to explain a slow API request; avoid instrumenting every signal at once.",
      completionCriteria: [
        "Measurement boundaries and units are clear.",
        "The plan excludes sensitive request bodies and high-cardinality secrets.",
      ],
      nextTopicId: "10.8",
      sequenceOrder: 90720,
    },
  ],
  promptfoo: [
    {
      topicId: "10.3",
      prerequisiteTopicIds: ["6.7", "7.4", "10.2"],
      whyAtThisStage:
        "A locally working security fixture can now become a repeatable software test, rather than a one-off adversarial demonstration.",
      learningObjectives: [
        "Turn a rubric into a deterministic assertion where possible.",
        "Show that a deliberately degraded response fails a regression case.",
      ],
      completionCriteria: [
        "The fixed normal/adversarial suite fails on the deliberate regression.",
        "Fixtures contain no secrets and each failed assertion has an explanation.",
      ],
      security: true,
      focusSections: [
        "Test inputs and assertions",
        "Deterministic checks versus judge checks",
        "Regression reports",
      ],
      startWhen:
        "Revisit Promptfoo during Software and API Testing in Phase 10 after the AI security introduction, using a small fixed CCAI test set.",
      practicalTask:
        "Add normal and adversarial synthetic fixtures and show one assertion that catches a deliberate regression.",
      nextTopicId: "10.4",
    },
    {
      topicId: "10.4",
      prerequisiteTopicIds: ["6.7", "7.4", "10.2", "10.3"],
      whyAtThisStage:
        "A representative dataset and explicit rubric let you compare prompt/provider variants across quality, security, latency and cost.",
      learningObjectives: [
        "Compare two variants on identical inputs.",
        "Separate deterministic assertions from uncertain judge scores.",
      ],
      completionCriteria: [
        "Both variants use the same fixed cases and recorded settings.",
        "The report includes a failed example, score limits and measured cost/latency.",
      ],
      security: true,
      focusSections: [
        "Prompt/provider comparisons",
        "Quality assertions",
        "Cost and latency budgets",
        "Judge limitations",
      ],
      startWhen:
        "Use the comparison sections during AI and LLM Evaluation after you have a representative dataset and a chosen baseline.",
      practicalTask:
        "Compare two prompt versions on identical fixtures; inspect quality, disclosure failures, latency and cost together.",
      nextTopicId: "10.5",
    },
    {
      topicId: "10.7",
      prerequisiteTopicIds: ["0.5", "10.3", "10.4", "10.5", "10.6"],
      whyAtThisStage:
        "Only tests that already work locally and have understood cost should become automated checks; deployment remains a separate controlled step.",
      learningObjectives: [
        "Bound a regression job's fixture count and provider cost.",
        "Protect credentials and retain an inspectable evaluation report.",
      ],
      completionCriteria: [
        "The proposed job fails on a known regression and preserves its report.",
        "Fixture limits, permissions, secret handling and deployment separation are documented.",
      ],
      security: true,
      focusSections: [
        "CI/CD integration",
        "Controlled fixture counts",
        "Secret handling",
        "Reviewing evaluation artifacts",
      ],
      startWhen:
        "Consider CI integration during DevOps and CI/CD after prompt tests work locally and evaluation cost is understood.",
      practicalTask:
        "Design a small manually reviewed regression job with synthetic fixtures and protected credentials; keep deployment independent.",
      nextTopicId: "10.8",
    },
  ],
};
const previousLessons: Record<string, string[]> = {
  typescript: ["1.6-javascript.7"],
  pytorch: ["5.1.24"],
  vllm: ["11.3.1", "11.3.6"],
  ray: ["11.3.1", "11.3.6"],
  cuda: ["5.4.3"],
  celery: ["9.4.2", "9.4.5"],
  k6: ["9.8.12"],
  promptfoo: ["10.2.2"],
};
const extraRelated: Record<string, string[]> = {
  ragas: ["8.3", "8.4", "8.6", "10.4"],
  deepeval: ["8.3", "8.7", "10.4"],
  promptfoo: ["6.7", "10.2", "10.3", "10.4", "10.7"],
  cuda: ["5.4", "11.3"],
  ray: ["9.4", "9.5", "9.7", "11.3"],
  terraform: ["10.6", "10.7"],
  "github-actions": ["10.7"],
  celery: ["9.4"],
  "prompt-engineering": ["6.7", "7.4", "11.2"],
};
const supplemental: Record<string, { title: string; url: string }[]> = {
  python: [
    {
      title: "Advanced Python: asyncio introduction (Phase 01 Advanced Python)",
      url: "https://docs.python.org/3/library/asyncio.html",
    },
    {
      title: "Advanced Python: typing reference (read selected concepts)",
      url: "https://docs.python.org/3/library/typing.html",
    },
  ],
  postgres: [
    {
      title: "Phase 03: Indexes",
      url: "https://www.postgresql.org/docs/current/indexes.html",
    },
    {
      title: "Phase 03: Using EXPLAIN",
      url: "https://www.postgresql.org/docs/current/using-explain.html",
    },
  ],
  huggingface: [
    {
      title: "Phase 08: semantic search with FAISS",
      url: "https://huggingface.co/learn/llm-course/en/chapter5/6",
    },
  ],

  promptfoo: [
    {
      title: "Authorized red-team quickstart",
      url: "https://www.promptfoo.dev/docs/red-team/quickstart/",
    },
    {
      title: "CI/CD integration",
      url: "https://www.promptfoo.dev/docs/integrations/ci-cd/",
    },
  ],
  ray: [
    {
      title: "Ray Core concepts",
      url: "https://docs.ray.io/en/latest/ray-core/key-concepts.html",
    },
    { title: "Ray Serve", url: "https://docs.ray.io/en/latest/serve/" },
  ],
  terraform: [
    {
      title: "Core workflow",
      url: "https://developer.hashicorp.com/terraform/intro/core-workflow",
    },
  ],
  celery: [
    {
      title: "First steps",
      url: "https://docs.celeryq.dev/en/stable/getting-started/first-steps-with-celery.html",
    },
  ],
};
export function enrichResources(
  raw: ResourceBase[],
  legacy: Record<string, string[]>,
): Resource[] {
  return raw.map((r) => {
    const p = plans[r.id];
    if (!p) throw new Error("Missing learning plan " + r.id);
    const primary = moment(`${r.id}-primary`, p, p.topicId, {
      previousLessonIds: previousLessons[r.id] ?? [],
      security: r.id === "promptfoo",
      stageType: p.stageType as ResourceStage,
    });
    const moments = [
      primary,
      ...(extras[r.id] ?? []).map((override, i) =>
        moment(
          override.id ?? `${r.id}-visit-${override.topicId}-${i + 1}`,
          p,
          override.topicId!,
          {
            isPrimaryMoment: false,
            ...override,
            recommendedTiming: override.startWhen ?? p.startWhen,
          },
        ),
      ),
    ];
    const related = [
      ...new Set([
        p.topicId,
        ...Object.entries(legacy)
          .filter(([, ids]) => ids.includes(r.id))
          .map(([id]) => id),
        ...(r.id === "java"
          ? ["1.7-java"]
          : r.id === "go"
            ? ["1.7-go"]
            : r.id === "cpp"
              ? ["1.7-cpp"]
              : []),
        ...(extraRelated[r.id] ?? []),
        ...moments.map((m) => m.topicId),
      ]),
    ];
    const earliest = Math.min(...moments.map((m) => m.sequenceOrder));
    for (const topicId of related) {
      const t = topicInfo[topicId];
      if (
        !t ||
        moments.some((m) => m.topicId === topicId) ||
        t.phase * 10000 + t.order * 100 < earliest ||
        p.priority === "advanced" ||
        [
          "ragas",
          "deepeval",
          "promptfoo",
          "cuda",
          "ray",
          "terraform",
          "prompt-engineering",
        ].includes(r.id)
      )
        continue;
      const plan = revisits[`${r.id}:${topicId}`];
      if (!plan)
        throw new Error(`Missing explicit revisit plan ${r.id}:${topicId}`);
      moments.push(
        moment(`${r.id}-reference-${topicId}`, p, topicId, {
          isPrimaryMoment: false,
          ...plan,
          nextTopicId: plan.nextTopicId || undefined,
          recommendedTiming: plan.startWhen,
        }),
      );
    }
    const v = verification.find((v) => v.id === r.id && v.url === r.url);
    return {
      ...r,
      contentType: ["ostep", "git"].includes(r.id)
        ? "book"
        : r.id === "builders"
          ? "articles"
          : ["privacy-india", "privacy-eu"].includes(r.id)
            ? "legal_reference"
            : r.type === "course"
              ? "course"
              : [
                    "python",
                    "postgres",
                    "fastapi",
                    "statistics",
                    "pytorch",
                    "linux",
                  ].includes(r.id)
                ? "tutorial"
                : "documentation",
      priority: p.priority as Priority,
      phases: [
        ...new Set([...r.phases, ...moments.map((m) => m.phaseNumber)]),
      ].sort((a, b) => a - b),
      relatedTopicIds: related,
      learningMoments: moments.sort(
        (a, b) => a.sequenceOrder - b.sequenceOrder,
      ),
      verificationStatus:
        v?.verificationStatus === "verified" ? "verified" : "needs_review",
      verifiedAt:
        v?.verificationStatus === "verified" && "verifiedAt" in v
          ? v.verifiedAt
          : undefined,
      verificationNotes:
        v?.verificationNotes ??
        "Not verified in this environment; review before use.",
      usageNotes: p.notes,
      supplementalUrls: supplemental[r.id] ?? [],
    };
  });
}
