# Resource-learning upgrade: pre-change audit

Repository status: clean. Baseline: 42 resources, 82 topics, 1291 lessons, 48 technologies and 7 projects.

## Current schema

`Resource = { id, title, provider, category, description, url, type, free, phases }`. There is no existing resource priority field. Topic relationships are stored separately in topicResources and topic.resources. Cards show only a provider, title, description, type/free label and bookmark. All resources lack explicit timing, prerequisites, selected reading sections, objectives, exercises, completion criteria and next-step guidance.

## Every existing resource

| ID                 | Title                                  | Current URL                                                             | Phase tags | Actual topic IDs                                                  | Classification          | Required upgrade                                                   |
| ------------------ | -------------------------------------- | ----------------------------------------------------------------------- | ---------- | ----------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------ |
| cs50               | CS50: Introduction to Computer Science | https://cs50.harvard.edu/x/                                             | 00, 01     | 0.1, 1.1                                                          | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| ostep              | Operating Systems: Three Easy Pieces   | https://pages.cs.wisc.edu/~remzi/OSTEP/                                 | 00, 09     | 0.2, 9.5, 9.6                                                     | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| algorithms         | MIT Introduction to Algorithms         | https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/ | 02         | 2.2, 2.8                                                          | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| maths              | Khan Academy Mathematics               | https://www.khanacademy.org/math                                        | 02         | 2.1, 2.2, 2.4, 2.6                                                | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| information-theory | MIT Information Theory                 | https://ocw.mit.edu/courses/6-441-information-theory-spring-2010/       | 02         | 2.7                                                               | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| builders           | The Amazon Builders Library            | https://aws.amazon.com/builders-library/                                | 09, 11     | 7.6, 9.1, 9.3, 9.4, 9.5, 9.6, 9.7, 11.1, 11.2, 11.4, 11.5         | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| vllm               | vLLM Documentation                     | https://docs.vllm.ai/en/latest/                                         | 11         | 9.7, 11.3                                                         | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| owasp-web          | OWASP Top 10                           | https://owasp.org/www-project-top-ten/                                  | 10         | 10.1                                                              | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| pytest             | Pytest Documentation                   | https://docs.pytest.org/en/stable/                                      | 01, 10     | 1.5, 3.1, 10.3                                                    | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| mongodb            | MongoDB Introduction                   | https://www.mongodb.com/docs/manual/introduction/                       | 03         | 3.3                                                               | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| go                 | Go Documentation                       | https://go.dev/doc/                                                     | 01         | 1.7-go                                                            | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| java               | Learn Java                             | https://dev.java/learn/                                                 | 01         | 1.7-java                                                          | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| cpp                | C++ Documentation                      | https://learn.microsoft.com/en-us/cpp/cpp/?view=msvc-170                | 01         | 1.7-cpp                                                           | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| privacy-india      | Ministry of Electronics and IT         | https://www.meity.gov.in/                                               | 10         | 10.10                                                             | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| privacy-eu         | Data Protection                        | https://commission.europa.eu/law/law-topic/data-protection_en           | 10         | 10.10                                                             | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| python             | The Python Tutorial                    | https://docs.python.org/3/tutorial/                                     | 01         | 1.1, 1.2, 1.3, 1.4, 1.5                                           | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| git                | Pro Git                                | https://git-scm.com/book/en/v2                                          | 00, 03     | 0.5, 3.1, 10.7                                                    | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| web                | MDN Web Development                    | https://developer.mozilla.org/en-US/docs/Learn_web_development          | 00, 01, 07 | 0.3, 1.6-javascript, 7.1                                          | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| typescript         | TypeScript Handbook                    | https://www.typescriptlang.org/docs/                                    | 01         | 1.6-javascript                                                    | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| postgres           | PostgreSQL Tutorial                    | https://www.postgresql.org/docs/current/tutorial.html                   | 01, 03, 07 | 1.6-sql, 3.2, 3.3, 3.5, 7.3                                       | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| numpy              | NumPy User Guide                       | https://numpy.org/doc/stable/user/                                      | 02, 04     | 2.5, 2.6, 4.1                                                     | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| pandas             | Getting Started with Pandas            | https://pandas.pydata.org/docs/getting_started/                         | 03, 04     | 3.4, 4.1                                                          | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| sklearn            | Scikit-learn User Guide                | https://scikit-learn.org/stable/user_guide.html                         | 04         | 4.2, 4.3, 4.4, 4.5, 4.6                                           | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| pytorch            | Learn PyTorch                          | https://pytorch.org/tutorials/                                          | 05         | 5.1, 5.2, 5.3, 5.4, 6.3                                           | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| huggingface        | The Hugging Face LLM Course            | https://huggingface.co/learn/llm-course/chapter1/1                      | 06, 07     | 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 7.4, 7.5, 8.1, 8.3, 8.4, 11.2, 11.3 | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| fastapi            | FastAPI Tutorial                       | https://fastapi.tiangolo.com/tutorial/                                  | 07         | 7.1, 7.2, 7.3, 7.4, 7.6                                           | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| redis              | Redis Documentation                    | https://redis.io/docs/latest/                                           | 09         | 9.2, 9.3                                                          | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| docker             | Get Started with Docker                | https://docs.docker.com/get-started/                                    | 10         | 10.5, 10.7                                                        | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| kubernetes         | Kubernetes Tutorials                   | https://kubernetes.io/docs/tutorials/                                   | 10         | 10.7                                                              | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| mlflow             | MLflow Documentation                   | https://mlflow.org/docs/latest/                                         | 10         | 10.4, 10.9                                                        | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| otel               | OpenTelemetry Documentation            | https://opentelemetry.io/docs/                                          | 09, 10, 11 | 10.8, 11.1                                                        | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| neo4j              | Get Started with Neo4j                 | https://neo4j.com/docs/getting-started/                                 | 08         | 8.5, 8.6                                                          | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| langgraph          | LangGraph Overview                     | https://docs.langchain.com/oss/python/langgraph/overview                | 08         | 8.7, 8.8                                                          | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| mcp                | Introduction to MCP                    | https://modelcontextprotocol.io/docs/getting-started/intro              | 08         | 8.7, 8.8                                                          | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| owasp              | OWASP Gen AI Security Project          | https://genai.owasp.org/                                                | 10         | 10.2, 10.10                                                       | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| aws                | AWS Documentation                      | https://docs.aws.amazon.com/                                            | 10         | 10.6                                                              | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| ml-course          | Machine Learning Crash Course          | https://developers.google.com/machine-learning/crash-course             | 02, 04     | 4.2, 5.1                                                          | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| linear-algebra     | MIT Linear Algebra                     | https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/           | 02         | 2.5                                                               | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| statistics         | SciPy Statistics Tutorial              | https://docs.scipy.org/doc/scipy/tutorial/stats.html                    | 02         | 2.3, 2.4                                                          | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| k6                 | Grafana k6 Documentation               | https://grafana.com/docs/k6/latest/                                     | 09         | 9.8                                                               | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| pgvector           | pgvector Documentation                 | https://github.com/pgvector/pgvector                                    | 03, 08     | 3.5, 8.1, 8.2, 8.3, 8.4                                           | Not defined on resource | Add verified learning moments; preserve identity and relationships |
| linux              | Windows Subsystem for Linux            | https://learn.microsoft.com/en-us/windows/wsl/                          | 00         | 0.4, 1.6-bash                                                     | Not defined on resource | Add verified learning moments; preserve identity and relationships |

## Current phase and topic identities

### Phase 00 — Computer Science Foundations

- 0.1 — Computer Fundamentals (core)
- 0.2 — Operating Systems (core)
- 0.3 — Computer Networking (core)
- 0.4 — Command Line and Linux (core)
- 0.5 — Git and GitHub (core)

### Phase 01 — Python & Programming

- 1.1 — Python Setup and Fundamentals (core)
- 1.2 — Functions and Modular Programming (core)
- 1.3 — Object-Oriented Programming (core)
- 1.4 — Advanced Python (core)
- 1.5 — Python Professional Development (core)
- 1.6-javascript — JavaScript and TypeScript (core)
- 1.6-sql — SQL (core)
- 1.6-bash — Bash (core)
- 1.7-java — Java — Optional Backend Path (optional)
- 1.7-go — Go — Optional Infrastructure Path (optional)
- 1.7-cpp — C++ — Optional Systems Path (optional)

### Phase 02 — Mathematics & Problem Solving

- 2.1 — Basic Mathematics (core)
- 2.2 — Discrete Mathematics and Logic (core)
- 2.3 — Statistics (core)
- 2.4 — Probability (core)
- 2.5 — Linear Algebra (core)
- 2.6 — Calculus and Optimization (core)
- 2.7 — Information Theory Basics (core)
- 2.8 — Data Structures and Algorithms (core)

### Phase 03 — Software, Data & Databases

- 3.1 — Software Engineering Fundamentals (core)
- 3.2 — Database Engineering with PostgreSQL (core)
- 3.3 — NoSQL Fundamentals (core)
- 3.4 — Data Engineering Fundamentals (core)
- 3.5 — Data Modeling and Storage for AI (core)

### Phase 04 — Data Science & Machine Learning

- 4.1 — Data Science Fundamentals (core)
- 4.2 — Machine Learning Fundamentals (core)
- 4.3 — Supervised Learning Algorithms (core)
- 4.4 — Unsupervised Learning (core)
- 4.5 — Model Evaluation (core)
- 4.6 — Model Training and Improvement (core)

### Phase 05 — Deep Learning & PyTorch

- 5.1 — Deep Learning Fundamentals (core)
- 5.2 — PyTorch (core)
- 5.3 — Deep Learning Architectures (core)
- 5.4 — GPU and Model Training Fundamentals (core)

### Phase 06 — NLP, Transformers & LLMs

- 6.1 — Natural Language Processing (core)
- 6.2 — Language Model Fundamentals (core)
- 6.3 — Transformer Architecture (core)
- 6.4 — LLM Internals (core)
- 6.5 — LLM Training and Adaptation (advanced)
- 6.6 — Hugging Face Ecosystem (core)

### Phase 07 — Backend & AI Engineering

- 7.1 — API Engineering (core)
- 7.2 — FastAPI (core)
- 7.3 — Backend Architecture (core)
- 7.4 — AI Provider Integration (core)
- 7.5 — Token and Cost Engineering (core)
- 7.6 — AI Backend Reliability (core)

### Phase 08 — RAG, Agents & Knowledge

- 8.1 — Embeddings and Vector Search (core)
- 8.2 — Vector Databases (core)
- 8.3 — Traditional RAG (core)
- 8.4 — Advanced RAG (advanced)
- 8.5 — Graph Theory and Knowledge Graphs (core)
- 8.6 — Graph RAG (advanced)
- 8.7 — AI Agents (core)
- 8.8 — AI Frameworks and Protocols (core)

### Phase 09 — System Design & Scalability

- 9.1 — System Design Fundamentals (core)
- 9.2 — Caching and Redis (core)
- 9.3 — Rate Limiting (core)
- 9.4 — Queues and Background Processing (core)
- 9.5 — Distributed Systems (core)
- 9.6 — Concurrency and Performance (core)
- 9.7 — Scalable AI Systems (core)
- 9.8 — Load and Stress Testing (core)

### Phase 10 — Production, Security & MLOps

- 10.1 — Application Security (core)
- 10.2 — AI and LLM Security (core)
- 10.3 — Software and API Testing (core)
- 10.4 — AI and LLM Evaluation (core)
- 10.5 — Docker and Containers (core)
- 10.6 — Cloud Computing (core)
- 10.7 — DevOps and CI/CD (core)
- 10.8 — Logging, Monitoring, and Observability (core)
- 10.9 — MLOps (core)
- 10.10 — Privacy, Governance, and Responsible AI (core)

### Phase 11 — Advanced AI Architecture

- 11.1 — AI System Architecture (advanced)
- 11.2 — Intelligent Model Routing (advanced)
- 11.3 — Model Serving and Inference Optimization (advanced)
- 11.4 — High Availability and Reliability (advanced)
- 11.5 — Architecture Trade-offs (advanced)

## Technology classifications

| ID                        | Technology                | Priority |
| ------------------------- | ------------------------- | -------- |
| python                    | Python                    | core     |
| sql                       | SQL                       | core     |
| javascript-typescript     | JavaScript / TypeScript   | core     |
| bash                      | Bash                      | core     |
| java                      | Java                      | optional |
| go                        | Go                        | optional |
| c-                        | C++                       | optional |
| react                     | React                     | core     |
| next-js                   | Next.js                   | core     |
| tailwind-css              | Tailwind CSS              | core     |
| fastapi                   | FastAPI                   | core     |
| pydantic                  | Pydantic                  | core     |
| numpy                     | NumPy                     | core     |
| pandas                    | Pandas                    | core     |
| matplotlib-seaborn        | Matplotlib / Seaborn      | core     |
| jupyter                   | Jupyter                   | core     |
| scikit-learn              | Scikit-learn              | core     |
| pytorch                   | PyTorch                   | core     |
| hugging-face-transformers | Hugging Face Transformers | core     |
| langchain                 | LangChain                 | optional |
| langgraph                 | LangGraph                 | optional |
| llamaindex                | LlamaIndex                | optional |
| mcp                       | MCP                       | core     |
| postgresql                | PostgreSQL                | core     |
| mongodb                   | MongoDB                   | optional |
| neo4j                     | Neo4j                     | optional |
| pgvector                  | pgvector                  | core     |
| qdrant                    | Qdrant                    | optional |
| weaviate                  | Weaviate                  | optional |
| redis                     | Redis                     | core     |
| celery                    | Celery                    | core     |
| rabbitmq                  | RabbitMQ                  | optional |
| kafka                     | Kafka                     | optional |
| aws                       | AWS                       | core     |
| google-cloud              | Google Cloud              | optional |
| azure                     | Azure                     | optional |
| docker                    | Docker                    | core     |
| github-actions            | GitHub Actions            | core     |
| terraform                 | Terraform                 | optional |
| kubernetes                | Kubernetes                | advanced |
| opentelemetry             | OpenTelemetry             | core     |
| prometheus-grafana        | Prometheus / Grafana      | core     |
| mlflow                    | MLflow                    | core     |
| pytest                    | Pytest                    | core     |
| k6                        | k6                        | core     |
| git-github                | Git / GitHub              | core     |
| apache-spark              | Apache Spark              | advanced |
| vllm-tgi-triton           | vLLM / TGI / Triton       | advanced |

## Findings and intended changes

- GitHub Actions and Celery are core; Terraform is optional; Kubernetes and vLLM/TGI/Triton are advanced. Preserve every existing classification.
- MLflow currently appears only in Phase 10; add its first experiment-tracking moment in Phase 04 without duplicating its record.
- The Builders Library supports AI Backend Reliability in Phase 07, not Phase 10; Observability is 10.8. Use actual topic IDs.
- Go/Java/C++ topic links exist in actual generated topics even though they are absent from topicResources. Retain all three optional language topics.
- vLLM is currently related to Scalable AI Systems in Phase 09; retain that relationship as a return-later reference rather than an early prerequisite.
- Prompt/context coverage includes context windows and tool output but not systematic instruction hierarchy, few-shot design, prompt versioning or regression testing. Add one 22-lesson topic with new IDs after 6.4, preserving relative order and identity of all old topics.
- Add nine catalog entries only: Ragas, DeepEval, Promptfoo, CUDA, Ray, Terraform, GitHub Actions, Celery and OpenAI prompt engineering. Existing technology entries are reused.
- Preserve project requirement arrays and their indexed checklist IDs. Add milestone/extension guidance and catalog-derived resource connections only.
- Omit optional resource study-status persistence in this release: it would unnecessarily change the coupled authenticated snapshot/RPC contract. Resource bookmarks already support returning later. No database migration is required.
