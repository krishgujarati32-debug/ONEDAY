export type Lab = {
  id: string;
  group: string;
  title: string;
  explanation: string;
  why: string;
  concepts: string[];
  example: string;
  exercise: string;
  criteria: string[];
  minutes: number;
  resources: string[];
};

export const labs: Lab[] = [
  {
    id: "v2-http-contract",
    group: "0.3",
    title: "Read an HTTP exchange without a browser UI",
    explanation:
      "An HTTP request carries a method, a target and headers. Its response carries a status and may have a body. HTTP describes the exchange independently of whether the client is a CLI, a browser or another server.",
    why: "You can locate a failure at the network, authentication or application boundary before debugging the model.",
    concepts: [
      "request method",
      "response status",
      "Content-Type",
      "JSON serialization",
    ],
    example:
      "A GET for /models/unknown can return 404 with a JSON error. That response proves the server answered. A connection timeout gives the client no such HTTP response.",
    exercise:
      "Record two raw HTTP exchanges from an owned or local test endpoint. Label the request method, target and response status. Explain one case where decoding the body as JSON would fail.",
    criteria: [
      "The trace distinguishes transport failure from a valid HTTP error.",
      "The explanation uses the response Content-Type when deciding how to parse the body.",
    ],
    minutes: 30,
    resources: [],
  },
  {
    id: "v2-python-package",
    group: "1.5",
    title: "Package and test a Python CLI",
    explanation:
      "A package groups related modules. Package metadata describes how a build tool produces an installable artifact. Testing the installed artifact catches mistakes that running a module from the source directory can hide.",
    why: "A worker and its tests must run the same packaged code in development and deployment.",
    concepts: ["virtual environment", "distribution", "entry point", "pytest"],
    example:
      "A CLI reading JSON should return a nonzero exit code for invalid input. Test that behavior after installation into a clean environment so an undeclared dependency cannot pass unnoticed.",
    exercise:
      "Package a CLI that counts records in a JSON array. In a clean virtual environment install it, run it with valid and malformed fixtures, and record the command and exit codes.",
    criteria: [
      "The installed CLI reports the correct count for a valid fixture.",
      "Malformed input returns a nonzero exit code with a short error and no success output.",
    ],
    minutes: 60,
    resources: ["python", "pytest"],
  },
  {
    id: "v2-algorithm-measure",
    group: "2.8",
    title: "Measure the cost of finding a record",
    explanation:
      "A list scan can check every element when the record is absent. A hash lookup typically needs far fewer comparisons, but creating and storing the index adds work and memory.",
    why: "Batch ingestion often spends its time repeatedly checking whether records already exist.",
    concepts: ["worst-case cost", "index construction", "repeated lookup"],
    example:
      "A scan for a missing ID in 1,000 rows examines 1,000 items. For a single lookup, building a 1,000-key index first still requires reading those rows.",
    exercise:
      "Count comparisons for absent and last-position IDs at three input sizes. Then measure batches of 100 queries with and without a reusable Python set. Report index construction separately.",
    criteria: [
      "The scan counts grow with the number of records.",
      "The report separates lookup cost, index construction and memory trade-offs.",
    ],
    minutes: 40,
    resources: ["algorithms"],
  },
  {
    id: "v2-postgres-window",
    group: "3.2",
    title: "Rank events with a PostgreSQL window function",
    explanation:
      "A window function reads rows related to the current row without combining them into one result per group. A partition sets the group. The window ordering determines row positions within it.",
    why: "A usage ledger can identify the latest request per account while retaining each event's fields.",
    concepts: [
      "partition",
      "row_number",
      "tie-breaking",
      "common table expression",
    ],
    example:
      "For events at times 12:00 and 12:01 in one account, ROW_NUMBER ordered by time descending gives the 12:01 event position 1. Include an event ID to break equal timestamps.",
    exercise:
      "Create four sample events across two accounts with a timestamp tie. Use a CTE and ROW_NUMBER to return one latest event per account. Choose and explain a deterministic secondary key.",
    criteria: [
      "Each account appears exactly once.",
      "Equal timestamps produce a deterministic result across repeated runs.",
    ],
    minutes: 45,
    resources: ["postgres"],
  },
  {
    id: "v2-split-before-transform",
    group: "4.1",
    title: "Keep validation data out of fitted preprocessing",
    explanation:
      "Preprocessing can learn from a dataset, such as its median or category frequencies. Fitting those parameters before the split leaks information about rows that are meant to be unseen.",
    why: "A model can look accurate in development and lose that advantage after deployment.",
    concepts: ["fit", "transform", "holdout", "data leakage"],
    example:
      "The training values 2, 4 and 6 have median 4. Adding a held-out value of 100 changes the combined median to 5. A training-only imputer should use 4.",
    exercise:
      "Create a synthetic table with an extreme holdout value and one missing value. Compare the fill value obtained before and after a split. Record which code is allowed to read each partition.",
    criteria: [
      "The training fill value remains unchanged when the holdout changes.",
      "The experiment records where the split happens and why.",
    ],
    minutes: 40,
    resources: ["pandas"],
  },
  {
    id: "v2-ml-threshold",
    group: "4.5",
    title: "Choose a threshold with an explicit error cost",
    explanation:
      "A binary classifier can produce scores. A threshold turns those scores into decisions. Changing the threshold changes false positives and false negatives even though the model scores stay the same.",
    why: "A safety review queue and a silent background classifier can have different tolerances for mistakes.",
    concepts: [
      "false positive",
      "false negative",
      "threshold",
      "held-out data",
    ],
    example:
      "For scores 0.9, 0.6 and 0.4 with labels positive, negative and positive, threshold 0.5 gives one false positive and one false negative. Threshold 0.7 removes the false positive.",
    exercise:
      "Choose two candidate thresholds on a toy validation set. Give a missed positive three times the cost of a false alarm. Select the lower-cost threshold and evaluate it once on a separate test set.",
    criteria: [
      "The confusion counts and cost arithmetic agree.",
      "The test set did not determine the threshold.",
    ],
    minutes: 45,
    resources: ["sklearn"],
  },
  {
    id: "v2-pytorch-step",
    group: "5.2",
    title: "Verify one PyTorch training step",
    explanation:
      "A model's forward pass produces a prediction and loss. Backpropagation populates gradients, then the optimizer updates parameters. Training loops clear old gradients before computing a new step.",
    why: "A tiny training step can expose shape or gradient bugs before a long run.",
    concepts: ["tensor shape", "loss", "gradient", "optimizer"],
    example:
      "With input 2, weight 1, target 4 and squared error, the prediction is 2 and the weight gradient is -8. A learning rate of 0.1 increases the weight to 1.8.",
    exercise:
      "Reproduce that step on CPU with a scalar PyTorch parameter, then check the new prediction and loss. Add a test for the expected gradient within a small tolerance.",
    criteria: [
      "The gradient is near -8 and the updated weight near 1.8.",
      "The run records the input and output shape and clears gradients before any second step.",
    ],
    minutes: 50,
    resources: ["pytorch"],
  },
  {
    id: "v2-attention-trace",
    group: "6.3",
    title: "Trace masked attention for two tokens",
    explanation:
      "Attention assigns weights to values using a query and keys. A causal mask removes later positions before normalization, so a token cannot use a future token.",
    why: "Mask bugs can leak future information during training and distort evaluation.",
    concepts: ["query", "key", "value", "causal mask", "softmax"],
    example:
      "For two positions with equal scores, the second position can assign each value weight 1/2. The first position assigns its own value weight 1 and the future value weight 0.",
    exercise:
      "Write a two-by-two table of raw scores, then apply the causal mask and compute the weights. Change only the second value and show which output changes.",
    criteria: [
      "Each row of legal weights sums to one.",
      "Changing the later value leaves the first position's output unchanged.",
    ],
    minutes: 40,
    resources: ["huggingface"],
  },
  {
    id: "v2-sqlalchemy-alembic",
    group: "7.2",
    title:
      "Add a PostgreSQL-backed FastAPI endpoint with a reversible migration",
    explanation:
      "A Pydantic model checks request shape, SQLAlchemy executes relational work through a scoped session and Alembic versions schema changes. A successful response should follow a successful commit.",
    why: "An API can accept valid input and still fail at a database constraint or during a schema rollout.",
    concepts: [
      "Pydantic request model",
      "SQLAlchemy session",
      "Alembic revision",
      "commit",
    ],
    example:
      "A duplicate account-scoped name fails a database uniqueness constraint even if the request body passes validation. Translate the known conflict to a stable 409 response and roll back the session.",
    exercise:
      "On a disposable PostgreSQL database, create a revision for an account-scoped resource. Write a create endpoint and tests for valid input, invalid input, duplicates and an unauthorized account. Exercise upgrade and downgrade locally.",
    criteria: [
      "Each failure returns the intended response without exposing SQL or another account's data.",
      "A fresh database can be upgraded, and a local downgrade has documented effects.",
    ],
    minutes: 100,
    resources: ["fastapi", "postgres", "sqlalchemy", "alembic", "pydantic"],
  },
  {
    id: "v2-mcp-sdk",
    group: "8.8",
    title:
      "Exercise an official Python SDK MCP tool with an explicit permission boundary",
    explanation:
      "An MCP host owns the user session and policy. A client manages a protocol connection to a server. Tool discovery exposes schemas. Permission to discover a tool does not itself authorize an action.",
    why: "A model may suggest a call using untrusted document content. The host still needs to enforce ownership and approval.",
    concepts: [
      "host",
      "client",
      "server",
      "tool input schema",
      "local stdio transport",
    ],
    example:
      "A fixture lookup accepts a document ID and returns a quoted snippet. A separate write tool requires an exact, host-approved request. A string inside the snippet cannot grant approval.",
    exercise:
      "Using the official Python SDK documentation for the version you install, run a local stdio server with a fixture lookup. Connect a client, discover and call the tool, then send an unknown ID and a malformed input. Record the SDK version and transcripts.",
    criteria: [
      "Valid input returns the expected structured fixture, while malformed input is rejected.",
      "The host keeps credentials and permission state outside tool content and never uses input as a file path.",
    ],
    minutes: 75,
    resources: ["mcp-sdk", "mcp"],
  },
  {
    id: "v2-kafka-replay",
    group: "9.4",
    title: "Replay a Kafka event safely",
    explanation:
      "A consumer may see an event again after it finishes work but fails before saving its offset. Store a stable event ID with the durable result so a repeated delivery can be recognized.",
    why: "A retry must never double-charge a tenant or create duplicate ingestion records.",
    concepts: ["partition", "offset", "consumer group", "idempotency"],
    example:
      "An ingestion worker commits document D for event E, then crashes. On redelivery it finds E in a unique event table and acknowledges the event without inserting D again.",
    exercise:
      "On a local Kafka fixture, write a single consumer that saves an event ID and result in one database transaction. Inject a crash after commit before acknowledging the offset, restart, and inspect the stored records.",
    criteria: [
      "Replay yields one durable effect for the event ID.",
      "The runbook identifies which errors can retry and which move to a dead-letter workflow.",
    ],
    minutes: 85,
    resources: ["kafka", "postgres"],
  },
  {
    id: "v2-redis-atomic",
    group: "9.3",
    title: "Make a Redis token-bucket decision atomic",
    explanation:
      "A token bucket adds capacity over time up to a limit. Two requests can both spend the last token if they read and update separately. A Redis Lua script can make a small read-decide-write operation atomic on the server.",
    why: "An AI endpoint needs a shared limit across replicas to protect both usage budgets and capacity.",
    concepts: ["token bucket", "refill", "atomicity", "tenant key"],
    example:
      "If one token remains and two workers ask at the same time, the first allowed request leaves zero tokens. The second call must see zero and fail unless a refill has occurred.",
    exercise:
      "Write a bounded script for a disposable Redis instance and exercise concurrent requests against a one-token bucket. Use separate tenant keys and test expiry and refill explicitly.",
    criteria: [
      "At fixed time, exactly one request succeeds with one remaining token.",
      "A second tenant retains its own capacity, and expiry behavior is documented.",
    ],
    minutes: 70,
    resources: ["redis"],
  },
  {
    id: "v2-aws-boundary",
    group: "10.6",
    title: "Draw an AWS deployment with explicit access boundaries",
    explanation:
      "A VPC defines a network boundary. Security groups restrict traffic, and IAM roles govern calls to AWS APIs. Private data services can stay unreachable from public clients while the API accepts requests through a controlled entry point.",
    why: "A serving deployment has two separate questions: who can connect and what each component can do after it connects.",
    concepts: ["VPC", "security group", "IAM role", "S3", "managed PostgreSQL"],
    example:
      "An API role reads only a specific S3 prefix. The database accepts traffic only from the application security group. The user still needs an application permission check before a document is returned.",
    exercise:
      "Draw public and private boundaries for an API and worker. Write a permission and network flow matrix. Include a denied S3 access case, database restore path and an estimated cost envelope before deploying.",
    criteria: [
      "The database has no public route in the proposed design.",
      "Every service role has documented resource scope and a verification plan.",
    ],
    minutes: 55,
    resources: ["aws"],
  },
  {
    id: "v2-observability-trace",
    group: "10.8",
    title: "Trace a failed model request and count it safely",
    explanation:
      "A trace connects spans from one request. Metrics aggregate behavior across requests, while logs retain diagnostic events. A metric label for each individual request or account creates unbounded series.",
    why: "You need to locate provider failures without logging prompts or overwhelming monitoring storage.",
    concepts: [
      "trace ID",
      "counter",
      "histogram",
      "bounded labels",
      "redaction",
    ],
    example:
      "Count one provider timeout with labels provider and result. Put the request correlation ID in restricted logs and use an OpenTelemetry span to locate the failed provider call.",
    exercise:
      "On a local stub, produce one successful call and one timeout. Export a duration histogram and bounded counters to Prometheus. In Grafana plot error rate and use a trace to locate the failing boundary.",
    criteria: [
      "Metrics show both requests and one error.",
      "Logs and trace attributes contain neither credentials nor raw input.",
    ],
    minutes: 80,
    resources: ["otel", "prometheus", "grafana"],
  },
  {
    id: "v2-locust-capacity",
    group: "9.8",
    title: "Measure an AI API workload with Locust",
    explanation:
      "One million requests per day average about 11.6 requests per second. Bursts, input length, caching and provider limits can make peak resource use much higher. A load test measures a stated workload in a stated environment.",
    why: "The deployment cannot substantiate capacity without a workload, a latency objective and recorded errors.",
    concepts: [
      "request mix",
      "warm-up",
      "p95",
      "error budget",
      "mock provider",
    ],
    example:
      "A test with 70% cache hits tells you little about a workload that calls the provider on every request. Report both conditions or label which one you measured.",
    exercise:
      "Run Locust only against an owned local service with a synthetic model adapter. Record the request mix, concurrency and response times at two load levels. Then inject provider throttling and measure how the API degrades.",
    criteria: [
      "The report includes duration, actual request rate, p95, errors, environment and adapter type.",
      "Any capacity claim is limited to the measured workload.",
    ],
    minutes: 75,
    resources: ["locust"],
  },
  {
    id: "v2-vllm-benchmark",
    group: "11.3",
    title: "Benchmark prefill and decoding under a controlled load",
    explanation:
      "Prefill processes input tokens and builds cached attention state. Decode produces output tokens iteratively. Time to first token and time per subsequent token help distinguish these stages.",
    why: "A single average latency cannot show whether long prompts, memory pressure or output length drives cost.",
    concepts: ["prefill", "decode", "KV cache", "TTFT", "inter-token latency"],
    example:
      "Compare 32-token and 512-token prompts while requesting the same output length. Report first-token time separately so differences in prompt processing are visible.",
    exercise:
      "On suitable owned GPU hardware, run a vLLM endpoint and capture two prompt lengths at the same concurrency. If hardware is unavailable, prepare a reproducible benchmark plan with no measured claims and report that execution is pending.",
    criteria: [
      "A measured run lists model, version, hardware, prompt and output lengths, concurrency and failure counts.",
      "The report distinguishes time to first token from decode throughput and marks unexecuted cases.",
    ],
    minutes: 90,
    resources: ["vllm", "cuda"],
  },
  {
    id: "v2-ccai-evidence",
    group: "v2-portfolio",
    title: "Prove CCAI routing, isolation and recovery",
    explanation:
      "A deterministic router chooses a provider from task capability, budget and health inputs. The selected adapter executes within a deadline. An audit record preserves the reason for the decision without copying private content.",
    why: "A platform needs evidence that routing improves a measurable goal and that recovery preserves tenant boundaries.",
    concepts: [
      "policy-based router",
      "tenant boundary",
      "fallback budget",
      "failure injection",
    ],
    example:
      "For an extraction request, exclude models without structured output. Try the eligible primary adapter. If it times out, permit one policy-approved fallback inside the remaining deadline and record both attempts.",
    exercise:
      "Use two deterministic fake providers to exercise a normal path, a timeout and cross-tenant retrieval denial. Include a Kafka replay, Redis limit and rollback drill in the acceptance report. Then measure one owned workload with Locust.",
    criteria: [
      "The API trace names each attempted adapter and the routing reason.",
      "The report includes isolation, duplicate replay, rollback and measured capacity with its environment.",
    ],
    minutes: 120,
    resources: [],
  },
];
