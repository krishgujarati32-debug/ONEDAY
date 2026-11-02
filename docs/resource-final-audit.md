# Strict final resource-learning audit — ONEDAY

Audited November 3, 2026. This report covers every original and added resource and every learning moment, not only populated fields. Source scope, prerequisites, practical activities and project fit were reviewed against the local curriculum. No redesign, new application, deployment, database migration or user-data write was performed.

**Result:** 51 canonical resources (42 original + 9 added), 130 learning moments. All twelve requested placement/content/preservation/classification checks pass after corrections. 1 resource still has an explicitly unverified content source; its URL is reachable, but its legal documents could not be inspected. That exception is not presented as verified.

## Corrections made by this audit

- Replaced all 59 automatically generated contextual revisits with authored source-specific prerequisites, sections, reasons, objectives, activities, completion criteria, next steps and project links. 33 resource plans changed; the resource-by-resource evidence below identifies each affected moment.
- Python revisits now point to functions/modules, classes, exceptions/generators and environments at their matching topics. The official tutorial is explicitly a companion after the roadmap beginner examples, not a complete introduction for a first-time programmer. Async/typing use two selected official library links.
- OSTEP starts with ordinary processes before Python is learned and later names its distributed-systems and concurrency chapters. Mathematics revisits name probability/counting/calculus sections; descriptive statistics no longer requires inference before Probability.
- Pro Git supports source/release identity and GitHub Actions supports CI configuration. WSL is identified as an environment reference rather than a Bash-language manual. AWS names actual service-guide areas instead of an unspecified compute/storage catalog.
- Scikit-learn, PyTorch and Hugging Face revisits now target their actual subject areas. Hugging Face course activities distinguish local model/tokenizer use from commercial provider adapters, billing and serving-engine configuration.
- Redis caching and its completion criteria stay at topic 9.2; the concurrent limiter is deferred to the separate 9.3 visit. PostgreSQL links directly to Indexes and Using EXPLAIN, and the semantic-search course example is linked from Hugging Face.
- MLflow 4.6 is scoped to Project 02 experiment tracking. MLflow 10.4 now uses the LLMs & Agents tracing/evaluation material and Projects 04/06, rather than a traditional registry list and unrelated project links. Registry/lifecycle remains at 10.9. Ragas first exposure targets Project 04 after the baseline; its later evaluation connections remain.
- Promptfoo revisits have their own testing/evaluation/CI prerequisites, purpose, objectives and finish conditions. DeepEval is an alternative first evaluator, not a requirement to learn Ragas first. Ray includes inference prerequisites; Terraform includes networking and explicit safe lifecycle reading.
- Exact advanced visits now receive advanced labels even when the source is a core general reference. Current optional references are distinct from deferred reading. Go/C++ still defer when their prerequisites are ahead; a related topic chooses the earliest useful future visit instead of jumping directly to the primary deep dive.
- The all-learning-moments link opens a fresh library tab so an active phase/timing filter cannot leave its canonical resource anchor absent. Existing card layout and styling were retained.
- The immutable pre-upgrade baseline remains unchanged. All 51 resource IDs/URLs/priorities and all 130 moment IDs were also compared with the start-of-final-audit snapshot and retained. No existing classification was changed.

## The twelve checks

1. **C1:** Correct phase number and phase/topic agreement.
2. **C2:** Correct existing topic, prerequisite, next-topic and lesson references.
3. **C3:** Explicit when-to-open guidance for every visit.
4. **C4:** Prerequisite topics/concepts or an explicit no-prerequisite starting point.
5. **C5:** Selected documentation sections for every visit.
6. **C6:** Reason for studying the source at that point.
7. **C7:** Source-appropriate practical activity.
8. **C8:** Observable completion criteria.
9. **C9:** Existing project connection with reviewed source/task scope.
10. **C10:** One stable resource record/bookmark with distinct learning moments.
11. **C11:** Existing IDs and progress/checklist compatibility.
12. **C12:** Consistent resource/tool/topic and advanced-visit classifications.

C1/C2 also have actual HTTP/HTML target evidence. C3–C9 combine structural validation with source/task-scope review; a nonempty field alone was insufficient. C10 is checked by grouping tests and one canonical HTML anchor per resource. C11 uses the immutable baseline plus a version 1 export containing every old lesson, note/bookmark targets and project checklist positions. Actual private user records were not inspected or rewritten. C12 compares every matching technology, including aliases, and preserves every old topic/lesson/technology priority.

## Resource-by-resource matrix

Every row is a distinct canonical resource. A pass applies to all of that resource’s learning moments. URL reachability and source-content review are reported separately.

| Resource / stable ID                                                                                                        | Existing or added | Primary placement                                      | Priority | Moments | C1–C12                                                                                                                    | Content verification                  |
| --------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------ | -------- | ------: | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| [CS50: Introduction to Computer Science](https://cs50.harvard.edu/x/) · `cs50`                                              | Existing          | 00 · Computer Fundamentals (`0.1`)                     | OPTIONAL |       2 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Operating Systems: Three Easy Pieces](https://pages.cs.wisc.edu/~remzi/OSTEP/) · `ostep`                                   | Existing          | 00 · Operating Systems (`0.2`)                         | CORE     |       3 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [MIT Introduction to Algorithms](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/) · `algorithms`    | Existing          | 02 · Data Structures and Algorithms (`2.8`)            | CORE     |       1 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Khan Academy Mathematics](https://www.khanacademy.org/math) · `maths`                                                      | Existing          | 02 · Basic Mathematics (`2.1`)                         | CORE     |       4 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [MIT Information Theory](https://ocw.mit.edu/courses/6-441-information-theory-spring-2010/) · `information-theory`          | Existing          | 02 · Information Theory Basics (`2.7`)                 | CORE     |       2 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [The Amazon Builders Library](https://aws.amazon.com/builders-library/) · `builders`                                        | Existing          | 09 · System Design Fundamentals (`9.1`)                | CORE     |      10 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [vLLM Documentation](https://docs.vllm.ai/en/latest/) · `vllm`                                                              | Existing          | 11 · Model Serving and Inference Optimization (`11.3`) | ADVANCED |       1 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [OWASP Top 10](https://owasp.org/www-project-top-ten/) · `owasp-web`                                                        | Existing          | 10 · Application Security (`10.1`)                     | CORE     |       1 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Pytest Documentation](https://docs.pytest.org/en/stable/) · `pytest`                                                       | Existing          | 01 · Python Professional Development (`1.5`)           | CORE     |       4 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [MongoDB Introduction](https://www.mongodb.com/docs/manual/introduction/) · `mongodb`                                       | Existing          | 03 · NoSQL Fundamentals (`3.3`)                        | OPTIONAL |       1 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Go Documentation](https://go.dev/doc/) · `go`                                                                              | Existing          | 01 · Go — Optional Infrastructure Path (`1.7-go`)      | OPTIONAL |       1 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Learn Java](https://dev.java/learn/) · `java`                                                                              | Existing          | 01 · Java — Optional Backend Path (`1.7-java`)         | OPTIONAL |       1 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [C++ Documentation](https://learn.microsoft.com/en-us/cpp/cpp/?view=msvc-170) · `cpp`                                       | Existing          | 01 · C++ — Optional Systems Path (`1.7-cpp`)           | OPTIONAL |       1 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Ministry of Electronics and IT](https://www.meity.gov.in/) · `privacy-india`                                               | Existing          | 10 · Privacy, Governance, and Responsible AI (`10.10`) | OPTIONAL |       1 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | NEEDS REVIEW: official portal content |
| [Data Protection](https://commission.europa.eu/law/law-topic/data-protection_en) · `privacy-eu`                             | Existing          | 10 · Privacy, Governance, and Responsible AI (`10.10`) | OPTIONAL |       1 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [The Python Tutorial](https://docs.python.org/3/tutorial/) · `python`                                                       | Existing          | 01 · Python Setup and Fundamentals (`1.1`)             | CORE     |       5 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Pro Git](https://git-scm.com/book/en/v2) · `git`                                                                           | Existing          | 00 · Git and GitHub (`0.5`)                            | CORE     |       3 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [MDN Web Development](https://developer.mozilla.org/en-US/docs/Learn_web_development) · `web`                               | Existing          | 00 · Computer Networking (`0.3`)                       | CORE     |       3 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [TypeScript Handbook](https://www.typescriptlang.org/docs/) · `typescript`                                                  | Existing          | 01 · JavaScript and TypeScript (`1.6-javascript`)      | CORE     |       1 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html) · `postgres`                                   | Existing          | 03 · Database Engineering with PostgreSQL (`3.2`)      | CORE     |       5 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [NumPy User Guide](https://numpy.org/doc/stable/user/) · `numpy`                                                            | Existing          | 04 · Data Science Fundamentals (`4.1`)                 | CORE     |       3 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Getting Started with Pandas](https://pandas.pydata.org/docs/getting_started/) · `pandas`                                   | Existing          | 04 · Data Science Fundamentals (`4.1`)                 | CORE     |       2 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Scikit-learn User Guide](https://scikit-learn.org/stable/user_guide.html) · `sklearn`                                      | Existing          | 04 · Machine Learning Fundamentals (`4.2`)             | CORE     |       5 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Learn PyTorch](https://pytorch.org/tutorials/) · `pytorch`                                                                 | Existing          | 05 · PyTorch (`5.2`)                                   | CORE     |       4 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [The Hugging Face LLM Course](https://huggingface.co/learn/llm-course/chapter1/1) · `huggingface`                           | Existing          | 06 · Hugging Face Ecosystem (`6.6`)                    | CORE     |      12 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/) · `fastapi`                                                      | Existing          | 07 · FastAPI (`7.2`)                                   | CORE     |       4 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Redis Documentation](https://redis.io/docs/latest/) · `redis`                                                              | Existing          | 09 · Caching and Redis (`9.2`)                         | CORE     |       2 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Get Started with Docker](https://docs.docker.com/get-started/) · `docker`                                                  | Existing          | 10 · Docker and Containers (`10.5`)                    | CORE     |       2 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Kubernetes Tutorials](https://kubernetes.io/docs/tutorials/) · `kubernetes`                                                | Existing          | 10 · DevOps and CI/CD (`10.7`)                         | ADVANCED |       1 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [MLflow Documentation](https://mlflow.org/docs/latest/) · `mlflow`                                                          | Existing          | 10 · MLOps (`10.9`)                                    | CORE     |       3 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [OpenTelemetry Documentation](https://opentelemetry.io/docs/) · `otel`                                                      | Existing          | 10 · Logging, Monitoring, and Observability (`10.8`)   | CORE     |       3 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Get Started with Neo4j](https://neo4j.com/docs/getting-started/) · `neo4j`                                                 | Existing          | 08 · Graph Theory and Knowledge Graphs (`8.5`)         | OPTIONAL |       2 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [LangGraph Overview](https://docs.langchain.com/oss/python/langgraph/overview) · `langgraph`                                | Existing          | 08 · AI Frameworks and Protocols (`8.8`)               | OPTIONAL |       1 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Introduction to MCP](https://modelcontextprotocol.io/docs/getting-started/intro) · `mcp`                                   | Existing          | 08 · AI Frameworks and Protocols (`8.8`)               | CORE     |       1 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [OWASP Gen AI Security Project](https://genai.owasp.org/) · `owasp`                                                         | Existing          | 10 · AI and LLM Security (`10.2`)                      | CORE     |       2 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [AWS Documentation](https://docs.aws.amazon.com/) · `aws`                                                                   | Existing          | 10 · Cloud Computing (`10.6`)                          | CORE     |       1 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course) · `ml-course`                  | Existing          | 04 · Machine Learning Fundamentals (`4.2`)             | CORE     |       3 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [MIT Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/) · `linear-algebra`                      | Existing          | 02 · Linear Algebra (`2.5`)                            | CORE     |       1 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [SciPy Statistics Tutorial](https://docs.scipy.org/doc/scipy/tutorial/stats.html) · `statistics`                            | Existing          | 02 · Statistics (`2.3`)                                | CORE     |       2 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Grafana k6 Documentation](https://grafana.com/docs/k6/latest/) · `k6`                                                      | Existing          | 09 · Load and Stress Testing (`9.8`)                   | CORE     |       1 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [pgvector Documentation](https://github.com/pgvector/pgvector) · `pgvector`                                                 | Existing          | 08 · Vector Databases (`8.2`)                          | CORE     |       5 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/) · `linux`                                     | Existing          | 00 · Command Line and Linux (`0.4`)                    | CORE     |       2 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Ragas Documentation](https://docs.ragas.io/en/latest/) · `ragas`                                                           | Added             | 10 · AI and LLM Evaluation (`10.4`)                    | OPTIONAL |       2 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [DeepEval Documentation](https://deepeval.com/docs/introduction) · `deepeval`                                               | Added             | 10 · AI and LLM Evaluation (`10.4`)                    | OPTIONAL |       1 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Promptfoo Documentation](https://www.promptfoo.dev/docs/getting-started/) · `promptfoo`                                    | Added             | 10 · AI and LLM Security (`10.2`)                      | OPTIONAL |       4 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [NVIDIA CUDA Programming Guide](https://docs.nvidia.com/cuda/cuda-programming-guide/) · `cuda`                              | Added             | 05 · GPU and Model Training Fundamentals (`5.4`)       | OPTIONAL |       2 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Ray Documentation](https://docs.ray.io/en/latest/) · `ray`                                                                 | Added             | 11 · Model Serving and Inference Optimization (`11.3`) | ADVANCED |       2 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Terraform Documentation](https://developer.hashicorp.com/terraform/docs) · `terraform`                                     | Added             | 10 · DevOps and CI/CD (`10.7`)                         | OPTIONAL |       1 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [GitHub Actions Documentation](https://docs.github.com/en/actions/get-started/understand-github-actions) · `github-actions` | Added             | 10 · DevOps and CI/CD (`10.7`)                         | CORE     |       1 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [Celery Documentation](https://docs.celeryq.dev/en/stable/) · `celery`                                                      | Added             | 09 · Queues and Background Processing (`9.4`)          | CORE     |       1 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |
| [OpenAI Prompt Engineering Guide](https://developers.openai.com/api/docs/guides/prompt-engineering) · `prompt-engineering`  | Added             | 06 · Prompt Engineering and Context Design (`6.7`)     | OPTIONAL |       3 | C1: PASS; C2: PASS; C3: PASS; C4: PASS; C5: PASS; C6: PASS; C7: PASS; C8: PASS; C9: PASS; C10: PASS; C11: PASS; C12: PASS | Verified source; URL reachable        |

## Per-resource evidence and corrections

Each visit below contains the actual timing, prerequisites, selected sections, reason, practical work, finish criteria and project connection. All topic/project links point to the audited local build. The checked-in catalog remains the runtime source of truth.

### 01. CS50: Introduction to Computer Science

Stable ID: `cs50`. Original resource retained. Priority: **OPTIONAL**. [Official source](https://cs50.harvard.edu/x/). **C1–C12: PASS.** One resource/bookmark key `resource:cs50`; 2 distinct visit(s).

Corrections to learning moments: `cs50-reference-1.1` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### cs50-primary — primary placement

- **Phase/topic:** 00 — Computer Science Foundations; [Computer Fundamentals (0.1)](http://localhost:3003/learn/computer-fundamentals). Stage: START HERE.
- **Open when:** Start after the Phase 00 introduction, while studying Computer Fundamentals. Use the introductory computer-systems and problem-solving material only.
- **Prerequisites:** No prior topic required; use the current topic introduction.
- **Read in order:** Computer representation → Binary and bytes → Algorithms and problem solving → How source becomes execution.
- **Learn:** Explain the difference between a program and a running process Trace a small computation
- **Why here:** These ideas give names to the hardware and execution behavior you will inspect in the next OS topic.
- **Practical activity:** Draw the path from source code to a running program, then solve one small algorithmic exercise.
- **Finished when:** Identify CPU, RAM and storage roles correctly Explain one solution and verify its result
- **Project connection:** [Python Student Management System](http://localhost:3003/projects/python-student-management-system).
- **Next:** After the exercise, continue to Operating Systems. Use the linked project milestone to connect these skills. [Operating Systems (0.2)](http://localhost:3003/learn/operating-systems)

#### cs50-reference-1.1

- **Phase/topic:** 01 — Python & Programming; [Python Setup and Fundamentals (1.1)](http://localhost:3003/learn/python-setup-and-fundamentals). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Revisit only CS50's Python material during Python Setup and Fundamentals in Phase 01, after the topic's first syntax lessons.
- **Prerequisites:** [Computer Fundamentals (0.1)](http://localhost:3003/learn/computer-fundamentals); [Command Line and Linux (0.4)](http://localhost:3003/learn/command-line-and-linux)
- **Read in order:** Week 6 Python: variables and types → Conditionals and loops → Lists and dictionaries → Functions and exceptions.
- **Learn:** Predict a loop result before running it Explain how a list or dictionary organizes the marks
- **Why here:** The Python week supplies a second worked explanation of the program constructs you are now practicing, without requiring the full course.
- **Practical activity:** Trace a short Python loop from the lecture, then adapt it to validate and summarize three student marks.
- **Finished when:** The summary handles an empty list and invalid input Explain the revised code without copying the lecture
- **Project connection:** [Python Student Management System](http://localhost:3003/projects/python-student-management-system).
- **Next:** After the exercise, continue to Functions and Modular Programming. Use the linked project milestone to connect these skills. [Functions and Modular Programming (1.2)](http://localhost:3003/learn/functions-and-modular-programming)

### 02. Operating Systems: Three Easy Pieces

Stable ID: `ostep`. Original resource retained. Priority: **CORE**. [Official source](https://pages.cs.wisc.edu/~remzi/OSTEP/). **C1–C12: PASS.** One resource/bookmark key `resource:ostep`; 3 distinct visit(s).

Corrections to learning moments: `ostep-primary` (practicalTask, completionCriteria); `ostep-reference-9.5` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId); `ostep-reference-9.6` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### ostep-primary — primary placement

- **Phase/topic:** 00 — Computer Science Foundations; [Operating Systems (0.2)](http://localhost:3003/learn/operating-systems). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open after Computer Fundamentals and while studying Operating Systems in Phase 00. Read the introductory chapters before concurrency details.
- **Prerequisites:** [Computer Fundamentals (0.1)](http://localhost:3003/learn/computer-fundamentals)
- **Read in order:** Introduction to operating systems → Processes → CPU scheduling → Address spaces and virtual memory → Concurrency introduction → Persistence overview.
- **Learn:** Explain process isolation and scheduling Distinguish virtual memory from physical RAM
- **Why here:** You can now connect CPU and RAM concepts to how an OS shares them between real programs.
- **Practical activity:** Open two ordinary local applications or supplied shell examples, inspect their process IDs and memory in the system process viewer, and explain what happens when one exits. No Python knowledge is required yet.
- **Finished when:** Record two real process observations Distinguish a program file, a process and its allocated memory
- **Project connection:** [Python Student Management System](http://localhost:3003/projects/python-student-management-system); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Computer Networking. Use the linked project milestone to connect these skills. [Computer Networking (0.3)](http://localhost:3003/learn/computer-networking)

#### ostep-reference-9.5

- **Phase/topic:** 09 — System Design & Scalability; [Distributed Systems (9.5)](http://localhost:3003/learn/distributed-systems). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Revisit the Distributed Systems chapter during Phase 09 Distributed Systems, after operating-system basics and queues.
- **Prerequisites:** [Operating Systems (0.2)](http://localhost:3003/learn/operating-systems); [Queues and Background Processing (9.4)](http://localhost:3003/learn/queues-and-background-processing)
- **Read in order:** Distributed Systems chapter: communication → Unreliable networks → Remote procedure calls → Distributed file-system examples as background.
- **Learn:** Distinguish a local process failure from a lost message Explain an ambiguous RPC outcome
- **Why here:** The book moves beyond one machine to explain why a remote call can fail ambiguously; it is a foundation, not a complete cloud reliability recipe.
- **Practical activity:** Draw a remote request with a delayed or lost reply and explain why the caller cannot infer whether the operation completed. Relate this to an idempotent document job.
- **Finished when:** The timeline includes sender, receiver and missing acknowledgement Document the retry decision and remaining uncertainty
- **Project connection:** [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Concurrency and Performance. Use the linked project milestone to connect these skills. [Concurrency and Performance (9.6)](http://localhost:3003/learn/concurrency-and-performance)

#### ostep-reference-9.6

- **Phase/topic:** 09 — System Design & Scalability; [Concurrency and Performance (9.6)](http://localhost:3003/learn/concurrency-and-performance). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Return to the concurrency chapters during Concurrency and Performance in Phase 09, after distributed failure fundamentals.
- **Prerequisites:** [Operating Systems (0.2)](http://localhost:3003/learn/operating-systems); [Distributed Systems (9.5)](http://localhost:3003/learn/distributed-systems)
- **Read in order:** Concurrency: an introduction → Threads → Locks → Condition variables → Concurrency bugs → Event-based concurrency.
- **Learn:** Identify a race and its shared state Explain why more threads need not improve throughput
- **Why here:** Thread interleavings, synchronization and event loops explain the behavior you must measure before increasing worker counts.
- **Practical activity:** Trace two interleavings of a shared-counter example, then explain one lock-based fix and one condition-variable use. Connect the result to a bounded worker design.
- **Finished when:** Show a failing interleaving and a corrected invariant Record the assumptions behind the worker limit
- **Project connection:** [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Scalable AI Systems. Use the linked project milestone to connect these skills. [Scalable AI Systems (9.7)](http://localhost:3003/learn/scalable-ai-systems)

### 03. MIT Introduction to Algorithms

Stable ID: `algorithms`. Original resource retained. Priority: **CORE**. [Official source](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/). **C1–C12: PASS.** One resource/bookmark key `resource:algorithms`; 1 distinct visit(s).

Reviewed: no learning-moment content correction was required. Resource identity, link targets and classification passed.

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### algorithms-primary — primary placement

- **Phase/topic:** 02 — Mathematics & Problem Solving; [Data Structures and Algorithms (2.8)](http://localhost:3003/learn/data-structures-and-algorithms). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during Data Structures and Algorithms in Phase 02, after Python functions and the basic logic/sets material in Discrete Mathematics.
- **Prerequisites:** [Python Setup and Fundamentals (1.1)](http://localhost:3003/learn/python-setup-and-fundamentals); [Functions and Modular Programming (1.2)](http://localhost:3003/learn/functions-and-modular-programming); [Discrete Mathematics and Logic (2.2)](http://localhost:3003/learn/discrete-mathematics-and-logic)
- **Read in order:** Algorithm analysis → Asymptotic complexity → Arrays and hashing → Searching and sorting → Trees → Breadth-first and depth-first search.
- **Learn:** Choose a suitable data structure Derive time and space growth
- **Why here:** You can implement and test an algorithm instead of trying to memorize a university lecture without programming practice.
- **Practical activity:** Implement binary search and BFS, solve selected exercises, and report edge cases and time/space complexity.
- **Finished when:** Solutions handle empty or missing inputs Complexity reasoning matches the code
- **Project connection:** [Python Student Management System](http://localhost:3003/projects/python-student-management-system).
- **Next:** After the exercise, continue to Software Engineering Fundamentals. Use the linked project milestone to connect these skills. [Software Engineering Fundamentals (3.1)](http://localhost:3003/learn/software-engineering-fundamentals)

### 04. Khan Academy Mathematics

Stable ID: `maths`. Original resource retained. Priority: **CORE**. [Official source](https://www.khanacademy.org/math). **C1–C12: PASS.** One resource/bookmark key `resource:maths`; 4 distinct visit(s).

Corrections to learning moments: `maths-reference-2.2` (focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId); `maths-reference-2.4` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId); `maths-reference-2.6` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### maths-primary — primary placement

- **Phase/topic:** 02 — Mathematics & Problem Solving; [Basic Mathematics (2.1)](http://localhost:3003/learn/basic-mathematics). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open alongside Python during Basic Mathematics in Phase 02. Return to the matching sections as later statistics or calculus lessons need them.
- **Prerequisites:** [Python Setup and Fundamentals (1.1)](http://localhost:3003/learn/python-setup-and-fundamentals)
- **Read in order:** Arithmetic and percentages → Ratios and powers → Algebra and equations → Functions and graphs → Logarithms → Calculus foundations when needed.
- **Learn:** Translate a formula into code Check units and interpret a graph
- **Why here:** Small numerical examples make functions, errors and training curves easier to reason about while you keep coding.
- **Practical activity:** Solve selected equations by hand, plot two functions in Python, and calculate a percentage error for a small prediction example.
- **Finished when:** Hand and program results agree Explain the function and units in a plotted example
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction).
- **Next:** After the exercise, continue to Discrete Mathematics and Logic. Use the linked project milestone to connect these skills. [Discrete Mathematics and Logic (2.2)](http://localhost:3003/learn/discrete-mathematics-and-logic)

#### maths-reference-2.2

- **Phase/topic:** 02 — Mathematics & Problem Solving; [Discrete Mathematics and Logic (2.2)](http://localhost:3003/learn/discrete-mathematics-and-logic). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open the counting and set material while studying Discrete Mathematics and Logic in Phase 02, after Basic Mathematics.
- **Prerequisites:** [Basic Mathematics (2.1)](http://localhost:3003/learn/basic-mathematics)
- **Read in order:** Counting and permutations → Combinations → Sets and Venn diagrams → Logical reasoning exercises where available.
- **Learn:** Distinguish permutations from combinations Interpret a set intersection in an application
- **Why here:** Counting small cases and visualizing set intersections supports this topic; Khan Academy is supplementary to the roadmap's proof and graph lessons.
- **Practical activity:** Count possible student-course assignments in a tiny example and verify the answer by listing cases. Draw a Venn diagram for two course groups.
- **Finished when:** Enumerated and calculated counts agree State which proof or graph concept still needs the roadmap lesson
- **Project connection:** [Python Student Management System](http://localhost:3003/projects/python-student-management-system).
- **Next:** After the exercise, continue to Statistics. Use the linked project milestone to connect these skills. [Statistics (2.3)](http://localhost:3003/learn/statistics)

#### maths-reference-2.4

- **Phase/topic:** 02 — Mathematics & Problem Solving; [Probability (2.4)](http://localhost:3003/learn/probability). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open the probability units during Probability in Phase 02 after descriptive statistics.
- **Prerequisites:** [Basic Mathematics (2.1)](http://localhost:3003/learn/basic-mathematics); [Statistics (2.3)](http://localhost:3003/learn/statistics)
- **Read in order:** Probability basics → Independent and dependent events → Conditional probability → Bayes examples.
- **Learn:** Distinguish independence from conditional probability Interpret the denominator in a conditional event
- **Why here:** Worked event diagrams make conditional probability interpretable before a statistics API is used.
- **Practical activity:** Calculate a conditional probability using a small frequency table, then simulate repeated trials to check the scale of the result.
- **Finished when:** The frequency table and calculation agree Explain simulation variation rather than expecting exact equality
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction).
- **Next:** After the exercise, continue to Linear Algebra. Use the linked project milestone to connect these skills. [Linear Algebra (2.5)](http://localhost:3003/learn/linear-algebra)

#### maths-reference-2.6

- **Phase/topic:** 02 — Mathematics & Problem Solving; [Calculus and Optimization (2.6)](http://localhost:3003/learn/calculus-and-optimization). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Return to selected calculus units during Calculus and Optimization in Phase 02 after functions and linear algebra.
- **Prerequisites:** [Basic Mathematics (2.1)](http://localhost:3003/learn/basic-mathematics); [Linear Algebra (2.5)](http://localhost:3003/learn/linear-algebra)
- **Read in order:** Limits and continuity introduction → Derivatives → Chain rule → Gradient and optimization intuition.
- **Learn:** Interpret a derivative as local change Relate a gradient step to a loss value
- **Why here:** Derivatives explain how a small parameter change affects a loss; arithmetic revision alone no longer addresses the learning need.
- **Practical activity:** Differentiate a one-variable squared-error function, check a finite-difference estimate, and show one gradient-descent update.
- **Finished when:** The analytic and numerical derivatives approximately agree State the step size and a case where a large step fails
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction).
- **Next:** After the exercise, continue to Information Theory Basics. Use the linked project milestone to connect these skills. [Information Theory Basics (2.7)](http://localhost:3003/learn/information-theory-basics)

### 05. MIT Information Theory

Stable ID: `information-theory`. Original resource retained. Priority: **CORE**. [Official source](https://ocw.mit.edu/courses/6-441-information-theory-spring-2010/). **C1–C12: PASS.** One resource/bookmark key `resource:information-theory`; 2 distinct visit(s).

Corrections to learning moments: `information-theory-primary` (nextStep, nextTopicId).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### information-theory-primary — primary placement

- **Phase/topic:** 02 — Mathematics & Problem Solving; [Information Theory Basics (2.7)](http://localhost:3003/learn/information-theory-basics). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open after Statistics and Probability, while studying Information Theory Basics in Phase 02. Revisit the interpretation during LLM Internals in Phase 06.
- **Prerequisites:** [Statistics (2.3)](http://localhost:3003/learn/statistics); [Probability (2.4)](http://localhost:3003/learn/probability)
- **Read in order:** Information content → Entropy → Conditional entropy → Mutual information → Selected introductory probability examples.
- **Learn:** Relate entropy to uncertainty Distinguish entropy and cross-entropy
- **Why here:** You already understand probability distributions, so uncertainty measures have a concrete meaning instead of being unexplained loss-function names.
- **Practical activity:** Compute entropy for two tiny distributions and explain why a language-model loss penalizes confident wrong predictions.
- **Finished when:** Calculations state the log base and assumptions Explain uncertainty without treating entropy as factual correctness
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to Data Structures and Algorithms. Use the linked project milestone to connect these skills. [Data Structures and Algorithms (2.8)](http://localhost:3003/learn/data-structures-and-algorithms)

#### information-theory-visit-6.4-1

- **Phase/topic:** 06 — NLP, Transformers & LLMs; [LLM Internals (6.4)](http://localhost:3003/learn/llm-internals). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Revisit only the entropy and uncertainty material during LLM Internals in Phase 06, after the Phase 02 introduction and transformer fundamentals.
- **Prerequisites:** [Information Theory Basics (2.7)](http://localhost:3003/learn/information-theory-basics); [Language Model Fundamentals (6.2)](http://localhost:3003/learn/language-model-fundamentals); [Transformer Architecture (6.3)](http://localhost:3003/learn/transformer-architecture)
- **Read in order:** Entropy and uncertainty → Conditional entropy → Cross-entropy interpretation → Mutual information overview.
- **Learn:** Connect predictive uncertainty with entropy. Explain what token-level loss does and does not measure.
- **Why here:** Token distributions and language-model loss now give the earlier probability ideas a concrete interpretation.
- **Practical activity:** Compute entropy for two tiny token distributions and compare their uncertainty; interpret a supplied cross-entropy example without treating it as application quality.
- **Finished when:** Probability distributions are normalized. Separate prediction loss from answer usefulness.
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to Prompt Engineering and Context Design. Use the linked project milestone to connect these skills. [Prompt Engineering and Context Design (6.7)](http://localhost:3003/learn/prompt-engineering-and-context-design)

### 06. The Amazon Builders Library

Stable ID: `builders`. Original resource retained. Priority: **CORE**. [Official source](https://aws.amazon.com/builders-library/). **C1–C12: PASS.** One resource/bookmark key `resource:builders`; 10 distinct visit(s).

Corrections to learning moments: `builders-reference-9.3` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId); `builders-reference-9.4` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId); `builders-reference-9.5` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId); `builders-reference-9.6` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId); `builders-reference-9.7` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId); `builders-reference-11.1` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId, advanced); `builders-reference-11.2` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId, advanced); `builders-reference-11.4` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId, advanced); `builders-reference-11.5` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, advanced).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### builders-primary — primary placement

- **Phase/topic:** 09 — System Design & Scalability; [System Design Fundamentals (9.1)](http://localhost:3003/learn/system-design-fundamentals). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during System Design Fundamentals in Phase 09 after building an API and handling basic provider failures. Select articles about the problem your project actually has.
- **Prerequisites:** [Computer Networking (0.3)](http://localhost:3003/learn/computer-networking); [API Engineering (7.1)](http://localhost:3003/learn/api-engineering); [Backend Architecture (7.3)](http://localhost:3003/learn/backend-architecture); [AI Backend Reliability (7.6)](http://localhost:3003/learn/ai-backend-reliability)
- **Read in order:** Timeouts and bounded retries → Backoff with jitter → Idempotent APIs → Availability and failure isolation → Caching trade-offs.
- **Learn:** Explain a failure boundary Choose a reliability policy using workload assumptions
- **Why here:** You now have request lifecycles and real failure cases against which to judge architecture advice.
- **Practical activity:** Write an architecture decision for CCAI covering a timeout/retry budget, idempotency and one availability trade-off.
- **Finished when:** State the workload and failure assumptions Justify a concrete choice and its downside
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Caching and Redis. Use the linked project milestone to connect these skills. [Caching and Redis (9.2)](http://localhost:3003/learn/caching-and-redis)

#### builders-reference-9.3

- **Phase/topic:** 09 — System Design & Scalability; [Rate Limiting (9.3)](http://localhost:3003/learn/rate-limiting). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Read overload and retry guidance during Rate Limiting in Phase 09, after caching and basic system design.
- **Prerequisites:** [AI Backend Reliability (7.6)](http://localhost:3003/learn/ai-backend-reliability); [System Design Fundamentals (9.1)](http://localhost:3003/learn/system-design-fundamentals); [Caching and Redis (9.2)](http://localhost:3003/learn/caching-and-redis)
- **Read in order:** Timeouts, retries and backoff with jitter → Avoiding overload → Load shedding and client backoff.
- **Learn:** Explain retry amplification Choose a bounded overload response
- **Why here:** A client that retries too aggressively can defeat a server's capacity plan; these articles complement the limiter implementation.
- **Practical activity:** Write a client retry policy for a 429 response with a total attempt budget and jitter, then show how it interacts with a token-bucket limit.
- **Finished when:** A timeline shows the retry and stop conditions The policy respects the server's retry signal without an unbounded loop
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Queues and Background Processing. Use the linked project milestone to connect these skills. [Queues and Background Processing (9.4)](http://localhost:3003/learn/queues-and-background-processing)

#### builders-reference-9.4

- **Phase/topic:** 09 — System Design & Scalability; [Queues and Background Processing (9.4)](http://localhost:3003/learn/queues-and-background-processing). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Read the idempotency and queue-backlog articles while building a durable job in Phase 09 Queues and Background Processing.
- **Prerequisites:** [AI Backend Reliability (7.6)](http://localhost:3003/learn/ai-backend-reliability); [System Design Fundamentals (9.1)](http://localhost:3003/learn/system-design-fundamentals); [Rate Limiting (9.3)](http://localhost:3003/learn/rate-limiting)
- **Read in order:** Making retries safe with idempotent APIs → Avoiding insurmountable queue backlogs → Timeout and retry budgets.
- **Learn:** Separate delivery attempts from one logical operation Recognize backlog growth and recovery limits
- **Why here:** A queued task may be delivered more than once, and a growing backlog is an operational failure even if requests are accepted.
- **Practical activity:** Design an idempotency record and bounded retry/dead-letter policy for document ingestion; simulate a duplicate delivery on paper or locally.
- **Finished when:** Duplicate deliveries resolve to one logical document The policy includes a retry limit and observable failure state
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Distributed Systems. Use the linked project milestone to connect these skills. [Distributed Systems (9.5)](http://localhost:3003/learn/distributed-systems)

#### builders-reference-9.5

- **Phase/topic:** 09 — System Design & Scalability; [Distributed Systems (9.5)](http://localhost:3003/learn/distributed-systems). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Revisit remote-failure and idempotency guidance during Distributed Systems in Phase 09 after queues.
- **Prerequisites:** [AI Backend Reliability (7.6)](http://localhost:3003/learn/ai-backend-reliability); [System Design Fundamentals (9.1)](http://localhost:3003/learn/system-design-fundamentals); [Queues and Background Processing (9.4)](http://localhost:3003/learn/queues-and-background-processing)
- **Read in order:** Making retries safe with idempotent APIs → Timeouts, retries and backoff with jitter → Failure isolation.
- **Learn:** Explain why timeout does not prove non-execution Keep retry side effects bounded
- **Why here:** An ambiguous timeout can trigger a second execution; the articles provide design patterns to apply to the distributed-systems concepts.
- **Practical activity:** Draw success, lost-reply and repeated-request timelines for one CCAI operation and state the durable identity needed to reconcile them.
- **Finished when:** Every timeline has a defined final state Document one consistency or availability trade-off
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Concurrency and Performance. Use the linked project milestone to connect these skills. [Concurrency and Performance (9.6)](http://localhost:3003/learn/concurrency-and-performance)

#### builders-reference-9.6

- **Phase/topic:** 09 — System Design & Scalability; [Concurrency and Performance (9.6)](http://localhost:3003/learn/concurrency-and-performance). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Read the overload-management articles during Concurrency and Performance in Phase 09 after distributed failure concepts.
- **Prerequisites:** [AI Backend Reliability (7.6)](http://localhost:3003/learn/ai-backend-reliability); [System Design Fundamentals (9.1)](http://localhost:3003/learn/system-design-fundamentals); [Distributed Systems (9.5)](http://localhost:3003/learn/distributed-systems)
- **Read in order:** Using load shedding to avoid overload → Timeout budgets → Workload and concurrency limits.
- **Learn:** Connect work limits to queueing delay Explain graceful rejection under overload
- **Why here:** A concurrency setting is useful only with an admission and overload policy; this source supports that policy rather than teaching Python profiling APIs.
- **Practical activity:** Write a bounded admission policy for a slow dependency and compare expected queue wait under two concurrency limits using measured or explicitly assumed numbers.
- **Finished when:** Units and workload assumptions are stated Separate actual measurements from estimates
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Scalable AI Systems. Use the linked project milestone to connect these skills. [Scalable AI Systems (9.7)](http://localhost:3003/learn/scalable-ai-systems)

#### builders-reference-9.7

- **Phase/topic:** 09 — System Design & Scalability; [Scalable AI Systems (9.7)](http://localhost:3003/learn/scalable-ai-systems). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Read the scalability and overload articles during Scalable AI Systems in Phase 09 after concurrency and performance.
- **Prerequisites:** [AI Backend Reliability (7.6)](http://localhost:3003/learn/ai-backend-reliability); [System Design Fundamentals (9.1)](http://localhost:3003/learn/system-design-fundamentals); [Concurrency and Performance (9.6)](http://localhost:3003/learn/concurrency-and-performance)
- **Read in order:** Load shedding and admission control → Queue backlog recovery → Retry budgets → Failure isolation.
- **Learn:** Identify the scarce inference resource Define a safe overload behavior
- **Why here:** Model inference consumes bounded workers and memory; ordinary request scaling advice must be tested against that workload.
- **Practical activity:** Design bounded inference admission, per-tenant quotas and an overload response for CCAI. Explain how a retry budget prevents an outage cascade.
- **Finished when:** The design includes limits and a recovery path Capacity claims are tied to stated measurements or assumptions
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Load and Stress Testing. Use the linked project milestone to connect these skills. [Load and Stress Testing (9.8)](http://localhost:3003/learn/load-and-stress-testing)

#### builders-reference-11.1

- **Phase/topic:** 11 — Advanced AI Architecture; [AI System Architecture (11.1)](http://localhost:3003/learn/ai-system-architecture). Stage: ADVANCED — RETURN LATER.
- **Open when:** Revisit selected reliability articles during AI System Architecture in Phase 11 after system design and observability.
- **Prerequisites:** [AI Backend Reliability (7.6)](http://localhost:3003/learn/ai-backend-reliability); [System Design Fundamentals (9.1)](http://localhost:3003/learn/system-design-fundamentals); [Logging, Monitoring, and Observability (10.8)](http://localhost:3003/learn/logging-monitoring-and-observability)
- **Read in order:** Failure isolation → Retry budgets → Availability trade-offs → Operational simplicity.
- **Learn:** Map a pattern to a concrete dependency boundary Explain its operational downside
- **Why here:** A complete CCAI design can now expose the dependency and failure boundaries that an isolated pattern cannot establish.
- **Practical activity:** Annotate one CCAI request diagram with timeout budgets, isolation boundaries and the signals used to detect failure.
- **Finished when:** Each proposed control has an owner and measurement The note includes one simpler alternative
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Intelligent Model Routing. Use the linked project milestone to connect these skills. [Intelligent Model Routing (11.2)](http://localhost:3003/learn/intelligent-model-routing)

#### builders-reference-11.2

- **Phase/topic:** 11 — Advanced AI Architecture; [Intelligent Model Routing (11.2)](http://localhost:3003/learn/intelligent-model-routing). Stage: ADVANCED — RETURN LATER.
- **Open when:** Return to failure-handling articles during Intelligent Model Routing in Phase 11 after architecture and evaluation fundamentals.
- **Prerequisites:** [AI Backend Reliability (7.6)](http://localhost:3003/learn/ai-backend-reliability); [System Design Fundamentals (9.1)](http://localhost:3003/learn/system-design-fundamentals); [AI and LLM Evaluation (10.4)](http://localhost:3003/learn/ai-and-llm-evaluation); [AI System Architecture (11.1)](http://localhost:3003/learn/ai-system-architecture)
- **Read in order:** Timeouts and bounded retries → Idempotent APIs → Failure isolation and graceful degradation.
- **Learn:** Separate retry from provider fallback Preserve a request budget across routing attempts
- **Why here:** Provider fallback is a distributed reliability decision; these articles support fallback policy rather than teaching model-capability ranking.
- **Practical activity:** Write CCAI fallback rules for a timed-out provider, including remaining latency/token budget and duplicate-accounting protection.
- **Finished when:** The policy stops when its budget is exhausted A failed attempt cannot charge usage twice
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to Model Serving and Inference Optimization. Use the linked project milestone to connect these skills. [Model Serving and Inference Optimization (11.3)](http://localhost:3003/learn/model-serving-and-inference-optimization)

#### builders-reference-11.4

- **Phase/topic:** 11 — Advanced AI Architecture; [High Availability and Reliability (11.4)](http://localhost:3003/learn/high-availability-and-reliability). Stage: ADVANCED — RETURN LATER.
- **Open when:** Read availability-focused articles during High Availability and Reliability in Phase 11 after a measured serving baseline.
- **Prerequisites:** [AI Backend Reliability (7.6)](http://localhost:3003/learn/ai-backend-reliability); [System Design Fundamentals (9.1)](http://localhost:3003/learn/system-design-fundamentals); [Logging, Monitoring, and Observability (10.8)](http://localhost:3003/learn/logging-monitoring-and-observability); [Model Serving and Inference Optimization (11.3)](http://localhost:3003/learn/model-serving-and-inference-optimization)
- **Read in order:** Failure isolation → Reducing dependency impact → Timeout and retry policy → Recovery practices.
- **Learn:** Relate an availability goal to a failure boundary Separate recovery evidence from an availability claim
- **Why here:** The architecture now has real dependencies whose failure and recovery behavior can be rehearsed.
- **Practical activity:** Plan and run a small owned-service dependency-failure drill, recording detection, fallback and recovery observations.
- **Finished when:** Record observed recovery time and affected work Document one failure the drill did not cover
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Architecture Trade-offs. Use the linked project milestone to connect these skills. [Architecture Trade-offs (11.5)](http://localhost:3003/learn/architecture-trade-offs)

#### builders-reference-11.5

- **Phase/topic:** 11 — Advanced AI Architecture; [Architecture Trade-offs (11.5)](http://localhost:3003/learn/architecture-trade-offs). Stage: ADVANCED — RETURN LATER.
- **Open when:** Return to only the relevant engineering articles during Architecture Trade-offs in Phase 11 after the reliability exercises.
- **Prerequisites:** [AI Backend Reliability (7.6)](http://localhost:3003/learn/ai-backend-reliability); [System Design Fundamentals (9.1)](http://localhost:3003/learn/system-design-fundamentals); [High Availability and Reliability (11.4)](http://localhost:3003/learn/high-availability-and-reliability)
- **Read in order:** Reliability pattern trade-offs → Operational simplicity → Retry and queueing costs.
- **Learn:** Explain a design consequence instead of copying a pattern State the evidence that would reverse the decision
- **Why here:** Examples from operating real services help challenge assumptions, but do not establish that the same architecture fits your workload.
- **Practical activity:** Write one architecture decision comparing a simple queue-based service with a more distributed design, citing the relevant reliability argument and your own workload evidence.
- **Finished when:** The decision contains assumptions, costs and a simpler alternative A trigger for reevaluating the decision is explicit
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** Complete the related project milestone and document the result before adding another tool.

### 07. vLLM Documentation

Stable ID: `vllm`. Original resource retained. Priority: **ADVANCED**. [Official source](https://docs.vllm.ai/en/latest/). **C1–C12: PASS.** One resource/bookmark key `resource:vllm`; 1 distinct visit(s).

Reviewed: no learning-moment content correction was required. Resource identity, link targets and classification passed.

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### vllm-primary — primary placement

- **Phase/topic:** 11 — Advanced AI Architecture; [Model Serving and Inference Optimization (11.3)](http://localhost:3003/learn/model-serving-and-inference-optimization). Stage: ADVANCED — RETURN LATER.
- **Open when:** Return in Phase 11 after GPU fundamentals, LLM Internals and the introductory model-serving lessons within Model Serving and Inference Optimization.
- **Prerequisites:** [GPU and Model Training Fundamentals (5.4)](http://localhost:3003/learn/gpu-and-model-training-fundamentals); [LLM Internals (6.4)](http://localhost:3003/learn/llm-internals); [AI System Architecture (11.1)](http://localhost:3003/learn/ai-system-architecture) Previous lessons: [What is model serving? (11.3.1)](http://localhost:3003/learn/model-serving-and-inference-optimization#11.3.1); [GPU inference (11.3.6)](http://localhost:3003/learn/model-serving-and-inference-optimization#11.3.6).
- **Read in order:** Serving quickstart and supported hardware → KV cache → Continuous batching → Throughput and latency → Memory limits → Benchmarking.
- **Learn:** Interpret a serving benchmark Compare memory and latency under a fixed workload
- **Why here:** Serving optimizations make sense only when you understand inference, memory budgets and the workload you intend to improve.
- **Practical activity:** Where compatible hardware exists, compare a simple baseline with one vLLM configuration. Otherwise analyze a documented benchmark and write the experiment plan.
- **Finished when:** Record model, hardware and workload Report measured or clearly labeled reference results without unsupported capacity claims
- **Project connection:** [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to High Availability and Reliability. Use the linked project milestone to connect these skills. [High Availability and Reliability (11.4)](http://localhost:3003/learn/high-availability-and-reliability)

### 08. OWASP Top 10

Stable ID: `owasp-web`. Original resource retained. Priority: **CORE**. [Official source](https://owasp.org/www-project-top-ten/). **C1–C12: PASS.** One resource/bookmark key `resource:owasp-web`; 1 distinct visit(s).

Reviewed: no learning-moment content correction was required. Resource identity, link targets and classification passed.

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### owasp-web-primary — primary placement

- **Phase/topic:** 10 — Production, Security & MLOps; [Application Security (10.1)](http://localhost:3003/learn/application-security). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during Application Security in Phase 10 after API Engineering, Backend Architecture and Database Engineering with PostgreSQL.
- **Prerequisites:** [Database Engineering with PostgreSQL (3.2)](http://localhost:3003/learn/database-engineering-with-postgresql); [API Engineering (7.1)](http://localhost:3003/learn/api-engineering); [Backend Architecture (7.3)](http://localhost:3003/learn/backend-architecture)
- **Read in order:** Broken access control → Injection → Authentication failures → Security misconfiguration → Dependency risk → Selected prevention guidance.
- **Learn:** Identify a trust boundary Test object-level authorization
- **Why here:** You have data routes and identities to threat-model, so the risk categories can become actionable tests.
- **Practical activity:** Threat-model your own API and test allowed and denied requests with two local test accounts.
- **Finished when:** Document asset and threat boundaries Demonstrate that a non-owner cannot read or change another account’s records
- **Project connection:** [ML Prediction API](http://localhost:3003/projects/ml-prediction-api); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to AI and LLM Security. Use the linked project milestone to connect these skills. [AI and LLM Security (10.2)](http://localhost:3003/learn/ai-and-llm-security)

### 09. Pytest Documentation

Stable ID: `pytest`. Original resource retained. Priority: **CORE**. [Official source](https://docs.pytest.org/en/stable/). **C1–C12: PASS.** One resource/bookmark key `resource:pytest`; 4 distinct visit(s).

Corrections to learning moments: `pytest-reference-3.1` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId); `pytest-reference-10.3` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### pytest-primary — primary placement

- **Phase/topic:** 01 — Python & Programming; [Python Professional Development (1.5)](http://localhost:3003/learn/python-professional-development). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open after Functions and Modular Programming, OOP and exception-handling basics, while studying Python Professional Development in Phase 01.
- **Prerequisites:** [Python Setup and Fundamentals (1.1)](http://localhost:3003/learn/python-setup-and-fundamentals); [Functions and Modular Programming (1.2)](http://localhost:3003/learn/functions-and-modular-programming); [Object-Oriented Programming (1.3)](http://localhost:3003/learn/object-oriented-programming); [Advanced Python (1.4)](http://localhost:3003/learn/advanced-python)
- **Read in order:** Getting started and assertions → Test functions → Fixtures → Parametrization → Monkeypatch and mocking → Failure reports.
- **Learn:** Test observable behavior Isolate external dependencies
- **Why here:** Your functions now have inputs, outputs and failure cases that can be checked independently.
- **Practical activity:** Write pytest tests for the student records app, covering valid input, malformed input and one injected dependency failure.
- **Finished when:** Tests detect a deliberate broken behavior Explain fixture lifetime and why a mock is appropriate
- **Project connection:** [Python Student Management System](http://localhost:3003/projects/python-student-management-system); [ML Prediction API](http://localhost:3003/projects/ml-prediction-api).
- **Next:** After the exercise, continue to JavaScript and TypeScript. Use the linked project milestone to connect these skills. [JavaScript and TypeScript (1.6-javascript)](http://localhost:3003/learn/javascript-and-typescript)

#### pytest-reference-3.1

- **Phase/topic:** 03 — Software, Data & Databases; [Software Engineering Fundamentals (3.1)](http://localhost:3003/learn/software-engineering-fundamentals). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Reopen the fixture and test-organization sections during Software Engineering Fundamentals in Phase 03 after Python Professional Development.
- **Prerequisites:** [Python Professional Development (1.5)](http://localhost:3003/learn/python-professional-development)
- **Read in order:** Fixtures → Parametrization → Monkeypatching dependencies → Test discovery and layout.
- **Learn:** Use tests to preserve observable behavior Isolate a dependency in a fixture
- **Why here:** Tests provide a behavior boundary for a small refactor; pytest does not replace the topic's requirements or architecture work.
- **Practical activity:** Refactor one student-record function behind a small interface while keeping behavior tests green, then add a failure-case fixture.
- **Finished when:** The tests pass before and after the refactor A deliberate behavior change makes a relevant assertion fail
- **Project connection:** [Python Student Management System](http://localhost:3003/projects/python-student-management-system); [ML Prediction API](http://localhost:3003/projects/ml-prediction-api).
- **Next:** After the exercise, continue to Database Engineering with PostgreSQL. Use the linked project milestone to connect these skills. [Database Engineering with PostgreSQL (3.2)](http://localhost:3003/learn/database-engineering-with-postgresql)

#### pytest-visit-7.2-1

- **Phase/topic:** 07 — Backend & AI Engineering; [FastAPI (7.2)](http://localhost:3003/learn/fastapi). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Reopen the testing sections while implementing your first FastAPI endpoints in Phase 07, after API Engineering. Keep tests local or mock provider requests.
- **Prerequisites:** [Python Professional Development (1.5)](http://localhost:3003/learn/python-professional-development); [API Engineering (7.1)](http://localhost:3003/learn/api-engineering)
- **Read in order:** Fixtures → Parametrized tests → Mocking external dependencies → Request/response assertions → Error and authentication cases.
- **Learn:** Verify API contracts with controlled fixtures. Cover invalid requests and dependency failures.
- **Why here:** A real request/response boundary lets you test validation and failure behavior independently of a model provider.
- **Practical activity:** Test a prediction route with valid input, a schema error and a failed dependency; keep secrets and paid calls out of the suite.
- **Finished when:** Tests are deterministic and run without a paid provider. Each case asserts the response status and contract.
- **Project connection:** [Python Student Management System](http://localhost:3003/projects/python-student-management-system); [ML Prediction API](http://localhost:3003/projects/ml-prediction-api).
- **Next:** After the exercise, continue to Backend Architecture. Use the linked project milestone to connect these skills. [Backend Architecture (7.3)](http://localhost:3003/learn/backend-architecture)

#### pytest-reference-10.3

- **Phase/topic:** 10 — Production, Security & MLOps; [Software and API Testing (10.3)](http://localhost:3003/learn/software-and-api-testing). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Return to pytest during Software and API Testing in Phase 10 after a working API and AI security fundamentals.
- **Prerequisites:** [Python Professional Development (1.5)](http://localhost:3003/learn/python-professional-development); [FastAPI (7.2)](http://localhost:3003/learn/fastapi); [AI and LLM Security (10.2)](http://localhost:3003/learn/ai-and-llm-security)
- **Read in order:** Fixtures and parametrization → Monkeypatch and mocking → Temporary files → Database integration fixtures → Failure reporting.
- **Learn:** Distinguish unit and integration boundaries Assert failure behavior without paid provider calls
- **Why here:** You now need contract, permission and dependency-failure checks at real boundaries instead of only isolated function examples.
- **Practical activity:** Add valid, invalid, unauthorized and failed-provider API cases with deterministic fixtures, plus one isolated database integration check.
- **Finished when:** A known authorization regression fails the suite Tests run independently with no shared fixture state
- **Project connection:** [ML Prediction API](http://localhost:3003/projects/ml-prediction-api); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to AI and LLM Evaluation. Use the linked project milestone to connect these skills. [AI and LLM Evaluation (10.4)](http://localhost:3003/learn/ai-and-llm-evaluation)

### 10. MongoDB Introduction

Stable ID: `mongodb`. Original resource retained. Priority: **OPTIONAL**. [Official source](https://www.mongodb.com/docs/manual/introduction/). **C1–C12: PASS.** One resource/bookmark key `resource:mongodb`; 1 distinct visit(s).

Reviewed: no learning-moment content correction was required. Resource identity, link targets and classification passed.

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### mongodb-primary — primary placement

- **Phase/topic:** 03 — Software, Data & Databases; [NoSQL Fundamentals (3.3)](http://localhost:3003/learn/nosql-fundamentals). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open after SQL and PostgreSQL relational design, while studying NoSQL Fundamentals in Phase 03.
- **Prerequisites:** [SQL (1.6-sql)](http://localhost:3003/learn/sql); [Database Engineering with PostgreSQL (3.2)](http://localhost:3003/learn/database-engineering-with-postgresql)
- **Read in order:** Document model → Collections and documents → CRUD queries → Embedding versus references → Indexes → Schema and query trade-offs.
- **Learn:** Compare document and relational modeling Choose storage from access patterns
- **Why here:** A relational baseline lets you compare trade-offs instead of treating a document database as an automatic replacement.
- **Practical activity:** Model the same small application in tables and documents; compare two real queries, updates and integrity rules.
- **Finished when:** Both models support the stated access pattern Document one consistency or duplication cost
- **Project connection:** [ML Prediction API](http://localhost:3003/projects/ml-prediction-api).
- **Next:** After the exercise, continue to Data Engineering Fundamentals. Use the linked project milestone to connect these skills. [Data Engineering Fundamentals (3.4)](http://localhost:3003/learn/data-engineering-fundamentals)

### 11. Go Documentation

Stable ID: `go`. Original resource retained. Priority: **OPTIONAL**. [Official source](https://go.dev/doc/). **C1–C12: PASS.** One resource/bookmark key `resource:go`; 1 distinct visit(s).

Corrections to learning moments: `go-primary` (prerequisiteTopicIds).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### go-primary — primary placement

- **Phase/topic:** 01 — Python & Programming; [Go — Optional Infrastructure Path (1.7-go)](http://localhost:3003/learn/go-optional-infrastructure-path). Stage: OPTIONAL REFERENCE.
- **Open when:** Although this optional topic belongs to Phase 01, return only after the core Python, backend and distributed-systems foundations, when an infrastructure project justifies Go.
- **Prerequisites:** [Python Professional Development (1.5)](http://localhost:3003/learn/python-professional-development); [Backend Architecture (7.3)](http://localhost:3003/learn/backend-architecture); [Distributed Systems (9.5)](http://localhost:3003/learn/distributed-systems); [Concurrency and Performance (9.6)](http://localhost:3003/learn/concurrency-and-performance)
- **Read in order:** Tour and modules → Structs and interfaces → Goroutines → Channels and cancellation → HTTP services → Testing.
- **Learn:** Explain bounded concurrency in Go Compare a small service with its Python version
- **Why here:** A second language is useful when you can compare its runtime and operational trade-offs against an application you already understand.
- **Practical activity:** If choosing this path, implement a tiny bounded-concurrency service and test cancellation and invalid input.
- **Finished when:** Demonstrate correct shutdown and bounded work Explain why this service benefits from Go rather than assuming faster is always better
- **Project connection:** [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Scalable AI Systems. Use the linked project milestone to connect these skills. [Scalable AI Systems (9.7)](http://localhost:3003/learn/scalable-ai-systems)

### 12. Learn Java

Stable ID: `java`. Original resource retained. Priority: **OPTIONAL**. [Official source](https://dev.java/learn/). **C1–C12: PASS.** One resource/bookmark key `resource:java`; 1 distinct visit(s).

Reviewed: no learning-moment content correction was required. Resource identity, link targets and classification passed.

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### java-primary — primary placement

- **Phase/topic:** 01 — Python & Programming; [Java — Optional Backend Path (1.7-java)](http://localhost:3003/learn/java-optional-backend-path). Stage: OPTIONAL REFERENCE.
- **Open when:** Open after OOP fundamentals and Python Professional Development, only when a Java backend role or existing JVM application makes the optional Phase 01 path useful.
- **Prerequisites:** [Object-Oriented Programming (1.3)](http://localhost:3003/learn/object-oriented-programming); [Python Professional Development (1.5)](http://localhost:3003/learn/python-professional-development)
- **Read in order:** Language and JVM basics → Classes and interfaces → Collections and generics → Exception handling → Testing → Small HTTP service.
- **Learn:** Connect Java OOP to prior Python concepts Recognize when JVM work is relevant
- **Why here:** You can reuse your OOP understanding and focus on language/runtime differences rather than delaying AI foundations.
- **Practical activity:** Build and test a small records service, comparing interfaces and exception behavior with the Python student project.
- **Finished when:** Provide working tests and an edge case Explain one JVM/runtime or type-system difference
- **Project connection:** [Python Student Management System](http://localhost:3003/projects/python-student-management-system).
- **Next:** After the exercise, continue to Backend Architecture. Use the linked project milestone to connect these skills. [Backend Architecture (7.3)](http://localhost:3003/learn/backend-architecture)

### 13. C++ Documentation

Stable ID: `cpp`. Original resource retained. Priority: **OPTIONAL**. [Official source](https://learn.microsoft.com/en-us/cpp/cpp/?view=msvc-170). **C1–C12: PASS.** One resource/bookmark key `resource:cpp`; 1 distinct visit(s).

Reviewed: no learning-moment content correction was required. Resource identity, link targets and classification passed.

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### cpp-primary — primary placement

- **Phase/topic:** 01 — Python & Programming; [C++ — Optional Systems Path (1.7-cpp)](http://localhost:3003/learn/cpp-optional-systems-path). Stage: OPTIONAL REFERENCE.
- **Open when:** Return to the optional C++ path after DSA, process/memory concepts and programming practice, when a systems or kernel experiment needs it.
- **Prerequisites:** [Operating Systems (0.2)](http://localhost:3003/learn/operating-systems); [Python Professional Development (1.5)](http://localhost:3003/learn/python-professional-development); [Data Structures and Algorithms (2.8)](http://localhost:3003/learn/data-structures-and-algorithms)
- **Read in order:** Compilation and builds → Values and references → Object lifetime → RAII and smart pointers → Containers → Profiling and sanitizers.
- **Learn:** Explain ownership and lifetime Recognize memory-safety failures
- **Why here:** Low-level control is useful only after you can reason about correctness, complexity and resource lifetime.
- **Practical activity:** Create a small RAII-based utility, test an invalid input and use a sanitizer or a documented diagnostic example to analyze a lifetime error.
- **Finished when:** Explain who owns each resource Distinguish a measured optimization from an unsafe shortcut
- **Project connection:** [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Model Serving and Inference Optimization. Use the linked project milestone to connect these skills. [Model Serving and Inference Optimization (11.3)](http://localhost:3003/learn/model-serving-and-inference-optimization)

### 14. Ministry of Electronics and IT

Stable ID: `privacy-india`. Original resource retained. Priority: **OPTIONAL**. [Official source](https://www.meity.gov.in/). **C1–C12: PASS.** One resource/bookmark key `resource:privacy-india`; 1 distinct visit(s).

Reviewed: no learning-moment content correction was required. Resource identity, link targets and classification passed.

Content verification: **needs_review**. The official MeitY portal is reachable, but its client-rendered data-protection material could not be inspected in this environment. The original URL is retained; verify current official notices and legal source documents manually before relying on them.

#### privacy-india-primary — primary placement

- **Phase/topic:** 10 — Production, Security & MLOps; [Privacy, Governance, and Responsible AI (10.10)](http://localhost:3003/learn/privacy-governance-and-responsible-ai). Stage: OPTIONAL REFERENCE.
- **Open when:** Open during Privacy, Governance, and Responsible AI in Phase 10 after application/AI security and data access control, when your processing activity may fall under Indian requirements.
- **Prerequisites:** [Data Modeling and Storage for AI (3.5)](http://localhost:3003/learn/data-modeling-and-storage-for-ai); [Application Security (10.1)](http://localhost:3003/learn/application-security); [AI and LLM Security (10.2)](http://localhost:3003/learn/ai-and-llm-security)
- **Read in order:** Current official data-protection material → Government notices and updates → Data lifecycle obligations where applicable → Official implementation guidance.
- **Learn:** Find the current official source Identify questions requiring qualified legal review
- **Why here:** You can describe what data your app handles and then investigate the applicable official material with that specific context.
- **Practical activity:** Create a data inventory and a list of retention, access and legal-applicability questions with links to the current government pages.
- **Finished when:** Record access date and source provenance Separate engineering observations from legal conclusions
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to AI System Architecture. Use the linked project milestone to connect these skills. [AI System Architecture (11.1)](http://localhost:3003/learn/ai-system-architecture)

### 15. Data Protection

Stable ID: `privacy-eu`. Original resource retained. Priority: **OPTIONAL**. [Official source](https://commission.europa.eu/law/law-topic/data-protection_en). **C1–C12: PASS.** One resource/bookmark key `resource:privacy-eu`; 1 distinct visit(s).

Reviewed: no learning-moment content correction was required. Resource identity, link targets and classification passed.

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### privacy-eu-primary — primary placement

- **Phase/topic:** 10 — Production, Security & MLOps; [Privacy, Governance, and Responsible AI (10.10)](http://localhost:3003/learn/privacy-governance-and-responsible-ai). Stage: OPTIONAL REFERENCE.
- **Open when:** Open during the Phase 10 privacy topic only when understanding EU data protection or planning a service whose processing may fall within those rules.
- **Prerequisites:** [Data Modeling and Storage for AI (3.5)](http://localhost:3003/learn/data-modeling-and-storage-for-ai); [Application Security (10.1)](http://localhost:3003/learn/application-security); [AI and LLM Security (10.2)](http://localhost:3003/learn/ai-and-llm-security)
- **Read in order:** EU data-protection overview → Lawful processing information → Data-subject rights overview → Official guidance relevant to the use case.
- **Learn:** Recognize jurisdiction-dependent applicability Map stored data to a documented lifecycle
- **Why here:** The app’s data flows and user context determine the useful questions; a generic checklist cannot establish legal applicability.
- **Practical activity:** Document the personal data, purpose, retention and access paths for one example feature and list questions for qualified review.
- **Finished when:** Use current official sources and record their dates Avoid claiming legal compliance from a technical diagram alone
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to AI System Architecture. Use the linked project milestone to connect these skills. [AI System Architecture (11.1)](http://localhost:3003/learn/ai-system-architecture)

### 16. The Python Tutorial

Stable ID: `python`. Original resource retained. Priority: **CORE**. [Official source](https://docs.python.org/3/tutorial/). **C1–C12: PASS.** One resource/bookmark key `resource:python`; 5 distinct visit(s).

Corrections to learning moments: `python-primary` (recommendedTiming, startWhen); `python-reference-1.2` (focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId); `python-reference-1.3` (focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId); `python-reference-1.4` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId); `python-reference-1.5` (focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### python-primary — primary placement

- **Phase/topic:** 01 — Python & Programming; [Python Setup and Fundamentals (1.1)](http://localhost:3003/learn/python-setup-and-fundamentals). Stage: START HERE.
- **Open when:** Open the interpreter and basic-syntax sections alongside Python Setup and Fundamentals in Phase 01 after its first worked variable/control-flow examples. The official tutorial assumes some programming familiarity; use the roadmap examples as the beginner introduction.
- **Prerequisites:** [Command Line and Linux (0.4)](http://localhost:3003/learn/command-line-and-linux)
- **Read in order:** Using the interpreter → Numbers and strings → Control flow → Lists and dictionaries → Functions → Modules, classes and exceptions in later matching topics.
- **Learn:** Read and predict a short Python program Build a validated command-line tool
- **Why here:** The interpreter and small programs give immediate feedback before you add AI libraries.
- **Practical activity:** Reproduce a short example without copying, then build a marks calculator with input validation and at least three test cases.
- **Finished when:** Predict and explain each branch Handle invalid input and explain a data-structure choice
- **Project connection:** [Python Student Management System](http://localhost:3003/projects/python-student-management-system).
- **Next:** After the exercise, continue to Functions and Modular Programming. Use the linked project milestone to connect these skills. [Functions and Modular Programming (1.2)](http://localhost:3003/learn/functions-and-modular-programming)

#### python-reference-1.2

- **Phase/topic:** 01 — Python & Programming; [Functions and Modular Programming (1.2)](http://localhost:3003/learn/functions-and-modular-programming). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Read the functions and Modules chapters during Functions and Modular Programming in Phase 01 after control flow and collections.
- **Prerequisites:** [Python Setup and Fundamentals (1.1)](http://localhost:3003/learn/python-setup-and-fundamentals)
- **Read in order:** More on defining functions → Keyword and default arguments → Modules → Packages → Executing modules as scripts.
- **Learn:** Explain argument binding and a return contract Distinguish importing a module from running its CLI
- **Why here:** Function contracts and module boundaries let the same student-record behavior be reused and tested.
- **Practical activity:** Split mark validation and aggregation into functions in a module, import them from a small CLI, and exercise positional/default/keyword arguments.
- **Finished when:** Invalid marks are handled consistently The module can be imported without starting interactive input
- **Project connection:** [Python Student Management System](http://localhost:3003/projects/python-student-management-system).
- **Next:** After the exercise, continue to Object-Oriented Programming. Use the linked project milestone to connect these skills. [Object-Oriented Programming (1.3)](http://localhost:3003/learn/object-oriented-programming)

#### python-reference-1.3

- **Phase/topic:** 01 — Python & Programming; [Object-Oriented Programming (1.3)](http://localhost:3003/learn/object-oriented-programming). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Read the Classes chapter during Object-Oriented Programming in Phase 01 after functions and modules.
- **Prerequisites:** [Functions and Modular Programming (1.2)](http://localhost:3003/learn/functions-and-modular-programming)
- **Read in order:** Classes → Class and instance variables → Inheritance → Iterators → Exceptions as supporting revision.
- **Learn:** Distinguish class attributes from instance state Use composition or an interface to replace storage
- **Why here:** The tutorial now explains the object and method behavior needed to model records and interchangeable repositories.
- **Practical activity:** Create Student and StudentRepository objects, compare a file-backed and an in-memory implementation, and test that instance data is not shared accidentally.
- **Finished when:** Two instances keep independent records The same caller works with both repository implementations
- **Project connection:** [Python Student Management System](http://localhost:3003/projects/python-student-management-system).
- **Next:** After the exercise, continue to Advanced Python. Use the linked project milestone to connect these skills. [Advanced Python (1.4)](http://localhost:3003/learn/advanced-python)

#### python-reference-1.4

- **Phase/topic:** 01 — Python & Programming; [Advanced Python (1.4)](http://localhost:3003/learn/advanced-python). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Return to the exception, generator and file-cleanup sections during Advanced Python in Phase 01 after classes.
- **Prerequisites:** [Functions and Modular Programming (1.2)](http://localhost:3003/learn/functions-and-modular-programming); [Object-Oriented Programming (1.3)](http://localhost:3003/learn/object-oriented-programming)
- **Read in order:** Errors and exceptions → Iterators and generators → Input and output → Predefined clean-up actions → Standard-library overview.
- **Learn:** Explain lazy iteration and resource lifetime Keep invalid records separate from successful output
- **Why here:** These selected tutorial sections cover iteration and resource handling; typing and async details need the linked standard-library references.
- **Practical activity:** Write a generator-based JSON-to-CSV transformation with a context-managed file and a custom validation exception. Use the separate asyncio guide only for the topic's later async exercise.
- **Finished when:** A failing input closes files and produces a controlled error The generator does not require loading the whole dataset
- **Project connection:** [Python Student Management System](http://localhost:3003/projects/python-student-management-system).
- **Next:** After the exercise, continue to Python Professional Development. Use the linked project milestone to connect these skills. [Python Professional Development (1.5)](http://localhost:3003/learn/python-professional-development)

#### python-reference-1.5

- **Phase/topic:** 01 — Python & Programming; [Python Professional Development (1.5)](http://localhost:3003/learn/python-professional-development). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Revisit environments, quality-control and timing examples during Python Professional Development in Phase 01 after Advanced Python.
- **Prerequisites:** [Advanced Python (1.4)](http://localhost:3003/learn/advanced-python)
- **Read in order:** Virtual environments and packages → Brief tour: quality control → Brief tour: performance measurement → Modules and package layout.
- **Learn:** Separate dependency isolation from source packaging Measure a function without guessing its bottleneck
- **Why here:** The language tutorial supplies environment and standard-library context; pytest, formatter and linter setup use their own documentation.
- **Practical activity:** Create an isolated environment for the student app, reproduce its dependency setup and time one function using the documented standard-library approach.
- **Finished when:** A second local environment can reproduce the run The timing records input size and method
- **Project connection:** [Python Student Management System](http://localhost:3003/projects/python-student-management-system).
- **Next:** After the exercise, continue to JavaScript and TypeScript. Use the linked project milestone to connect these skills. [JavaScript and TypeScript (1.6-javascript)](http://localhost:3003/learn/javascript-and-typescript)

Selected precise official guides: [Advanced Python: asyncio introduction (Phase 01 Advanced Python)](https://docs.python.org/3/library/asyncio.html); [Advanced Python: typing reference (read selected concepts)](https://docs.python.org/3/library/typing.html).

### 17. Pro Git

Stable ID: `git`. Original resource retained. Priority: **CORE**. [Official source](https://git-scm.com/book/en/v2). **C1–C12: PASS.** One resource/bookmark key `resource:git`; 3 distinct visit(s).

Corrections to learning moments: `git-reference-3.1` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId); `git-reference-10.7` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### git-primary — primary placement

- **Phase/topic:** 00 — Computer Science Foundations; [Git and GitHub (0.5)](http://localhost:3003/learn/git-and-github). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open after Command Line and Linux basics, while studying Git and GitHub in Phase 00.
- **Prerequisites:** [Command Line and Linux (0.4)](http://localhost:3003/learn/command-line-and-linux)
- **Read in order:** Getting started → Recording changes → Branches → Merging and conflicts → Remotes → Collaboration.
- **Learn:** Describe a commit and branch Recover and review a code change
- **Why here:** You can navigate project files and now need a reproducible record of changes before the first serious build.
- **Practical activity:** Create a local repository, branch, merge a deliberate conflict and write a useful README for a practice project.
- **Finished when:** History shows the intended changes Explain the resolved conflict and ignored files
- **Project connection:** [Python Student Management System](http://localhost:3003/projects/python-student-management-system); [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction); [ML Prediction API](http://localhost:3003/projects/ml-prediction-api); [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [Graph RAG Knowledge Assistant](http://localhost:3003/projects/graph-rag-knowledge-assistant); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Python Setup and Fundamentals. Use the linked project milestone to connect these skills. [Python Setup and Fundamentals (1.1)](http://localhost:3003/learn/python-setup-and-fundamentals)

#### git-reference-3.1

- **Phase/topic:** 03 — Software, Data & Databases; [Software Engineering Fundamentals (3.1)](http://localhost:3003/learn/software-engineering-fundamentals). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Revisit the collaboration chapters during Software Engineering Fundamentals in Phase 03 after the initial Git and Python project.
- **Prerequisites:** [Git and GitHub (0.5)](http://localhost:3003/learn/git-and-github); [Python Professional Development (1.5)](http://localhost:3003/learn/python-professional-development)
- **Read in order:** Distributed workflows → Contributing to a project → Branching workflows → Inspecting diffs and commit history.
- **Learn:** Keep a coherent change separate from unrelated work Explain a diff to another reviewer
- **Why here:** A reviewable branch and commit history make a refactor inspectable; the book supports version-control practice rather than requirements design itself.
- **Practical activity:** Put one small student-app refactor on a branch, inspect the diff and write a review note explaining behavior preserved and tests run.
- **Finished when:** The branch contains a focused change and useful commit message A reviewed diff matches the stated behavior
- **Project connection:** [Python Student Management System](http://localhost:3003/projects/python-student-management-system); [ML Prediction API](http://localhost:3003/projects/ml-prediction-api).
- **Next:** After the exercise, continue to Database Engineering with PostgreSQL. Use the linked project milestone to connect these skills. [Database Engineering with PostgreSQL (3.2)](http://localhost:3003/learn/database-engineering-with-postgresql)

#### git-reference-10.7

- **Phase/topic:** 10 — Production, Security & MLOps; [DevOps and CI/CD (10.7)](http://localhost:3003/learn/devops-and-ci-cd). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Revisit release identity and workflow sections during DevOps and CI/CD in Phase 10 after local checks and the first cloud deployment.
- **Prerequisites:** [Git and GitHub (0.5)](http://localhost:3003/learn/git-and-github); [Software and API Testing (10.3)](http://localhost:3003/learn/software-and-api-testing); [Cloud Computing (10.6)](http://localhost:3003/learn/cloud-computing)
- **Read in order:** Tagging → Distributed workflows → Git hooks → Inspecting commit history.
- **Learn:** Distinguish a Git tag from a deployment Trace an artifact back to reviewed source
- **Why here:** Git identifies the exact source being built; GitHub Actions documentation supplies the CI YAML and runner behavior.
- **Practical activity:** Tag a local practice release, identify its commit and describe how a CI artifact should retain that identity. Use the separate GitHub Actions resource for the workflow file.
- **Finished when:** The tag resolves to the expected commit The release note records tests and a rollback source revision
- **Project connection:** [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Logging, Monitoring, and Observability. Use the linked project milestone to connect these skills. [Logging, Monitoring, and Observability (10.8)](http://localhost:3003/learn/logging-monitoring-and-observability)

### 18. MDN Web Development

Stable ID: `web`. Original resource retained. Priority: **CORE**. [Official source](https://developer.mozilla.org/en-US/docs/Learn_web_development). **C1–C12: PASS.** One resource/bookmark key `resource:web`; 3 distinct visit(s).

Corrections to learning moments: `web-reference-7.1` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### web-primary — primary placement

- **Phase/topic:** 00 — Computer Science Foundations; [Computer Networking (0.3)](http://localhost:3003/learn/computer-networking). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during Computer Networking in Phase 00 after OS fundamentals. Return to JavaScript sections only during the supporting web-language topic.
- **Prerequisites:** [Operating Systems (0.2)](http://localhost:3003/learn/operating-systems)
- **Read in order:** How the web works → HTTP requests and responses → Status codes and headers → Browser network tools → Relevant Web APIs.
- **Learn:** Trace a browser-to-server request Separate transport and application errors
- **Why here:** A visible request makes networking terms concrete without requiring a full frontend curriculum.
- **Practical activity:** Inspect a successful and a failed HTTP request in browser developer tools; record method, headers, status and timing.
- **Finished when:** Explain the response and failure category Distinguish HTTP behavior from an application’s business logic
- **Project connection:** [ML Prediction API](http://localhost:3003/projects/ml-prediction-api); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to Command Line and Linux. Use the linked project milestone to connect these skills. [Command Line and Linux (0.4)](http://localhost:3003/learn/command-line-and-linux)

#### web-visit-1.6-javascript-1

- **Phase/topic:** 01 — Python & Programming; [JavaScript and TypeScript (1.6-javascript)](http://localhost:3003/learn/javascript-and-typescript). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Return to the JavaScript learning sections in Phase 01 after functions and professional Python development. Read the browser examples alongside the TypeScript Handbook, after basic JavaScript syntax.
- **Prerequisites:** [Functions and Modular Programming (1.2)](http://localhost:3003/learn/functions-and-modular-programming); [Python Professional Development (1.5)](http://localhost:3003/learn/python-professional-development)
- **Read in order:** JavaScript language fundamentals → Functions, arrays and objects → DOM and events → Promises and fetch → HTTP requests from a browser.
- **Learn:** Explain a browser event and an asynchronous request. Distinguish JavaScript execution from static type checking.
- **Why here:** You can transfer programming ideas to the browser while separating JavaScript runtime behavior from TypeScript compile-time checking.
- **Practical activity:** Build a tiny browser form that fetches sample JSON and renders a valid response, handling an error without unsafe HTML insertion.
- **Finished when:** A loading and a failure case are visible. Explain the request and DOM update flow.
- **Project connection:** [ML Prediction API](http://localhost:3003/projects/ml-prediction-api); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to SQL. Use the linked project milestone to connect these skills. [SQL (1.6-sql)](http://localhost:3003/learn/sql)

#### web-reference-7.1

- **Phase/topic:** 07 — Backend & AI Engineering; [API Engineering (7.1)](http://localhost:3003/learn/api-engineering). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Revisit HTTP and web API reference material during API Engineering in Phase 07 after programming and the networking introduction.
- **Prerequisites:** [Computer Networking (0.3)](http://localhost:3003/learn/computer-networking); [Python Professional Development (1.5)](http://localhost:3003/learn/python-professional-development)
- **Read in order:** HTTP overview → Request methods → Status codes → Headers → Browser network inspection.
- **Learn:** Distinguish transport status from response data Explain an HTTP request/response boundary
- **Why here:** Transport semantics explain a prediction endpoint's observable contract; MDN is the HTTP reference, not the generator of your application schema.
- **Practical activity:** Inspect sample success, validation-error and unauthorized requests and specify methods, statuses and headers for one prediction endpoint.
- **Finished when:** The three cases have justified methods and statuses An untrusted response is validated before display
- **Project connection:** [ML Prediction API](http://localhost:3003/projects/ml-prediction-api); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to FastAPI. Use the linked project milestone to connect these skills. [FastAPI (7.2)](http://localhost:3003/learn/fastapi)

### 19. TypeScript Handbook

Stable ID: `typescript`. Original resource retained. Priority: **CORE**. [Official source](https://www.typescriptlang.org/docs/). **C1–C12: PASS.** One resource/bookmark key `resource:typescript`; 1 distinct visit(s).

Corrections to learning moments: `typescript-primary` (previousLessonIds).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### typescript-primary — primary placement

- **Phase/topic:** 01 — Python & Programming; [JavaScript and TypeScript (1.6-javascript)](http://localhost:3003/learn/javascript-and-typescript). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open in the TypeScript portion of JavaScript and TypeScript in Phase 01 after the JavaScript variables, functions, objects, modules and async/await lessons in that topic.
- **Prerequisites:** [Functions and Modular Programming (1.2)](http://localhost:3003/learn/functions-and-modular-programming); [Python Professional Development (1.5)](http://localhost:3003/learn/python-professional-development) Previous lessons: [Fetch API (1.6-javascript.7)](http://localhost:3003/learn/javascript-and-typescript#1.6-javascript.7).
- **Read in order:** Everyday types → Object types and interfaces → Unions → Narrowing → Generics → Modules → Typed API boundaries.
- **Learn:** Model an API contract statically Explain why network data still needs runtime validation
- **Why here:** You already understand JavaScript execution, so types can expose mistakes without being mistaken for runtime validation.
- **Practical activity:** Type a small request/response client and validate an untrusted response before displaying it.
- **Finished when:** The type checker catches an incompatible value Malformed network data produces a visible handled error
- **Project connection:** [ML Prediction API](http://localhost:3003/projects/ml-prediction-api); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to SQL. Use the linked project milestone to connect these skills. [SQL (1.6-sql)](http://localhost:3003/learn/sql)

### 20. PostgreSQL Tutorial

Stable ID: `postgres`. Original resource retained. Priority: **CORE**. [Official source](https://www.postgresql.org/docs/current/tutorial.html). **C1–C12: PASS.** One resource/bookmark key `resource:postgres`; 5 distinct visit(s).

Corrections to learning moments: `postgres-visit-1.6-sql-1` (projectIds); `postgres-primary` (focusSections); `postgres-reference-3.3` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId); `postgres-reference-3.5` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId); `postgres-reference-7.3` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### postgres-visit-1.6-sql-1

- **Phase/topic:** 01 — Python & Programming; [SQL (1.6-sql)](http://localhost:3003/learn/sql). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open only the introductory SQL tutorial sections while studying SQL in Phase 01 after functions and basic programming. Leave administration and deeper query planning for Phase 03.
- **Prerequisites:** [Functions and Modular Programming (1.2)](http://localhost:3003/learn/functions-and-modular-programming)
- **Read in order:** Tables and types → SELECT and WHERE → INSERT, UPDATE and DELETE → GROUP BY and joins → Basic constraints.
- **Learn:** Enforce data integrity Read an execution plan for a selected query
- **Why here:** A tiny local schema lets the SQL syntax operate on real rows without requiring full database-engineering knowledge.
- **Practical activity:** Create a small students/results schema and write a filtered query, a join and a grouped summary.
- **Finished when:** Queries return the intended rows. User-supplied values are kept separate from query syntax.
- **Project connection:** [Python Student Management System](http://localhost:3003/projects/python-student-management-system).
- **Next:** After the exercise, continue to Bash. Use the linked project milestone to connect these skills. [Bash (1.6-bash)](http://localhost:3003/learn/bash)

#### postgres-primary — primary placement

- **Phase/topic:** 03 — Software, Data & Databases; [Database Engineering with PostgreSQL (3.2)](http://localhost:3003/learn/database-engineering-with-postgresql). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during Database Engineering with PostgreSQL in Phase 03 after the SQL fundamentals path in Phase 01.
- **Prerequisites:** [SQL (1.6-sql)](http://localhost:3003/learn/sql); [Software Engineering Fundamentals (3.1)](http://localhost:3003/learn/software-engineering-fundamentals)
- **Read in order:** Tutorial: tables, SELECT and joins → Tutorial: foreign keys and transactions → SQL language: constraints and schema design → Indexes chapter → Performance Tips: Using EXPLAIN.
- **Learn:** Enforce data integrity Read an execution plan for a selected query
- **Why here:** You can write basic queries and are ready to add durable relationships, constraints and transactional correctness.
- **Practical activity:** Create users, documents and requests tables; test a rejected invalid relationship and inspect one indexed query.
- **Finished when:** Constraints protect a real invariant A transaction rolls back a failed multi-step operation
- **Project connection:** [ML Prediction API](http://localhost:3003/projects/ml-prediction-api); [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to NoSQL Fundamentals. Use the linked project milestone to connect these skills. [NoSQL Fundamentals (3.3)](http://localhost:3003/learn/nosql-fundamentals)

#### postgres-reference-3.3

- **Phase/topic:** 03 — Software, Data & Databases; [NoSQL Fundamentals (3.3)](http://localhost:3003/learn/nosql-fundamentals). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Use the relational and JSON sections as a comparison during NoSQL Fundamentals in Phase 03, after PostgreSQL database engineering.
- **Prerequisites:** [SQL (1.6-sql)](http://localhost:3003/learn/sql); [Database Engineering with PostgreSQL (3.2)](http://localhost:3003/learn/database-engineering-with-postgresql)
- **Read in order:** Tutorial: tables and joins → SQL language: constraints → SQL language: JSON types → Transactions.
- **Learn:** Compare relational constraints with document flexibility Choose a model using concrete query patterns
- **Why here:** A relational baseline helps you decide whether documents simplify actual queries; PostgreSQL documentation does not teach MongoDB's API.
- **Practical activity:** Represent one document-metadata example as normalized rows and as a JSON column, then compare update and integrity requirements with the separate MongoDB exercise.
- **Finished when:** Both PostgreSQL examples answer the same sample query Document which integrity rule each design enforces
- **Project connection:** [ML Prediction API](http://localhost:3003/projects/ml-prediction-api); [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant).
- **Next:** After the exercise, continue to Data Engineering Fundamentals. Use the linked project milestone to connect these skills. [Data Engineering Fundamentals (3.4)](http://localhost:3003/learn/data-engineering-fundamentals)

#### postgres-reference-3.5

- **Phase/topic:** 03 — Software, Data & Databases; [Data Modeling and Storage for AI (3.5)](http://localhost:3003/learn/data-modeling-and-storage-for-ai). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Revisit schema and constraint material during Data Modeling and Storage for AI in Phase 03 after PostgreSQL and data pipelines.
- **Prerequisites:** [Database Engineering with PostgreSQL (3.2)](http://localhost:3003/learn/database-engineering-with-postgresql); [Data Engineering Fundamentals (3.4)](http://localhost:3003/learn/data-engineering-fundamentals)
- **Read in order:** SQL language: constraints → Data definition and schemas → JSON types → Indexes → EXPLAIN as a later query check.
- **Learn:** Model provenance and ownership as data Separate relational integrity from vector similarity
- **Why here:** Documents, source versions and ownership need a durable relational model before embedding indexes are added.
- **Practical activity:** Design users, documents and chunks tables with tenant ownership and source-version references; test a foreign-key failure and a deletion rule.
- **Finished when:** A cross-tenant lookup cannot bypass the ownership filter Deletion behavior is demonstrated on a local fixture
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to Data Science Fundamentals. Use the linked project milestone to connect these skills. [Data Science Fundamentals (4.1)](http://localhost:3003/learn/data-science-fundamentals)

#### postgres-reference-7.3

- **Phase/topic:** 07 — Backend & AI Engineering; [Backend Architecture (7.3)](http://localhost:3003/learn/backend-architecture). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Return to transaction and application-interface sections during Backend Architecture in Phase 07 after a working FastAPI route.
- **Prerequisites:** [Database Engineering with PostgreSQL (3.2)](http://localhost:3003/learn/database-engineering-with-postgresql); [FastAPI (7.2)](http://localhost:3003/learn/fastapi)
- **Read in order:** Transactions → Application interfaces overview → Connection management concepts → Constraints and error handling.
- **Learn:** Keep a business operation atomic Place connection and transaction ownership explicitly
- **Why here:** A repository boundary must preserve database correctness when requests fail; the source supports persistence behavior rather than the whole backend architecture.
- **Practical activity:** Implement or sketch one transaction-backed document repository and test a failed multi-step write using the topic's selected Python driver.
- **Finished when:** A failure rolls back the partial write The test identifies its driver and isolation assumptions
- **Project connection:** [ML Prediction API](http://localhost:3003/projects/ml-prediction-api); [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to AI Provider Integration. Use the linked project milestone to connect these skills. [AI Provider Integration (7.4)](http://localhost:3003/learn/ai-provider-integration)

Selected precise official guides: [Phase 03: Indexes](https://www.postgresql.org/docs/current/indexes.html); [Phase 03: Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html).

### 21. NumPy User Guide

Stable ID: `numpy`. Original resource retained. Priority: **CORE**. [Official source](https://numpy.org/doc/stable/user/). **C1–C12: PASS.** One resource/bookmark key `resource:numpy`; 3 distinct visit(s).

Corrections to learning moments: `numpy-reference-2.6` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### numpy-visit-2.5-1

- **Phase/topic:** 02 — Mathematics & Problem Solving; [Linear Algebra (2.5)](http://localhost:3003/learn/linear-algebra). Stage: OPTIONAL REFERENCE.
- **Open when:** Use only tiny array examples to verify hand calculations during Linear Algebra in Phase 02; study the wider NumPy workflow later in Phase 04.
- **Prerequisites:** [Functions and Modular Programming (1.2)](http://localhost:3003/learn/functions-and-modular-programming); [Basic Mathematics (2.1)](http://localhost:3003/learn/basic-mathematics)
- **Read in order:** Creating tiny arrays → Shapes → Dot products → Matrix multiplication.
- **Learn:** Check tensor/array dimensions Explain a vectorized computation
- **Why here:** Small numerical checks connect matrix dimensions to executable operations without making the whole library a mathematics prerequisite.
- **Practical activity:** Verify one hand-computed vector dot product and matrix multiplication using tiny arrays.
- **Finished when:** Show matching expected and computed values. Explain the shapes and any incompatible multiplication.
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction).
- **Next:** After the exercise, continue to Calculus and Optimization. Use the linked project milestone to connect these skills. [Calculus and Optimization (2.6)](http://localhost:3003/learn/calculus-and-optimization)

#### numpy-reference-2.6

- **Phase/topic:** 02 — Mathematics & Problem Solving; [Calculus and Optimization (2.6)](http://localhost:3003/learn/calculus-and-optimization). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Use tiny NumPy arrays to check calculations during Calculus and Optimization in Phase 02 after matrix shapes.
- **Prerequisites:** [Functions and Modular Programming (1.2)](http://localhost:3003/learn/functions-and-modular-programming); [Linear Algebra (2.5)](http://localhost:3003/learn/linear-algebra)
- **Read in order:** Array creation and dtypes → Elementwise operations → Broadcasting → Reductions.
- **Learn:** Use shapes and reductions consistently Distinguish a numerical estimate from an analytic derivative
- **Why here:** Vectorized numerical examples can check a derivative estimate, but the derivative and optimization reasoning belong to the mathematics lesson.
- **Practical activity:** Evaluate a quadratic loss at nearby parameter values, compare its finite-difference slope with the hand derivative and perform one update.
- **Finished when:** Hand and numerical slopes approximately agree The result states epsilon, dtype and step size
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction).
- **Next:** After the exercise, continue to Information Theory Basics. Use the linked project milestone to connect these skills. [Information Theory Basics (2.7)](http://localhost:3003/learn/information-theory-basics)

#### numpy-primary — primary placement

- **Phase/topic:** 04 — Data Science & Machine Learning; [Data Science Fundamentals (4.1)](http://localhost:3003/learn/data-science-fundamentals). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open at the start of Data Science Fundamentals in Phase 04 after Python functions and basic vectors/matrices from Phase 02.
- **Prerequisites:** [Python Setup and Fundamentals (1.1)](http://localhost:3003/learn/python-setup-and-fundamentals); [Functions and Modular Programming (1.2)](http://localhost:3003/learn/functions-and-modular-programming); [Linear Algebra (2.5)](http://localhost:3003/learn/linear-algebra)
- **Read in order:** Array creation → Shapes and dtypes → Indexing → Broadcasting → Vectorized operations → Reductions.
- **Learn:** Check tensor/array dimensions Explain a vectorized computation
- **Why here:** Array shapes and numerical operations now connect familiar mathematical objects to executable data processing.
- **Practical activity:** Load a tiny numerical dataset, compute summaries and a dot product, and compare a loop with a vectorized implementation.
- **Finished when:** Shapes and expected values are correct Explain broadcasting and one numerical limitation
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction).
- **Next:** After the exercise, continue to Machine Learning Fundamentals. Use the linked project milestone to connect these skills. [Machine Learning Fundamentals (4.2)](http://localhost:3003/learn/machine-learning-fundamentals)

### 22. Getting Started with Pandas

Stable ID: `pandas`. Original resource retained. Priority: **CORE**. [Official source](https://pandas.pydata.org/docs/getting_started/). **C1–C12: PASS.** One resource/bookmark key `resource:pandas`; 2 distinct visit(s).

Reviewed: no learning-moment content correction was required. Resource identity, link targets and classification passed.

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### pandas-visit-3.4-1

- **Phase/topic:** 03 — Software, Data & Databases; [Data Engineering Fundamentals (3.4)](http://localhost:3003/learn/data-engineering-fundamentals). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Use the ingestion and validation sections during Data Engineering Fundamentals in Phase 03. Return to broader analysis after NumPy in Phase 04.
- **Prerequisites:** [Advanced Python (1.4)](http://localhost:3003/learn/advanced-python); [Database Engineering with PostgreSQL (3.2)](http://localhost:3003/learn/database-engineering-with-postgresql)
- **Read in order:** Reading CSV/JSON → Inspecting dtypes → Missing values and duplicates → Validation and row counts → Writing a processed dataset.
- **Learn:** Inspect dataset quality Create a reproducible cleaning procedure
- **Why here:** A repeatable data pipeline needs explicit schemas and row-count checks before it needs advanced analysis.
- **Practical activity:** Build a small validated CSV transformation that quarantines malformed rows and records input/output counts.
- **Finished when:** The pipeline is rerunnable. Rejected rows and validation rules are documented.
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction).
- **Next:** After the exercise, continue to Data Modeling and Storage for AI. Use the linked project milestone to connect these skills. [Data Modeling and Storage for AI (3.5)](http://localhost:3003/learn/data-modeling-and-storage-for-ai)

#### pandas-primary — primary placement

- **Phase/topic:** 04 — Data Science & Machine Learning; [Data Science Fundamentals (4.1)](http://localhost:3003/learn/data-science-fundamentals). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open after the NumPy array lessons within Data Science Fundamentals in Phase 04. Use a small dataset before exploring large analytical workflows.
- **Prerequisites:** [Functions and Modular Programming (1.2)](http://localhost:3003/learn/functions-and-modular-programming); [Advanced Python (1.4)](http://localhost:3003/learn/advanced-python); [Statistics (2.3)](http://localhost:3003/learn/statistics)
- **Read in order:** Series and DataFrames → Loading data → Inspection and dtypes → Missing values and duplicates → Grouping → Transformations and joins.
- **Learn:** Inspect dataset quality Create a reproducible cleaning procedure
- **Why here:** You can reason about array values and now need labeled columns, missingness and reproducible transformations.
- **Practical activity:** Clean a real small dataset, document each rule and produce a grouped summary with row-count checks.
- **Finished when:** Explain every removed or transformed record category The notebook reruns from the raw data with the same result
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction).
- **Next:** After the exercise, continue to Machine Learning Fundamentals. Use the linked project milestone to connect these skills. [Machine Learning Fundamentals (4.2)](http://localhost:3003/learn/machine-learning-fundamentals)

### 23. Scikit-learn User Guide

Stable ID: `sklearn`. Original resource retained. Priority: **CORE**. [Official source](https://scikit-learn.org/stable/user_guide.html). **C1–C12: PASS.** One resource/bookmark key `resource:sklearn`; 5 distinct visit(s).

Corrections to learning moments: `sklearn-primary` (focusSections, practicalTask, completionCriteria); `sklearn-reference-4.3` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId); `sklearn-reference-4.4` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId); `sklearn-reference-4.5` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId); `sklearn-reference-4.6` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### sklearn-primary — primary placement

- **Phase/topic:** 04 — Data Science & Machine Learning; [Machine Learning Fundamentals (4.2)](http://localhost:3003/learn/machine-learning-fundamentals). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during Machine Learning Fundamentals in Phase 04 after basic statistics, probability and the NumPy/Pandas/EDA lessons.
- **Prerequisites:** [Functions and Modular Programming (1.2)](http://localhost:3003/learn/functions-and-modular-programming); [Statistics (2.3)](http://localhost:3003/learn/statistics); [Probability (2.4)](http://localhost:3003/learn/probability); [Data Science Fundamentals (4.1)](http://localhost:3003/learn/data-science-fundamentals)
- **Read in order:** Getting started: estimator interface → Train/test split → Basic preprocessing → A simple supervised baseline → Predict and inspect errors.
- **Learn:** Prevent leakage Compare models under a consistent validation procedure
- **Why here:** You have a cleaned dataset and can interpret a metric, so fitting an estimator can become a controlled experiment.
- **Practical activity:** Fit one simple baseline with a preprocessing step and a held-out split, make predictions and inspect one error. Compare estimator families, cross-validation and search in the later matching topics.
- **Finished when:** Preprocessing is fit on training data only The saved split and one held-out error are explained
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction); [ML Prediction API](http://localhost:3003/projects/ml-prediction-api).
- **Next:** After the exercise, continue to Supervised Learning Algorithms. Use the linked project milestone to connect these skills. [Supervised Learning Algorithms (4.3)](http://localhost:3003/learn/supervised-learning-algorithms)

#### sklearn-reference-4.3

- **Phase/topic:** 04 — Data Science & Machine Learning; [Supervised Learning Algorithms (4.3)](http://localhost:3003/learn/supervised-learning-algorithms). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Read selected supervised-estimator guides during Supervised Learning in Phase 04 after the estimator interface and data preparation.
- **Prerequisites:** [Data Science Fundamentals (4.1)](http://localhost:3003/learn/data-science-fundamentals); [Machine Learning Fundamentals (4.2)](http://localhost:3003/learn/machine-learning-fundamentals)
- **Read in order:** Linear models → Decision trees → Random forests → Preprocessing pipelines → Cross-validation basics.
- **Learn:** Connect estimator assumptions to a task Keep model comparisons leakage-free
- **Why here:** You can now compare model assumptions instead of merely learning fit and predict syntax.
- **Practical activity:** Compare a linear model, tree and forest on the same split and preprocessing, reporting one relevant held-out metric and error pattern.
- **Finished when:** All candidates use the same held-out cases Explain one error pattern and a model trade-off
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction); [ML Prediction API](http://localhost:3003/projects/ml-prediction-api).
- **Next:** After the exercise, continue to Unsupervised Learning. Use the linked project milestone to connect these skills. [Unsupervised Learning (4.4)](http://localhost:3003/learn/unsupervised-learning)

#### sklearn-reference-4.4

- **Phase/topic:** 04 — Data Science & Machine Learning; [Unsupervised Learning (4.4)](http://localhost:3003/learn/unsupervised-learning). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Read clustering and PCA guides during Unsupervised Learning in Phase 04 after the estimator interface and scaling.
- **Prerequisites:** [Data Science Fundamentals (4.1)](http://localhost:3003/learn/data-science-fundamentals); [Machine Learning Fundamentals (4.2)](http://localhost:3003/learn/machine-learning-fundamentals); [Supervised Learning Algorithms (4.3)](http://localhost:3003/learn/supervised-learning-algorithms)
- **Read in order:** Clustering: K-means → Clustering: DBSCAN → Decomposition: PCA → Scaling → Clustering evaluation limits.
- **Learn:** Interpret clustering without invented ground truth Explain how scaling affects distances
- **Why here:** Unlabeled structure needs different interpretation from supervised accuracy; cluster IDs are not known semantic labels.
- **Practical activity:** Scale a small dataset, compare K-means and DBSCAN and inspect a PCA projection with clearly stated evaluation limits.
- **Finished when:** Record parameters and a noise/outlier example Avoid treating cluster numbers as meaningful categories
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction).
- **Next:** After the exercise, continue to Model Evaluation. Use the linked project milestone to connect these skills. [Model Evaluation (4.5)](http://localhost:3003/learn/model-evaluation)

#### sklearn-reference-4.5

- **Phase/topic:** 04 — Data Science & Machine Learning; [Model Evaluation (4.5)](http://localhost:3003/learn/model-evaluation). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Read the metrics and validation guides during Model Evaluation in Phase 04 after fitting initial models.
- **Prerequisites:** [Data Science Fundamentals (4.1)](http://localhost:3003/learn/data-science-fundamentals); [Machine Learning Fundamentals (4.2)](http://localhost:3003/learn/machine-learning-fundamentals); [Supervised Learning Algorithms (4.3)](http://localhost:3003/learn/supervised-learning-algorithms); [Unsupervised Learning (4.4)](http://localhost:3003/learn/unsupervised-learning)
- **Read in order:** Model evaluation: classification metrics → Confusion matrix → Precision, recall and F scores → Cross-validation → Threshold interpretation.
- **Learn:** Relate metric changes to false positives and negatives Keep threshold selection separate from final test evaluation
- **Why here:** A fitted model gives each metric a concrete mistake pattern; this is the point to assess what a headline score hides.
- **Practical activity:** Compute a tiny confusion matrix by hand, check it with scikit-learn and compare two decision thresholds on held-out examples.
- **Finished when:** Hand and library counts agree Explain the chosen operating threshold and one subgroup limitation
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction); [ML Prediction API](http://localhost:3003/projects/ml-prediction-api).
- **Next:** After the exercise, continue to Model Training and Improvement. Use the linked project milestone to connect these skills. [Model Training and Improvement (4.6)](http://localhost:3003/learn/model-training-and-improvement)

#### sklearn-reference-4.6

- **Phase/topic:** 04 — Data Science & Machine Learning; [Model Training and Improvement (4.6)](http://localhost:3003/learn/model-training-and-improvement). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Read pipeline, search and reproducibility guidance during Model Training and Improvement in Phase 04 after evaluation fundamentals.
- **Prerequisites:** [Data Science Fundamentals (4.1)](http://localhost:3003/learn/data-science-fundamentals); [Machine Learning Fundamentals (4.2)](http://localhost:3003/learn/machine-learning-fundamentals); [Model Evaluation (4.5)](http://localhost:3003/learn/model-evaluation)
- **Read in order:** Pipeline and ColumnTransformer → Hyperparameter search → Cross-validation → Common pitfalls and data leakage → Model persistence and trust boundaries.
- **Learn:** Avoid preprocessing leakage during search Preserve training/inference transformations
- **Why here:** A controlled search must fit preprocessing only on training folds and preserve the same inference transformations.
- **Practical activity:** Compare a small hyperparameter search with a baseline in a Pipeline, log settings and save the complete trusted inference pipeline.
- **Finished when:** The search space and validation method are recorded Reloading the trusted artifact reproduces predictions
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction); [ML Prediction API](http://localhost:3003/projects/ml-prediction-api).
- **Next:** After the exercise, continue to Deep Learning Fundamentals. Use the linked project milestone to connect these skills. [Deep Learning Fundamentals (5.1)](http://localhost:3003/learn/deep-learning-fundamentals)

### 24. Learn PyTorch

Stable ID: `pytorch`. Original resource retained. Priority: **CORE**. [Official source](https://pytorch.org/tutorials/). **C1–C12: PASS.** One resource/bookmark key `resource:pytorch`; 4 distinct visit(s).

Corrections to learning moments: `pytorch-reference-5.3` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId); `pytorch-reference-5.4` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId); `pytorch-reference-6.3` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### pytorch-primary — primary placement

- **Phase/topic:** 05 — Deep Learning & PyTorch; [PyTorch (5.2)](http://localhost:3003/learn/pytorch). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during PyTorch in Phase 05 after Linear Algebra, basic Calculus, Machine Learning Fundamentals and Deep Learning Fundamentals.
- **Prerequisites:** [Linear Algebra (2.5)](http://localhost:3003/learn/linear-algebra); [Calculus and Optimization (2.6)](http://localhost:3003/learn/calculus-and-optimization); [Machine Learning Fundamentals (4.2)](http://localhost:3003/learn/machine-learning-fundamentals); [Deep Learning Fundamentals (5.1)](http://localhost:3003/learn/deep-learning-fundamentals) Previous lessons: [Training and validation (5.1.24)](http://localhost:3003/learn/deep-learning-fundamentals#5.1.24).
- **Read in order:** Tensors → Tensor shapes and operations → Automatic differentiation and autograd → Neural network modules → Loss functions → Optimizers → Training and evaluation loops → Saving and loading weights.
- **Learn:** Trace gradients and tensor shapes Implement and verify a training loop
- **Why here:** The earlier maths and loss concepts explain what tensor operations and gradients mean, rather than leaving a training loop as unexplained boilerplate.
- **Practical activity:** Train a small classifier, inspect loss, save weights, reload the model and compare evaluation predictions.
- **Finished when:** A tiny batch produces the expected shapes Reloaded evaluation predictions agree with the saved model
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction); [ML Prediction API](http://localhost:3003/projects/ml-prediction-api).
- **Next:** After the exercise, continue to Deep Learning Architectures. Use the linked project milestone to connect these skills. [Deep Learning Architectures (5.3)](http://localhost:3003/learn/deep-learning-architectures)

#### pytorch-reference-5.3

- **Phase/topic:** 05 — Deep Learning & PyTorch; [Deep Learning Architectures (5.3)](http://localhost:3003/learn/deep-learning-architectures). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Revisit network modules and architecture examples during Neural Network Architectures in Phase 05 after the first PyTorch training loop.
- **Prerequisites:** [Linear Algebra (2.5)](http://localhost:3003/learn/linear-algebra); [Deep Learning Fundamentals (5.1)](http://localhost:3003/learn/deep-learning-fundamentals); [PyTorch (5.2)](http://localhost:3003/learn/pytorch)
- **Read in order:** Neural networks tutorial → Convolutional networks → Data loading → Training/evaluation mode → Saving model weights.
- **Learn:** Trace shapes through different layer types Separate training mode from evaluation mode
- **Why here:** Tensor operations now support an architectural comparison; repeating only the tensor introduction would not explain the new layer choices.
- **Practical activity:** Compare a tiny fully connected model and CNN on the same small image fixture, tracing shapes and evaluation behavior.
- **Finished when:** Inputs and outputs have documented shapes A measured comparison uses the same fixture and metric
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction); [ML Prediction API](http://localhost:3003/projects/ml-prediction-api).
- **Next:** After the exercise, continue to GPU and Model Training Fundamentals. Use the linked project milestone to connect these skills. [GPU and Model Training Fundamentals (5.4)](http://localhost:3003/learn/gpu-and-model-training-fundamentals)

#### pytorch-reference-5.4

- **Phase/topic:** 05 — Deep Learning & PyTorch; [GPU and Model Training Fundamentals (5.4)](http://localhost:3003/learn/gpu-and-model-training-fundamentals). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Read device and transfer tutorials during GPU and Model Training Fundamentals in Phase 05 after tensor and architecture practice.
- **Prerequisites:** [Linear Algebra (2.5)](http://localhost:3003/learn/linear-algebra); [PyTorch (5.2)](http://localhost:3003/learn/pytorch); [Deep Learning Architectures (5.3)](http://localhost:3003/learn/deep-learning-architectures)
- **Read in order:** Moving tensors between devices → Pinned memory and non-blocking transfers → Performance measurement → Mixed precision introduction.
- **Learn:** Separate compute time from data-transfer time State precision and memory assumptions
- **Why here:** Memory placement and transfers explain throughput bottlenecks; compatible hardware is optional for the conceptual work.
- **Practical activity:** Estimate parameter/gradient memory and measure a small available-device workload with synchronized timing, or annotate supplied timings if no GPU is available.
- **Finished when:** The report identifies actual versus reference-only results No unsupported speed claim is made without the device and workload
- **Project connection:** [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Natural Language Processing. Use the linked project milestone to connect these skills. [Natural Language Processing (6.1)](http://localhost:3003/learn/natural-language-processing)

#### pytorch-reference-6.3

- **Phase/topic:** 06 — NLP, Transformers & LLMs; [Transformer Architecture (6.3)](http://localhost:3003/learn/transformer-architecture). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open the attention tutorial during Transformer Architecture in Phase 06 after the topic's attention equations and the PyTorch basics.
- **Prerequisites:** [Linear Algebra (2.5)](http://localhost:3003/learn/linear-algebra); [PyTorch (5.2)](http://localhost:3003/learn/pytorch); [Language Model Fundamentals (6.2)](http://localhost:3003/learn/language-model-fundamentals)
- **Read in order:** Scaled dot-product attention tutorial → Tensor shapes → Masking → Reference attention calculation.
- **Learn:** Connect attention equations to tensor dimensions Explain why future-token masking matters
- **Why here:** Small matrices let you verify the attention operation before adding an entire pretrained model.
- **Practical activity:** Implement a tiny attention calculation and causal mask, then compare valid shapes and one masked output with the reference explanation.
- **Finished when:** The causal mask blocks the intended positions The comparison records input shapes and tolerance
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to LLM Internals. Use the linked project milestone to connect these skills. [LLM Internals (6.4)](http://localhost:3003/learn/llm-internals)

### 25. The Hugging Face LLM Course

Stable ID: `huggingface`. Original resource retained. Priority: **CORE**. [Official source](https://huggingface.co/learn/llm-course/chapter1/1). **C1–C12: PASS.** One resource/bookmark key `resource:huggingface`; 12 distinct visit(s).

Corrections to learning moments: `huggingface-reference-6.3` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId); `huggingface-reference-6.4` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId); `huggingface-reference-6.5` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId, advanced); `huggingface-reference-7.4` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId); `huggingface-reference-7.5` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId); `huggingface-reference-8.1` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId); `huggingface-reference-8.3` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId); `huggingface-reference-8.4` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId, advanced); `huggingface-reference-11.2` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId, advanced); `huggingface-reference-11.3` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId, advanced).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### huggingface-visit-6.2-1

- **Phase/topic:** 06 — NLP, Transformers & LLMs; [Language Model Fundamentals (6.2)](http://localhost:3003/learn/language-model-fundamentals). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open selected introductory course sections after NLP fundamentals, while studying Language Model Fundamentals in Phase 06. Return for full model-loading and ecosystem practice in 6.6.
- **Prerequisites:** [Advanced Python (1.4)](http://localhost:3003/learn/advanced-python); [PyTorch (5.2)](http://localhost:3003/learn/pytorch); [Natural Language Processing (6.1)](http://localhost:3003/learn/natural-language-processing)
- **Read in order:** What transformers can do → Tokenizer examples → Model input/output overview → Small inference walkthrough.
- **Learn:** Load compatible model/tokenizer revisions Interpret context limits and model-card constraints
- **Why here:** Token examples provide a bridge from NLP representations to language-model behavior before advanced adaptation.
- **Practical activity:** Inspect token IDs for a few sentences and trace a small CPU-compatible inference or supplied sample response.
- **Finished when:** Explain why tokens do not map one-to-one to words. Record the model/tokenizer choice and a context limitation.
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [Graph RAG Knowledge Assistant](http://localhost:3003/projects/graph-rag-knowledge-assistant); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to Transformer Architecture. Use the linked project milestone to connect these skills. [Transformer Architecture (6.3)](http://localhost:3003/learn/transformer-architecture)

#### huggingface-reference-6.3

- **Phase/topic:** 06 — NLP, Transformers & LLMs; [Transformer Architecture (6.3)](http://localhost:3003/learn/transformer-architecture). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Read the transformer overview sections during Transformer Architecture in Phase 06 after basic language-model concepts.
- **Prerequisites:** [PyTorch (5.2)](http://localhost:3003/learn/pytorch); [Natural Language Processing (6.1)](http://localhost:3003/learn/natural-language-processing); [Language Model Fundamentals (6.2)](http://localhost:3003/learn/language-model-fundamentals)
- **Read in order:** Chapter 1: How Transformers work → Transformer architectures → Chapter 2: model inputs and tokenization.
- **Learn:** Distinguish transformer families Explain the tokenizer/model input boundary
- **Why here:** The course connects tokenization and pretrained model families to the architecture lesson; the low-level attention exercise uses the PyTorch resource.
- **Practical activity:** Compare encoder, decoder and encoder-decoder use cases and trace token IDs into one selected model's input contract.
- **Finished when:** Each family has a justified task example The trace labels token and hidden-state shapes without claiming to train a full model
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to LLM Internals. Use the linked project milestone to connect these skills. [LLM Internals (6.4)](http://localhost:3003/learn/llm-internals)

#### huggingface-reference-6.4

- **Phase/topic:** 06 — NLP, Transformers & LLMs; [LLM Internals (6.4)](http://localhost:3003/learn/llm-internals). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Revisit inference and tokenization material during LLM Internals in Phase 06 after the transformer overview.
- **Prerequisites:** [PyTorch (5.2)](http://localhost:3003/learn/pytorch); [Language Model Fundamentals (6.2)](http://localhost:3003/learn/language-model-fundamentals); [Transformer Architecture (6.3)](http://localhost:3003/learn/transformer-architecture)
- **Read in order:** Chapter 1: inference with LLMs → Chapter 2: tokenization and model inputs → Model outputs and limitations.
- **Learn:** Separate tokenization from generation Interpret a model output without assuming factual correctness
- **Why here:** Concrete token inputs and outputs make inference/context behavior inspectable; advanced serving optimization is a later resource.
- **Practical activity:** Trace a short inference example with fixed settings and compare input token count, output length and a documented context limit using a small model or supplied trace.
- **Finished when:** The model/tokenizer and settings are identified A context or generation limitation is documented
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to Prompt Engineering and Context Design. Use the linked project milestone to connect these skills. [Prompt Engineering and Context Design (6.7)](http://localhost:3003/learn/prompt-engineering-and-context-design)

#### huggingface-reference-6.5

- **Phase/topic:** 06 — NLP, Transformers & LLMs; [LLM Training and Adaptation (6.5)](http://localhost:3003/learn/llm-training-and-adaptation). Stage: ADVANCED — RETURN LATER.
- **Open when:** Read the fine-tuning introduction during LLM Training and Adaptation in Phase 06 after LLM Internals and prompt/context design.
- **Prerequisites:** [PyTorch (5.2)](http://localhost:3003/learn/pytorch); [LLM Internals (6.4)](http://localhost:3003/learn/llm-internals); [Prompt Engineering and Context Design (6.7)](http://localhost:3003/learn/prompt-engineering-and-context-design)
- **Read in order:** Chapter 3: fine-tuning a pretrained model → Datasets library → Training and evaluation split → Advanced LLM fine-tuning as a later subset.
- **Learn:** Distinguish prompting from weight updates Prevent evaluation examples from leaking into adaptation
- **Why here:** A prompt-only baseline gives you something to compare against adaptation; the advanced course chapters are optional extensions.
- **Practical activity:** Prepare a tiny licensed dataset and disjoint evaluation set, then compare a prompt-only baseline with a small adaptation plan or CPU-feasible example.
- **Finished when:** The data split and license are explicit The report states cost, overfitting risk and whether training actually ran
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to Hugging Face Ecosystem. Use the linked project milestone to connect these skills. [Hugging Face Ecosystem (6.6)](http://localhost:3003/learn/hugging-face-ecosystem)

#### huggingface-primary — primary placement

- **Phase/topic:** 06 — NLP, Transformers & LLMs; [Hugging Face Ecosystem (6.6)](http://localhost:3003/learn/hugging-face-ecosystem). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open the relevant course material after NLP and language-model fundamentals in Phase 06; use the full ecosystem walkthrough during Hugging Face Ecosystem.
- **Prerequisites:** [Advanced Python (1.4)](http://localhost:3003/learn/advanced-python); [PyTorch (5.2)](http://localhost:3003/learn/pytorch); [Natural Language Processing (6.1)](http://localhost:3003/learn/natural-language-processing); [Language Model Fundamentals (6.2)](http://localhost:3003/learn/language-model-fundamentals); [LLM Internals (6.4)](http://localhost:3003/learn/llm-internals)
- **Read in order:** Tokenizer and token IDs → Transformer concepts → Loading models → Datasets → Model cards and licensing → Inference → Optional fine-tuning overview.
- **Learn:** Load compatible model/tokenizer revisions Interpret context limits and model-card constraints
- **Why here:** You understand what tokens and inference are and can now judge whether a selected model and its license fit a small application.
- **Practical activity:** Load a small pretrained tokenizer or CPU-compatible model, inspect token IDs and run a fixed inference example with recorded settings.
- **Finished when:** Record the exact model revision and license Explain input/output shapes and one model limitation
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [Graph RAG Knowledge Assistant](http://localhost:3003/projects/graph-rag-knowledge-assistant); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to API Engineering. Use the linked project milestone to connect these skills. [API Engineering (7.1)](http://localhost:3003/learn/api-engineering)

#### huggingface-reference-7.4

- **Phase/topic:** 07 — Backend & AI Engineering; [AI Provider Integration (7.4)](http://localhost:3003/learn/ai-provider-integration). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Revisit only local model/tokenizer interface examples during AI Provider Integration in Phase 07 after the Hugging Face ecosystem topic.
- **Prerequisites:** [LLM Internals (6.4)](http://localhost:3003/learn/llm-internals); [Hugging Face Ecosystem (6.6)](http://localhost:3003/learn/hugging-face-ecosystem); [Backend Architecture (7.3)](http://localhost:3003/learn/backend-architecture)
- **Read in order:** Chapter 2: loading models and tokenizers → Model input/output objects → Inference examples → Model cards and limitations.
- **Learn:** Separate a local model adapter from a hosted-provider API Normalize an output contract
- **Why here:** A known input/output contract helps isolate one local adapter; commercial API authentication, retries and provider billing use their own provider guides.
- **Practical activity:** Wrap a tiny local or mocked Hugging Face inference call behind the CCAI adapter interface and normalize its output without exposing implementation details.
- **Finished when:** The adapter is testable with supplied responses The note identifies which hosted-provider behaviors this course does not cover
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to Token and Cost Engineering. Use the linked project milestone to connect these skills. [Token and Cost Engineering (7.5)](http://localhost:3003/learn/token-and-cost-engineering)

#### huggingface-reference-7.5

- **Phase/topic:** 07 — Backend & AI Engineering; [Token and Cost Engineering (7.5)](http://localhost:3003/learn/token-and-cost-engineering). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Reopen tokenization and truncation sections during Token and Cost Engineering in Phase 07 after provider integration.
- **Prerequisites:** [LLM Internals (6.4)](http://localhost:3003/learn/llm-internals); [Hugging Face Ecosystem (6.6)](http://localhost:3003/learn/hugging-face-ecosystem); [AI Provider Integration (7.4)](http://localhost:3003/learn/ai-provider-integration)
- **Read in order:** Tokenizers library introduction → Token IDs and lengths → Truncation and padding → Model context limitations.
- **Learn:** Explain tokenizer-dependent length Distinguish estimated usage from billed usage
- **Why here:** The tokenizer supports length estimation; the course is not a current price list or a guarantee of another provider's billing tokenizer.
- **Practical activity:** Count tokens for several inputs with one identified tokenizer, reserve output capacity and compare a truncation policy. Keep provider prices and billing counts separately configurable.
- **Finished when:** The tokenizer and context budget are recorded The estimate is not presented as an exact unrelated provider charge
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to AI Backend Reliability. Use the linked project milestone to connect these skills. [AI Backend Reliability (7.6)](http://localhost:3003/learn/ai-backend-reliability)

#### huggingface-reference-8.1

- **Phase/topic:** 08 — RAG, Agents & Knowledge; [Embeddings and Vector Search (8.1)](http://localhost:3003/learn/embeddings-and-vector-search). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Read the semantic-search worked example during Embeddings and Vector Search in Phase 08 after linear algebra and model/tokenizer fundamentals.
- **Prerequisites:** [Linear Algebra (2.5)](http://localhost:3003/learn/linear-algebra); [Language Model Fundamentals (6.2)](http://localhost:3003/learn/language-model-fundamentals); [Hugging Face Ecosystem (6.6)](http://localhost:3003/learn/hugging-face-ecosystem)
- **Read in order:** Course: semantic search with FAISS → Embeddings and pooling → Dataset preparation → Model and tokenizer selection.
- **Learn:** Distinguish retrieval embeddings from arbitrary token hidden states Keep one model and dimension convention
- **Why here:** The course provides an executable embedding/search example; storage, tenant filtering and pgvector operators belong to their respective resources.
- **Practical activity:** Inspect the example's embedding model and pooling, embed a tiny corpus and test two queries with known relevant results.
- **Finished when:** Record the embedding model and vector shape Inspect a failed query instead of assuming all embeddings are comparable
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [Graph RAG Knowledge Assistant](http://localhost:3003/projects/graph-rag-knowledge-assistant).
- **Next:** After the exercise, continue to Vector Databases. Use the linked project milestone to connect these skills. [Vector Databases (8.2)](http://localhost:3003/learn/vector-databases)

#### huggingface-reference-8.3

- **Phase/topic:** 08 — RAG, Agents & Knowledge; [Traditional RAG (8.3)](http://localhost:3003/learn/traditional-rag). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Revisit the embedding/search and input-preparation examples while building Traditional RAG in Phase 08 after a vector-search baseline.
- **Prerequisites:** [Hugging Face Ecosystem (6.6)](http://localhost:3003/learn/hugging-face-ecosystem); [Embeddings and Vector Search (8.1)](http://localhost:3003/learn/embeddings-and-vector-search); [Vector Databases (8.2)](http://localhost:3003/learn/vector-databases)
- **Read in order:** Semantic search with FAISS worked example → Dataset rows and source metadata → Tokenization and truncation → Model input/output limitations.
- **Learn:** Keep source identity through preprocessing Distinguish a retriever result from a supported generated answer
- **Why here:** This source supports the embedding and context-input parts of RAG; document authorization, vector SQL and evaluation need the other roadmap resources.
- **Practical activity:** Preserve source IDs while preparing a tiny embedding dataset, inspect the retrieved rows for two queries and ensure the chosen context fits the tokenizer budget.
- **Finished when:** Retrieved rows can be traced to original sources The report identifies an unanswerable or missing-evidence case
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [Graph RAG Knowledge Assistant](http://localhost:3003/projects/graph-rag-knowledge-assistant).
- **Next:** After the exercise, continue to Advanced RAG. Use the linked project milestone to connect these skills. [Advanced RAG (8.4)](http://localhost:3003/learn/advanced-rag)

#### huggingface-reference-8.4

- **Phase/topic:** 08 — RAG, Agents & Knowledge; [Advanced RAG (8.4)](http://localhost:3003/learn/advanced-rag). Stage: ADVANCED — RETURN LATER.
- **Open when:** Use the course's search/data-preparation sections as a supporting reference during Advanced RAG in Phase 08, after measuring the basic RAG baseline.
- **Prerequisites:** [Hugging Face Ecosystem (6.6)](http://localhost:3003/learn/hugging-face-ecosystem); [Embeddings and Vector Search (8.1)](http://localhost:3003/learn/embeddings-and-vector-search); [Traditional RAG (8.3)](http://localhost:3003/learn/traditional-rag)
- **Read in order:** Semantic-search example → Dataset filtering and mapping → Tokenizer truncation → Model choice and input limits.
- **Learn:** Control one preprocessing change Explain the source's limits for advanced retrieval design
- **Why here:** A preprocessing or embedding change can alter retrieval, but this course is not a complete hybrid/reranking architecture manual.
- **Practical activity:** Change one dataset or embedding-preparation choice and compare retrieved source IDs on fixed questions; use the separate pgvector/evaluation guidance for indexed retrieval and answer scores.
- **Finished when:** The before/after cases and source IDs are retained No unsupported claim about end-to-end RAG quality is based only on vector similarity
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [Graph RAG Knowledge Assistant](http://localhost:3003/projects/graph-rag-knowledge-assistant).
- **Next:** After the exercise, continue to Graph Theory and Knowledge Graphs. Use the linked project milestone to connect these skills. [Graph Theory and Knowledge Graphs (8.5)](http://localhost:3003/learn/graph-theory-and-knowledge-graphs)

#### huggingface-reference-11.2

- **Phase/topic:** 11 — Advanced AI Architecture; [Intelligent Model Routing (11.2)](http://localhost:3003/learn/intelligent-model-routing). Stage: ADVANCED — RETURN LATER.
- **Open when:** Revisit model-family and context-limit material during Intelligent Model Routing in Phase 11 after provider adapters and evaluation.
- **Prerequisites:** [Hugging Face Ecosystem (6.6)](http://localhost:3003/learn/hugging-face-ecosystem); [AI Provider Integration (7.4)](http://localhost:3003/learn/ai-provider-integration); [AI and LLM Evaluation (10.4)](http://localhost:3003/learn/ai-and-llm-evaluation); [AI System Architecture (11.1)](http://localhost:3003/learn/ai-system-architecture)
- **Read in order:** Transformer model families → Model cards and limitations → Tokenization and context limits → Fixed inference examples.
- **Learn:** Distinguish declared capability from measured suitability Keep tokenizer/context assumptions per model
- **Why here:** Model descriptions inform a capability registry, but routing policy, pricing and availability must be measured or configured elsewhere.
- **Practical activity:** Record input limits and task suitability for two candidate models in CCAI's registry, separating documented claims from your own fixed-input evaluation.
- **Finished when:** Every registry claim has a source or labeled measurement A fallback rule is justified independently of model popularity
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to Model Serving and Inference Optimization. Use the linked project milestone to connect these skills. [Model Serving and Inference Optimization (11.3)](http://localhost:3003/learn/model-serving-and-inference-optimization)

#### huggingface-reference-11.3

- **Phase/topic:** 11 — Advanced AI Architecture; [Model Serving and Inference Optimization (11.3)](http://localhost:3003/learn/model-serving-and-inference-optimization). Stage: ADVANCED — RETURN LATER.
- **Open when:** Use the course only to prepare a reproducible single-model inference baseline during Phase 11 Model Serving and Inference Optimization, before comparing a serving engine.
- **Prerequisites:** [GPU and Model Training Fundamentals (5.4)](http://localhost:3003/learn/gpu-and-model-training-fundamentals); [LLM Internals (6.4)](http://localhost:3003/learn/llm-internals); [Hugging Face Ecosystem (6.6)](http://localhost:3003/learn/hugging-face-ecosystem); [Intelligent Model Routing (11.2)](http://localhost:3003/learn/intelligent-model-routing)
- **Read in order:** Loading a pretrained model → Tokenizer and inference pipeline → Batching/padding concepts → Model and dataset limitations.
- **Learn:** Keep model/input identity stable across benchmarks Separate application baseline work from serving-engine configuration
- **Why here:** A stable model/input baseline is required before vLLM, CUDA or Ray changes can be interpreted; engine deployment is outside this course's scope.
- **Practical activity:** Record a small model's fixed input, tokenizer, output and resource assumptions, then use the selected serving-engine resource for one controlled performance comparison.
- **Finished when:** The baseline is reproducible or clearly labeled reference-only The serving comparison names its separate engine documentation
- **Project connection:** [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to High Availability and Reliability. Use the linked project milestone to connect these skills. [High Availability and Reliability (11.4)](http://localhost:3003/learn/high-availability-and-reliability)

Selected precise official guides: [Phase 08: semantic search with FAISS](https://huggingface.co/learn/llm-course/en/chapter5/6).

### 26. FastAPI Tutorial

Stable ID: `fastapi`. Original resource retained. Priority: **CORE**. [Official source](https://fastapi.tiangolo.com/tutorial/). **C1–C12: PASS.** One resource/bookmark key `resource:fastapi`; 4 distinct visit(s).

Corrections to learning moments: `fastapi-reference-7.3` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId); `fastapi-reference-7.4` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId); `fastapi-reference-7.6` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### fastapi-primary — primary placement

- **Phase/topic:** 07 — Backend & AI Engineering; [FastAPI (7.2)](http://localhost:3003/learn/fastapi). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open while implementing FastAPI in Phase 07 after Python functions/OOP, advanced Python basics, SQL and API Engineering.
- **Prerequisites:** [Functions and Modular Programming (1.2)](http://localhost:3003/learn/functions-and-modular-programming); [Object-Oriented Programming (1.3)](http://localhost:3003/learn/object-oriented-programming); [Advanced Python (1.4)](http://localhost:3003/learn/advanced-python); [SQL (1.6-sql)](http://localhost:3003/learn/sql); [API Engineering (7.1)](http://localhost:3003/learn/api-engineering)
- **Read in order:** First steps and routes → Path and query parameters → Request bodies → Pydantic validation → Dependencies → Errors → Tests → Database integration as needed.
- **Learn:** Expose a typed model interface Handle invalid requests predictably
- **Why here:** You have a model or use case to expose and understand HTTP, so framework syntax can implement a known contract.
- **Practical activity:** Create the ML Prediction API with a validated request, response schema, health route and tests for valid and invalid input.
- **Finished when:** The client receives documented status codes Validation and a simulated dependency failure are covered by tests
- **Project connection:** [ML Prediction API](http://localhost:3003/projects/ml-prediction-api); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to Backend Architecture. Use the linked project milestone to connect these skills. [Backend Architecture (7.3)](http://localhost:3003/learn/backend-architecture)

#### fastapi-reference-7.3

- **Phase/topic:** 07 — Backend & AI Engineering; [Backend Architecture (7.3)](http://localhost:3003/learn/backend-architecture). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Read application-structure and dependency sections during Backend Architecture in Phase 07 after your first FastAPI API and database concepts.
- **Prerequisites:** [Advanced Python (1.4)](http://localhost:3003/learn/advanced-python); [Database Engineering with PostgreSQL (3.2)](http://localhost:3003/learn/database-engineering-with-postgresql); [API Engineering (7.1)](http://localhost:3003/learn/api-engineering); [FastAPI (7.2)](http://localhost:3003/learn/fastapi)
- **Read in order:** Bigger applications and APIRouter → Dependencies → Dependencies with yield → Testing dependency overrides.
- **Learn:** Separate routing from business logic Explain the lifetime of an injected dependency
- **Why here:** The framework supplies explicit request/dependency lifetimes for a service/repository design; it does not choose the business architecture for you.
- **Practical activity:** Move one prediction endpoint into a router, inject a repository and override it in tests, checking cleanup on a failed request.
- **Finished when:** The same route works with a test repository Failure releases the request-scoped resource
- **Project connection:** [ML Prediction API](http://localhost:3003/projects/ml-prediction-api); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to AI Provider Integration. Use the linked project milestone to connect these skills. [AI Provider Integration (7.4)](http://localhost:3003/learn/ai-provider-integration)

#### fastapi-reference-7.4

- **Phase/topic:** 07 — Backend & AI Engineering; [AI Provider Integration (7.4)](http://localhost:3003/learn/ai-provider-integration). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Reopen validation, dependency and response-model sections during AI Provider Integration in Phase 07 after backend architecture.
- **Prerequisites:** [Advanced Python (1.4)](http://localhost:3003/learn/advanced-python); [FastAPI (7.2)](http://localhost:3003/learn/fastapi); [Backend Architecture (7.3)](http://localhost:3003/learn/backend-architecture)
- **Read in order:** Request body models → Response models → Async and dependencies → Testing overrides → Handling errors.
- **Learn:** Keep provider details behind an interface Validate untrusted model output at the API boundary
- **Why here:** Provider adapters need a validated application boundary; provider role syntax, SDK retries and pricing come from that provider's own documentation.
- **Practical activity:** Inject a mocked provider into a validated route, normalize its response and reject malformed generated data without logging credentials or private prompts.
- **Finished when:** Valid and malformed mock responses have deterministic tests A failure returns a controlled error contract
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to Token and Cost Engineering. Use the linked project milestone to connect these skills. [Token and Cost Engineering (7.5)](http://localhost:3003/learn/token-and-cost-engineering)

#### fastapi-reference-7.6

- **Phase/topic:** 07 — Backend & AI Engineering; [AI Backend Reliability (7.6)](http://localhost:3003/learn/ai-backend-reliability). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Use the error-handling and testing sections during AI Backend Reliability in Phase 07 after provider integration and usage accounting.
- **Prerequisites:** [Advanced Python (1.4)](http://localhost:3003/learn/advanced-python); [FastAPI (7.2)](http://localhost:3003/learn/fastapi); [Backend Architecture (7.3)](http://localhost:3003/learn/backend-architecture); [AI Provider Integration (7.4)](http://localhost:3003/learn/ai-provider-integration); [Token and Cost Engineering (7.5)](http://localhost:3003/learn/token-and-cost-engineering)
- **Read in order:** Handling errors → Dependencies and cleanup → Async request handlers → Testing error paths → Background-task limitations.
- **Learn:** Separate framework error mapping from provider retry policy Keep resources and usage accounting consistent on failure
- **Why here:** FastAPI exposes controlled responses and cleanup; backoff, retry budgets and circuit breakers must be designed separately for the provider client.
- **Practical activity:** Simulate timeout and malformed-provider responses behind a dependency, assert the mapped status/error and verify cleanup. Document the separate bounded retry policy.
- **Finished when:** No failed call leaves a request resource open The test shows controlled errors without retrying indefinitely
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Embeddings and Vector Search. Use the linked project milestone to connect these skills. [Embeddings and Vector Search (8.1)](http://localhost:3003/learn/embeddings-and-vector-search)

### 27. Redis Documentation

Stable ID: `redis`. Original resource retained. Priority: **CORE**. [Official source](https://redis.io/docs/latest/). **C1–C12: PASS.** One resource/bookmark key `resource:redis`; 2 distinct visit(s).

Corrections to learning moments: `redis-primary` (focusSections, practicalTask, completionCriteria); `redis-reference-9.3` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### redis-primary — primary placement

- **Phase/topic:** 09 — System Design & Scalability; [Caching and Redis (9.2)](http://localhost:3003/learn/caching-and-redis). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during Caching and Redis in Phase 09 after a working backend, PostgreSQL and System Design Fundamentals. Return to atomic counters during Rate Limiting.
- **Prerequisites:** [Database Engineering with PostgreSQL (3.2)](http://localhost:3003/learn/database-engineering-with-postgresql); [Backend Architecture (7.3)](http://localhost:3003/learn/backend-architecture); [System Design Fundamentals (9.1)](http://localhost:3003/learn/system-design-fundamentals)
- **Read in order:** Core data structures → Expiration and TTL → Cache-aside → Invalidation → Atomic operations introduction (rate limiting returns in topic 9.3).
- **Learn:** Measure cache behavior Enforce a concurrent usage limit correctly
- **Why here:** An existing backend provides a baseline against which you can measure latency, hit rate and consistency costs.
- **Practical activity:** Add tenant-aware cache keys and TTL to a working endpoint, measure cache hits/misses and test invalidation after a source change. Implement and concurrently test the limiter during the separate Rate Limiting revisit.
- **Finished when:** Stale entries are invalidated under the documented policy The measurement records hits, misses, latency and a tenant-isolation check
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Rate Limiting. Use the linked project milestone to connect these skills. [Rate Limiting (9.3)](http://localhost:3003/learn/rate-limiting)

#### redis-reference-9.3

- **Phase/topic:** 09 — System Design & Scalability; [Rate Limiting (9.3)](http://localhost:3003/learn/rate-limiting). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Read atomic counter and expiry guidance during Rate Limiting in Phase 09 after the caching/Redis introduction.
- **Prerequisites:** [Backend Architecture (7.3)](http://localhost:3003/learn/backend-architecture); [System Design Fundamentals (9.1)](http://localhost:3003/learn/system-design-fundamentals); [Caching and Redis (9.2)](http://localhost:3003/learn/caching-and-redis)
- **Read in order:** Atomic operations → Transactions or scripts → Expiration → Counters → Rate-limiting patterns.
- **Learn:** Preserve an atomic counter/expiry invariant Explain per-tenant key boundaries
- **Why here:** Concurrent requests need an atomic decision, not independent read-then-write counters.
- **Practical activity:** Implement a small tenant-scoped limiter, test simultaneous calls and expiry, and document the failure policy when Redis is unavailable.
- **Finished when:** A concurrent test does not admit excess requests under the chosen rule Denied requests include a controlled retry signal
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Queues and Background Processing. Use the linked project milestone to connect these skills. [Queues and Background Processing (9.4)](http://localhost:3003/learn/queues-and-background-processing)

### 28. Get Started with Docker

Stable ID: `docker`. Original resource retained. Priority: **CORE**. [Official source](https://docs.docker.com/get-started/). **C1–C12: PASS.** One resource/bookmark key `resource:docker`; 2 distinct visit(s).

Corrections to learning moments: `docker-reference-10.7` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### docker-primary — primary placement

- **Phase/topic:** 10 — Production, Security & MLOps; [Docker and Containers (10.5)](http://localhost:3003/learn/docker-and-containers). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during Docker and Containers in Phase 10 after building and testing a working Python API and understanding its environment settings.
- **Prerequisites:** [Command Line and Linux (0.4)](http://localhost:3003/learn/command-line-and-linux); [FastAPI (7.2)](http://localhost:3003/learn/fastapi); [Software and API Testing (10.3)](http://localhost:3003/learn/software-and-api-testing)
- **Read in order:** Images and containers → Dockerfile → Build and run → Ports → Volumes → Networks → Compose → Multi-stage builds.
- **Learn:** Package a repeatable runtime Keep persistent state and secrets outside the image
- **Why here:** You now have an application whose runtime can be reproduced; packaging a non-working service would hide the real problem.
- **Practical activity:** Containerize the existing prediction API, add a health check and document configuration and persistent data boundaries.
- **Finished when:** The service starts from a clean build No credentials or mutable database data are baked into the image
- **Project connection:** [ML Prediction API](http://localhost:3003/projects/ml-prediction-api); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Cloud Computing. Use the linked project milestone to connect these skills. [Cloud Computing (10.6)](http://localhost:3003/learn/cloud-computing)

#### docker-reference-10.7

- **Phase/topic:** 10 — Production, Security & MLOps; [DevOps and CI/CD (10.7)](http://localhost:3003/learn/devops-and-ci-cd). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Return to build/tag and image-publishing sections during DevOps and CI/CD in Phase 10 after the first container and cloud deployment.
- **Prerequisites:** [Git and GitHub (0.5)](http://localhost:3003/learn/git-and-github); [Software and API Testing (10.3)](http://localhost:3003/learn/software-and-api-testing); [Docker and Containers (10.5)](http://localhost:3003/learn/docker-and-containers); [Cloud Computing (10.6)](http://localhost:3003/learn/cloud-computing)
- **Read in order:** Build and tag images → Multi-stage builds → Build cache → Image registries → Container health and configuration.
- **Learn:** Separate image creation from CI orchestration Trace a runtime artifact to source
- **Why here:** Docker documentation defines the artifact; GitHub Actions documentation defines the workflow that builds it.
- **Practical activity:** Build a tagged prediction-API image locally, record its source revision and test startup/health behavior. Draft the CI invocation using the separate Actions guide.
- **Finished when:** The image runs with documented configuration The source revision and rollback image identity are recorded
- **Project connection:** [ML Prediction API](http://localhost:3003/projects/ml-prediction-api); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Logging, Monitoring, and Observability. Use the linked project milestone to connect these skills. [Logging, Monitoring, and Observability (10.8)](http://localhost:3003/learn/logging-monitoring-and-observability)

### 29. Kubernetes Tutorials

Stable ID: `kubernetes`. Original resource retained. Priority: **ADVANCED**. [Official source](https://kubernetes.io/docs/tutorials/). **C1–C12: PASS.** One resource/bookmark key `resource:kubernetes`; 1 distinct visit(s).

Reviewed: no learning-moment content correction was required. Resource identity, link targets and classification passed.

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### kubernetes-primary — primary placement

- **Phase/topic:** 10 — Production, Security & MLOps; [DevOps and CI/CD (10.7)](http://localhost:3003/learn/devops-and-ci-cd). Stage: ADVANCED — RETURN LATER.
- **Open when:** Return during DevOps and CI/CD only after Docker networking and a successful basic cloud deployment, when orchestration solves an actual need.
- **Prerequisites:** [System Design Fundamentals (9.1)](http://localhost:3003/learn/system-design-fundamentals); [Docker and Containers (10.5)](http://localhost:3003/learn/docker-and-containers); [Cloud Computing (10.6)](http://localhost:3003/learn/cloud-computing)
- **Read in order:** Pods → Deployments → Services → ConfigMaps and secrets → Probes → Scaling → Local learning cluster.
- **Learn:** Explain orchestration boundaries Operate one small service in a controlled cluster
- **Why here:** You can compare orchestration costs with a simpler deployment rather than treating Kubernetes as a compulsory first step.
- **Practical activity:** Deploy one small service in a local learning cluster, exercise readiness checks and document configuration boundaries.
- **Finished when:** Explain the service/deployment/pod relationship Demonstrate recovery from one stopped pod without exposing secrets
- **Project connection:** [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Logging, Monitoring, and Observability. Use the linked project milestone to connect these skills. [Logging, Monitoring, and Observability (10.8)](http://localhost:3003/learn/logging-monitoring-and-observability)

### 30. MLflow Documentation

Stable ID: `mlflow`. Original resource retained. Priority: **CORE**. [Official source](https://mlflow.org/docs/latest/). **C1–C12: PASS.** One resource/bookmark key `resource:mlflow`; 3 distinct visit(s).

Corrections to learning moments: `mlflow-visit-4.6-1` (projectIds); `mlflow-reference-10.4` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### mlflow-visit-4.6-1

- **Phase/topic:** 04 — Data Science & Machine Learning; [Model Training and Improvement (4.6)](http://localhost:3003/learn/model-training-and-improvement). Stage: READ AFTER COMPLETING THIS TOPIC.
- **Open when:** Open the tracking-only sections after training and comparing your first models in Phase 04, during Model Training and Improvement.
- **Prerequisites:** [Machine Learning Fundamentals (4.2)](http://localhost:3003/learn/machine-learning-fundamentals); [Model Evaluation (4.5)](http://localhost:3003/learn/model-evaluation)
- **Read in order:** Tracking runs → Parameters → Metrics → Artifacts → Comparing experiments.
- **Learn:** Record comparable experiments with data and code provenance. Choose a candidate using consistent metrics rather than the best training score.
- **Why here:** A real pair of model experiments gives parameters, metrics and artifacts something concrete to describe.
- **Practical activity:** Track two model runs on the same split, log their parameters and metrics, save artifacts and explain the comparison.
- **Finished when:** Both runs can be reproduced and compared. The report records dataset, code and validation choices.
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction).
- **Next:** Use these experiment records in Project 02; return to model registry and lifecycle sections during MLOps in Phase 10. [MLOps (10.9)](http://localhost:3003/learn/mlops)

#### mlflow-reference-10.4

- **Phase/topic:** 10 — Production, Security & MLOps; [AI and LLM Evaluation (10.4)](http://localhost:3003/learn/ai-and-llm-evaluation). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open the LLMs and Agents evaluation documentation during AI and LLM Evaluation in Phase 10 after a working LLM application and testing; do not use the traditional model-registry section for this visit.
- **Prerequisites:** [Model Training and Improvement (4.6)](http://localhost:3003/learn/model-training-and-improvement); [Traditional RAG (8.3)](http://localhost:3003/learn/traditional-rag); [Software and API Testing (10.3)](http://localhost:3003/learn/software-and-api-testing)
- **Read in order:** LLMs and Agents: tracing → Evaluation datasets → Evaluation experiments and scorers → Recording feedback and comparison.
- **Learn:** Distinguish LLM evaluation from traditional model registry Keep comparison data and scorer settings reproducible
- **Why here:** MLflow can retain LLM traces, evaluation cases and comparisons; lifecycle/registry work belongs to the later MLOps visit.
- **Practical activity:** Record a small fixed document-assistant or CCAI evaluation with input/source/output provenance and one changed version, inspecting failed or disputed scores.
- **Finished when:** The two versions use identical cases A failure trace and scorer limitation are documented
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to Docker and Containers. Use the linked project milestone to connect these skills. [Docker and Containers (10.5)](http://localhost:3003/learn/docker-and-containers)

#### mlflow-primary — primary placement

- **Phase/topic:** 10 — Production, Security & MLOps; [MLOps (10.9)](http://localhost:3003/learn/mlops). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open the lifecycle sections during MLOps in Phase 10 after model training, testing and basic deployment. The first tracking-only visit occurs earlier in Phase 04.
- **Prerequisites:** [Model Training and Improvement (4.6)](http://localhost:3003/learn/model-training-and-improvement); [Software and API Testing (10.3)](http://localhost:3003/learn/software-and-api-testing); [Cloud Computing (10.6)](http://localhost:3003/learn/cloud-computing)
- **Read in order:** ML lifecycle → Experiment records → Artifacts and reproducibility → Model versions → Registry → Promotion and rollback.
- **Learn:** Connect data/code/model versions Define a repeatable model promotion decision
- **Why here:** You have real model artifacts and deployment context, so registry and reproducibility concepts have a concrete purpose.
- **Practical activity:** Register one evaluated model with data/code provenance, compare it with a candidate and document a promotion and rollback rule.
- **Finished when:** A model version can be traced to its experiment and dataset The comparison uses consistent evaluation criteria
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Privacy, Governance, and Responsible AI. Use the linked project milestone to connect these skills. [Privacy, Governance, and Responsible AI (10.10)](http://localhost:3003/learn/privacy-governance-and-responsible-ai)

### 31. OpenTelemetry Documentation

Stable ID: `otel`. Original resource retained. Priority: **CORE**. [Official source](https://opentelemetry.io/docs/). **C1–C12: PASS.** One resource/bookmark key `resource:otel`; 3 distinct visit(s).

Corrections to learning moments: `otel-reference-11.1` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId, advanced).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### otel-visit-9.8-1

- **Phase/topic:** 09 — System Design & Scalability; [Load and Stress Testing (9.8)](http://localhost:3003/learn/load-and-stress-testing). Stage: OPTIONAL REFERENCE.
- **Open when:** Consult the telemetry overview while planning load-test measurements in Phase 09; implement full instrumentation during Logging, Monitoring, and Observability in Phase 10.
- **Prerequisites:** [FastAPI (7.2)](http://localhost:3003/learn/fastapi); [System Design Fundamentals (9.1)](http://localhost:3003/learn/system-design-fundamentals)
- **Read in order:** Metrics versus traces overview → Request latency boundaries → Resource-measurement planning.
- **Learn:** Trace a request across components Choose telemetry that diagnoses a concrete failure
- **Why here:** A performance test first needs a definition of what is timed and what resources are measured.
- **Practical activity:** Sketch the request spans and metrics needed to explain a slow API request; avoid instrumenting every signal at once.
- **Finished when:** Measurement boundaries and units are clear. The plan excludes sensitive request bodies and high-cardinality secrets.
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Logging, Monitoring, and Observability. Use the linked project milestone to connect these skills. [Logging, Monitoring, and Observability (10.8)](http://localhost:3003/learn/logging-monitoring-and-observability)

#### otel-primary — primary placement

- **Phase/topic:** 10 — Production, Security & MLOps; [Logging, Monitoring, and Observability (10.8)](http://localhost:3003/learn/logging-monitoring-and-observability). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during Logging, Monitoring, and Observability in Phase 10 after API Engineering, FastAPI, Backend Architecture and basic request logging.
- **Prerequisites:** [API Engineering (7.1)](http://localhost:3003/learn/api-engineering); [FastAPI (7.2)](http://localhost:3003/learn/fastapi); [Backend Architecture (7.3)](http://localhost:3003/learn/backend-architecture); [System Design Fundamentals (9.1)](http://localhost:3003/learn/system-design-fundamentals)
- **Read in order:** Logs, metrics and traces → Instrumentation → Trace/span relationships → Context propagation → HTTP request lifecycle → Sensitive-data filtering.
- **Learn:** Trace a request across components Choose telemetry that diagnoses a concrete failure
- **Why here:** You can now identify the request path and use traces to locate latency instead of adding unexplained dashboards.
- **Practical activity:** Instrument a backend request across retrieval and provider calls with a request ID, latency metric and linked spans.
- **Finished when:** A failed request can be followed across components Logs and traces omit credentials and private document content
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to MLOps. Use the linked project milestone to connect these skills. [MLOps (10.9)](http://localhost:3003/learn/mlops)

#### otel-reference-11.1

- **Phase/topic:** 11 — Advanced AI Architecture; [AI System Architecture (11.1)](http://localhost:3003/learn/ai-system-architecture). Stage: ADVANCED — RETURN LATER.
- **Open when:** Revisit propagation and instrumentation design during AI System Architecture in Phase 11 after implementing basic observability.
- **Prerequisites:** [Backend Architecture (7.3)](http://localhost:3003/learn/backend-architecture); [System Design Fundamentals (9.1)](http://localhost:3003/learn/system-design-fundamentals); [Logging, Monitoring, and Observability (10.8)](http://localhost:3003/learn/logging-monitoring-and-observability)
- **Read in order:** Trace context propagation → Spans and semantic conventions → Resource attributes → Sampling → Sensitive-data handling.
- **Learn:** Connect a dependency boundary to a trace Choose useful low-cardinality attributes
- **Why here:** The architecture now spans several boundaries, so an isolated request log is insufficient to explain a slow or failed flow.
- **Practical activity:** Annotate a CCAI request diagram with span boundaries, propagation, safe attributes and sampling decisions; identify where private context must be excluded.
- **Finished when:** A request can be followed across the proposed boundaries The plan excludes secrets and raw private document content
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Intelligent Model Routing. Use the linked project milestone to connect these skills. [Intelligent Model Routing (11.2)](http://localhost:3003/learn/intelligent-model-routing)

### 32. Get Started with Neo4j

Stable ID: `neo4j`. Original resource retained. Priority: **OPTIONAL**. [Official source](https://neo4j.com/docs/getting-started/). **C1–C12: PASS.** One resource/bookmark key `resource:neo4j`; 2 distinct visit(s).

Corrections to learning moments: `neo4j-reference-8.6` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId, advanced).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### neo4j-primary — primary placement

- **Phase/topic:** 08 — RAG, Agents & Knowledge; [Graph Theory and Knowledge Graphs (8.5)](http://localhost:3003/learn/graph-theory-and-knowledge-graphs). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during Graph Theory and Knowledge Graphs in Phase 08 after basic graph concepts, embeddings and a traditional RAG baseline.
- **Prerequisites:** [Discrete Mathematics and Logic (2.2)](http://localhost:3003/learn/discrete-mathematics-and-logic); [Embeddings and Vector Search (8.1)](http://localhost:3003/learn/embeddings-and-vector-search); [Traditional RAG (8.3)](http://localhost:3003/learn/traditional-rag)
- **Read in order:** Nodes, edges and properties → Relationship modeling → Graph queries → Traversal → Source provenance → Bounded subgraph retrieval.
- **Learn:** Represent evidence-backed relationships Compare graph retrieval with a vector baseline
- **Why here:** A baseline lets you test whether explicit relationships improve your chosen questions instead of assuming graphs are universally better.
- **Practical activity:** Build a small knowledge graph with source-backed edges, retrieve a bounded subgraph and compare relationship questions against vector retrieval.
- **Finished when:** Every example edge has a supporting source Document an extraction error and a query where the graph helps or does not help
- **Project connection:** [Graph RAG Knowledge Assistant](http://localhost:3003/projects/graph-rag-knowledge-assistant).
- **Next:** After the exercise, continue to Graph RAG. Use the linked project milestone to connect these skills. [Graph RAG (8.6)](http://localhost:3003/learn/graph-rag)

#### neo4j-reference-8.6

- **Phase/topic:** 08 — RAG, Agents & Knowledge; [Graph RAG (8.6)](http://localhost:3003/learn/graph-rag). Stage: ADVANCED — RETURN LATER.
- **Open when:** Read relationship-query and traversal sections during Graph RAG in Phase 08 after a working vector RAG baseline and graph fundamentals.
- **Prerequisites:** [Embeddings and Vector Search (8.1)](http://localhost:3003/learn/embeddings-and-vector-search); [Traditional RAG (8.3)](http://localhost:3003/learn/traditional-rag); [Graph Theory and Knowledge Graphs (8.5)](http://localhost:3003/learn/graph-theory-and-knowledge-graphs)
- **Read in order:** Cypher relationship patterns → Bounded traversals → Properties and source provenance → Indexes and query plans.
- **Learn:** Bound graph expansion Preserve provenance in retrieved relationships
- **Why here:** The graph database implements relationship retrieval; extraction quality and answer grounding must still be evaluated separately.
- **Practical activity:** Retrieve a bounded provenance-bearing subgraph for a relationship question and compare its evidence with vector-only retrieval on the same question set.
- **Finished when:** Every returned relationship has a source The report includes one extraction error and a case where the graph does not help
- **Project connection:** [Graph RAG Knowledge Assistant](http://localhost:3003/projects/graph-rag-knowledge-assistant).
- **Next:** After the exercise, continue to AI Agents. Use the linked project milestone to connect these skills. [AI Agents (8.7)](http://localhost:3003/learn/ai-agents)

### 33. LangGraph Overview

Stable ID: `langgraph`. Original resource retained. Priority: **OPTIONAL**. [Official source](https://docs.langchain.com/oss/python/langgraph/overview). **C1–C12: PASS.** One resource/bookmark key `resource:langgraph`; 1 distinct visit(s).

Reviewed: no learning-moment content correction was required. Resource identity, link targets and classification passed.

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### langgraph-primary — primary placement

- **Phase/topic:** 08 — RAG, Agents & Knowledge; [AI Frameworks and Protocols (8.8)](http://localhost:3003/learn/ai-frameworks-and-protocols). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open after AI Agents and a small deterministic tool workflow, while studying AI Frameworks and Protocols in Phase 08.
- **Prerequisites:** [LLM Internals (6.4)](http://localhost:3003/learn/llm-internals); [AI Provider Integration (7.4)](http://localhost:3003/learn/ai-provider-integration); [AI Agents (8.7)](http://localhost:3003/learn/ai-agents)
- **Read in order:** State → Nodes and edges → Graph execution → Persistence → Human approval → Failure and resume behavior.
- **Learn:** Model a bounded stateful workflow Locate permissions outside model-generated choices
- **Why here:** You already understand a loop, state and tool calls; the framework now has a known responsibility to simplify.
- **Practical activity:** Build a small stateful workflow with a read-only tool, an interruption/resume path and a human approval gate for a proposed consequential step.
- **Finished when:** State transitions can be inspected The workflow stops on its budget and never bypasses application permissions
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to System Design Fundamentals. Use the linked project milestone to connect these skills. [System Design Fundamentals (9.1)](http://localhost:3003/learn/system-design-fundamentals)

### 34. Introduction to MCP

Stable ID: `mcp`. Original resource retained. Priority: **CORE**. [Official source](https://modelcontextprotocol.io/docs/getting-started/intro). **C1–C12: PASS.** One resource/bookmark key `resource:mcp`; 1 distinct visit(s).

Reviewed: no learning-moment content correction was required. Resource identity, link targets and classification passed.

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### mcp-primary — primary placement

- **Phase/topic:** 08 — RAG, Agents & Knowledge; [AI Frameworks and Protocols (8.8)](http://localhost:3003/learn/ai-frameworks-and-protocols). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during AI Frameworks and Protocols in Phase 08 after API Engineering, basic tool calling and AI Agents.
- **Prerequisites:** [API Engineering (7.1)](http://localhost:3003/learn/api-engineering); [AI Provider Integration (7.4)](http://localhost:3003/learn/ai-provider-integration); [AI Agents (8.7)](http://localhost:3003/learn/ai-agents)
- **Read in order:** Architecture → Clients and servers → Tool discovery → Resources and prompts → Communication → Permission boundaries → Current specification.
- **Learn:** Explain the protocol boundary Connect a minimal read-only server to a client
- **Why here:** You can distinguish an application workflow from a protocol that exposes capabilities to compatible clients.
- **Practical activity:** Build or inspect a minimal read-only MCP server, connect a compatible client and document discovery and authorization behavior.
- **Finished when:** Schemas match observed tool inputs Explain which layer grants permission and how untrusted tool output is handled
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to System Design Fundamentals. Use the linked project milestone to connect these skills. [System Design Fundamentals (9.1)](http://localhost:3003/learn/system-design-fundamentals)

### 35. OWASP Gen AI Security Project

Stable ID: `owasp`. Original resource retained. Priority: **CORE**. [Official source](https://genai.owasp.org/). **C1–C12: PASS.** One resource/bookmark key `resource:owasp`; 2 distinct visit(s).

Corrections to learning moments: `owasp-reference-10.10` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### owasp-primary — primary placement

- **Phase/topic:** 10 — Production, Security & MLOps; [AI and LLM Security (10.2)](http://localhost:3003/learn/ai-and-llm-security). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during AI and LLM Security in Phase 10 after Application Security and a working RAG or agent workflow.
- **Prerequisites:** [Traditional RAG (8.3)](http://localhost:3003/learn/traditional-rag); [AI Agents (8.7)](http://localhost:3003/learn/ai-agents); [Application Security (10.1)](http://localhost:3003/learn/application-security)
- **Read in order:** Prompt injection → Sensitive disclosure → Insecure output handling → Excessive agency → Tool permissions → RAG data access → Denial-of-service risks.
- **Learn:** Threat-model model-assisted features Enforce security outside prompting
- **Why here:** You can now trace how untrusted documents and model proposals reach real data and actions.
- **Practical activity:** Threat-model CCAI and run authorized tests for prompt injection, cross-tenant retrieval and excessive tool permission.
- **Finished when:** A denied user cannot retrieve another tenant’s content A tool proposal is validated before any action
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Software and API Testing. Use the linked project milestone to connect these skills. [Software and API Testing (10.3)](http://localhost:3003/learn/software-and-api-testing)

#### owasp-reference-10.10

- **Phase/topic:** 10 — Production, Security & MLOps; [Privacy, Governance, and Responsible AI (10.10)](http://localhost:3003/learn/privacy-governance-and-responsible-ai). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Revisit disclosure and data-handling risks during Privacy, Governance, and Responsible AI in Phase 10 after the security topics.
- **Prerequisites:** [Data Modeling and Storage for AI (3.5)](http://localhost:3003/learn/data-modeling-and-storage-for-ai); [Application Security (10.1)](http://localhost:3003/learn/application-security); [AI and LLM Security (10.2)](http://localhost:3003/learn/ai-and-llm-security)
- **Read in order:** Sensitive information disclosure → Data and model poisoning → Unsafe output handling → Unbounded consumption → Risk mitigations.
- **Learn:** Map an AI risk to a concrete data boundary Distinguish a security control from proof of compliance
- **Why here:** OWASP supports engineering controls and threat analysis; current legal applicability must come from the official jurisdiction-specific sources.
- **Practical activity:** Review one CCAI data flow for prompt/log disclosure, retention exposure and cross-tenant access, then separate engineering findings from legal questions.
- **Finished when:** The review names a testable mitigation and its limits No claim of legal compliance relies only on OWASP
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to AI System Architecture. Use the linked project milestone to connect these skills. [AI System Architecture (11.1)](http://localhost:3003/learn/ai-system-architecture)

### 36. AWS Documentation

Stable ID: `aws`. Original resource retained. Priority: **CORE**. [Official source](https://docs.aws.amazon.com/). **C1–C12: PASS.** One resource/bookmark key `resource:aws`; 1 distinct visit(s).

Corrections to learning moments: `aws-primary` (focusSections).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### aws-primary — primary placement

- **Phase/topic:** 10 — Production, Security & MLOps; [Cloud Computing (10.6)](http://localhost:3003/learn/cloud-computing). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during Cloud Computing in Phase 10 after Linux, networking, Docker and a working backend. Read only the services chosen for that deployment.
- **Prerequisites:** [Computer Networking (0.3)](http://localhost:3003/learn/computer-networking); [Command Line and Linux (0.4)](http://localhost:3003/learn/command-line-and-linux); [FastAPI (7.2)](http://localhost:3003/learn/fastapi); [Docker and Containers (10.5)](http://localhost:3003/learn/docker-and-containers)
- **Read in order:** Getting Started with AWS and IAM least-privilege basics → Choosing an AWS compute service decision guide → One chosen compute guide: EC2 or ECS getting started, not both → Amazon S3 User Guide: object storage basics → Amazon VPC User Guide: networking boundaries → Amazon RDS getting started only if a managed database is used → CloudWatch monitoring basics and Billing/Cost Management budgets.
- **Learn:** Design least-privilege deployment access Estimate the costs and recovery plan
- **Why here:** A concrete service makes IAM, networking and operating cost decisions testable instead of an endless catalog of products.
- **Practical activity:** Plan and, with your own approval and budget, deploy one small backend; record architecture, permissions, cost controls and restoration steps.
- **Finished when:** Explain every selected service and access grant Provide a reproducible deployment and recovery checklist
- **Project connection:** [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to DevOps and CI/CD. Use the linked project milestone to connect these skills. [DevOps and CI/CD (10.7)](http://localhost:3003/learn/devops-and-ci-cd)

### 37. Machine Learning Crash Course

Stable ID: `ml-course`. Original resource retained. Priority: **CORE**. [Official source](https://developers.google.com/machine-learning/crash-course). **C1–C12: PASS.** One resource/bookmark key `resource:ml-course`; 3 distinct visit(s).

Corrections to learning moments: `ml-course-reference-5.1` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, projectIds, nextStep, nextTopicId).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### ml-course-visit-4.1-1

- **Phase/topic:** 04 — Data Science & Machine Learning; [Data Science Fundamentals (4.1)](http://localhost:3003/learn/data-science-fundamentals). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Read a short problem-framing/data preview at the start of Data Science Fundamentals in Phase 04, then practice NumPy and Pandas before returning to model training.
- **Prerequisites:** [Python Setup and Fundamentals (1.1)](http://localhost:3003/learn/python-setup-and-fundamentals); [Basic Mathematics (2.1)](http://localhost:3003/learn/basic-mathematics); [Statistics (2.3)](http://localhost:3003/learn/statistics); [Probability (2.4)](http://localhost:3003/learn/probability)
- **Read in order:** Problem framing → Features and labels → Data preparation preview.
- **Learn:** Explain a baseline learning objective Connect metrics to mistakes in held-out examples
- **Why here:** A concrete question makes the purpose of data preparation clear without introducing estimator APIs prematurely.
- **Practical activity:** Choose a dataset question and identify a target, available features and a possible leakage risk.
- **Finished when:** The target is observable and the feature timing is stated. Explain why a suspicious feature would leak the answer.
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction).
- **Next:** After the exercise, continue to Machine Learning Fundamentals. Use the linked project milestone to connect these skills. [Machine Learning Fundamentals (4.2)](http://localhost:3003/learn/machine-learning-fundamentals)

#### ml-course-primary — primary placement

- **Phase/topic:** 04 — Data Science & Machine Learning; [Machine Learning Fundamentals (4.2)](http://localhost:3003/learn/machine-learning-fundamentals). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open selected modules alongside Machine Learning Fundamentals in Phase 04 after Python, basic maths, statistics and probability.
- **Prerequisites:** [Python Setup and Fundamentals (1.1)](http://localhost:3003/learn/python-setup-and-fundamentals); [Basic Mathematics (2.1)](http://localhost:3003/learn/basic-mathematics); [Statistics (2.3)](http://localhost:3003/learn/statistics); [Probability (2.4)](http://localhost:3003/learn/probability)
- **Read in order:** Linear models → Loss → Gradient descent → Classification → Data preparation → Generalization → Model evaluation.
- **Learn:** Explain a baseline learning objective Connect metrics to mistakes in held-out examples
- **Why here:** You have enough notation to connect the conceptual diagrams with a small reproducible model.
- **Practical activity:** Reproduce one selected exercise, compare it with your own baseline and explain one error rather than reporting only a headline score.
- **Finished when:** The training/test boundary is clear Explain loss, generalization and the limitation of the chosen metric
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction).
- **Next:** After the exercise, continue to Supervised Learning Algorithms. Use the linked project milestone to connect these skills. [Supervised Learning Algorithms (4.3)](http://localhost:3003/learn/supervised-learning-algorithms)

#### ml-course-reference-5.1

- **Phase/topic:** 05 — Deep Learning & PyTorch; [Deep Learning Fundamentals (5.1)](http://localhost:3003/learn/deep-learning-fundamentals). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Read the neural-network modules during Deep Learning Fundamentals in Phase 05 after ML evaluation and model training.
- **Prerequisites:** [Machine Learning Fundamentals (4.2)](http://localhost:3003/learn/machine-learning-fundamentals); [Model Evaluation (4.5)](http://localhost:3003/learn/model-evaluation); [Model Training and Improvement (4.6)](http://localhost:3003/learn/model-training-and-improvement)
- **Read in order:** Neural networks module → Activation functions → Backpropagation intuition → Overfitting and regularization.
- **Learn:** Explain the role of an activation Identify overfitting from separate training and validation evidence
- **Why here:** The conceptual course connects earlier loss/gradient ideas to hidden layers; the PyTorch resource supplies implementation details later.
- **Practical activity:** Sketch a tiny network's forward computation and explain how a parameter update could reduce loss, then compare two supplied training/validation curves.
- **Finished when:** The sketch labels inputs, parameters and output The curve interpretation proposes a testable regularization change
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction); [ML Prediction API](http://localhost:3003/projects/ml-prediction-api).
- **Next:** After the exercise, continue to PyTorch. Use the linked project milestone to connect these skills. [PyTorch (5.2)](http://localhost:3003/learn/pytorch)

### 38. MIT Linear Algebra

Stable ID: `linear-algebra`. Original resource retained. Priority: **CORE**. [Official source](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/). **C1–C12: PASS.** One resource/bookmark key `resource:linear-algebra`; 1 distinct visit(s).

Reviewed: no learning-moment content correction was required. Resource identity, link targets and classification passed.

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### linear-algebra-primary — primary placement

- **Phase/topic:** 02 — Mathematics & Problem Solving; [Linear Algebra (2.5)](http://localhost:3003/learn/linear-algebra). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open selected MIT lectures during Linear Algebra in Phase 02 after Basic Mathematics and the topic’s introductory vector/matrix lessons.
- **Prerequisites:** [Basic Mathematics (2.1)](http://localhost:3003/learn/basic-mathematics)
- **Read in order:** Vectors and matrices → Matrix multiplication → Linear transformations → Vector spaces → Eigenvalues and eigenvectors.
- **Learn:** Calculate a compatible matrix product Connect transformations to embeddings and neural layers
- **Why here:** Small coordinate examples make later tensor shapes and embedding similarity understandable.
- **Practical activity:** Solve tiny matrix operations by hand, verify with Python where useful and draw a two-dimensional transformation.
- **Finished when:** Show the dimensions at every operation Explain a geometric interpretation instead of only manipulating symbols
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction).
- **Next:** After the exercise, continue to Calculus and Optimization. Use the linked project milestone to connect these skills. [Calculus and Optimization (2.6)](http://localhost:3003/learn/calculus-and-optimization)

### 39. SciPy Statistics Tutorial

Stable ID: `statistics`. Original resource retained. Priority: **CORE**. [Official source](https://docs.scipy.org/doc/scipy/tutorial/stats.html). **C1–C12: PASS.** One resource/bookmark key `resource:statistics`; 2 distinct visit(s).

Corrections to learning moments: `statistics-primary` (focusSections, practicalTask, learningObjectives, completionCriteria); `statistics-visit-2.4-1` (learningObjectives).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### statistics-primary — primary placement

- **Phase/topic:** 02 — Mathematics & Problem Solving; [Statistics (2.3)](http://localhost:3003/learn/statistics). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open selected Python examples during Statistics in Phase 02 after mean, median, variance and standard deviation; revisit distribution/testing examples during Probability.
- **Prerequisites:** [Python Setup and Fundamentals (1.1)](http://localhost:3003/learn/python-setup-and-fundamentals); [Basic Mathematics (2.1)](http://localhost:3003/learn/basic-mathematics)
- **Read in order:** Descriptive statistics examples → Sample summaries and spread → Missing-value awareness → Descriptive comparisons before inference.
- **Learn:** Compute and interpret descriptive statistics State the sample context and limitations before attempting inference
- **Why here:** You can interpret the quantities before calling a statistics function, so code does not replace reasoning.
- **Practical activity:** Analyze a tiny dataset, report count, center and spread with units, and inspect missingness or an outlier. Save distribution and inferential-test examples for the Probability revisit.
- **Finished when:** The summary includes units, sample size and missing-value treatment Explain why descriptive observations alone do not establish a population claim
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction).
- **Next:** After the exercise, continue to Probability. Use the linked project milestone to connect these skills. [Probability (2.4)](http://localhost:3003/learn/probability)

#### statistics-visit-2.4-1

- **Phase/topic:** 02 — Mathematics & Problem Solving; [Probability (2.4)](http://localhost:3003/learn/probability). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Return to distribution and test examples during Probability in Phase 02 after the descriptive-statistics visit. Learn the probability concept before calling the function.
- **Prerequisites:** [Statistics (2.3)](http://localhost:3003/learn/statistics)
- **Read in order:** Random variables → Discrete and continuous distributions → Sampling → Distribution functions → Interpreting a statistical test.
- **Learn:** Compute and interpret descriptive statistics State the sample context and limitations before attempting inference
- **Why here:** The same dataset can now illustrate uncertainty rather than only descriptive summaries.
- **Practical activity:** Simulate or calculate a tiny probability example, compare it with a SciPy distribution and state sampling assumptions.
- **Finished when:** Explain probability versus density. Interpret results with the correct assumptions and units.
- **Project connection:** [Data Analysis and ML Prediction](http://localhost:3003/projects/data-analysis-and-ml-prediction).
- **Next:** After the exercise, continue to Linear Algebra. Use the linked project milestone to connect these skills. [Linear Algebra (2.5)](http://localhost:3003/learn/linear-algebra)

### 40. Grafana k6 Documentation

Stable ID: `k6`. Original resource retained. Priority: **CORE**. [Official source](https://grafana.com/docs/k6/latest/). **C1–C12: PASS.** One resource/bookmark key `resource:k6`; 1 distinct visit(s).

Reviewed: no learning-moment content correction was required. Resource identity, link targets and classification passed.

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### k6-primary — primary placement

- **Phase/topic:** 09 — System Design & Scalability; [Load and Stress Testing (9.8)](http://localhost:3003/learn/load-and-stress-testing). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open after the introductory Load and Stress Testing concepts in Phase 09 and once your own API runs correctly with ordinary tests.
- **Prerequisites:** [FastAPI (7.2)](http://localhost:3003/learn/fastapi); [System Design Fundamentals (9.1)](http://localhost:3003/learn/system-design-fundamentals) Previous lessons: [Resource consumption (9.8.12)](http://localhost:3003/learn/load-and-stress-testing#9.8.12).
- **Read in order:** Test scripts and scenarios → Virtual users and arrival rate → Thresholds → Latency percentiles → Error rate → Controlled load and stress tests.
- **Learn:** Design a repeatable workload Report the system’s measured operating range
- **Why here:** You have a known target and workload, so traffic generation can answer a capacity question instead of producing an unsupported large number.
- **Practical activity:** Run a small controlled test against your own API and report P50/P95/P99, throughput, errors, CPU and memory with the test environment.
- **Finished when:** The exact workload and stop conditions are documented Claims stay within observed evidence
- **Project connection:** [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Application Security. Use the linked project milestone to connect these skills. [Application Security (10.1)](http://localhost:3003/learn/application-security)

### 41. pgvector Documentation

Stable ID: `pgvector`. Original resource retained. Priority: **CORE**. [Official source](https://github.com/pgvector/pgvector). **C1–C12: PASS.** One resource/bookmark key `resource:pgvector`; 5 distinct visit(s).

Corrections to learning moments: `pgvector-reference-8.1` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId); `pgvector-reference-8.3` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId); `pgvector-reference-8.4` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId, advanced).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### pgvector-visit-3.5-1

- **Phase/topic:** 03 — Software, Data & Databases; [Data Modeling and Storage for AI (3.5)](http://localhost:3003/learn/data-modeling-and-storage-for-ai). Stage: OPTIONAL REFERENCE.
- **Open when:** Consult the storage-model overview during Data Modeling and Storage for AI in Phase 03. Return for actual embedding retrieval after Embeddings and Vector Search in Phase 08.
- **Prerequisites:** [Linear Algebra (2.5)](http://localhost:3003/learn/linear-algebra); [Database Engineering with PostgreSQL (3.2)](http://localhost:3003/learn/database-engineering-with-postgresql)
- **Read in order:** Vector columns → Source metadata and dimensions → Ownership filters → Index/storage overview.
- **Learn:** Implement permission-filtered similarity search Compare index recall and cost with exact search
- **Why here:** You can plan where vectors and permissions belong without needing to build a full retriever yet.
- **Practical activity:** Draw a document/chunk/vector schema with tenant ownership, model version and source-deletion behavior.
- **Finished when:** Dimensions and metadata have an explicit home. Deletion and access-control behavior are documented.
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [Graph RAG Knowledge Assistant](http://localhost:3003/projects/graph-rag-knowledge-assistant).
- **Next:** After the exercise, continue to Embeddings and Vector Search. Use the linked project milestone to connect these skills. [Embeddings and Vector Search (8.1)](http://localhost:3003/learn/embeddings-and-vector-search)

#### pgvector-reference-8.1

- **Phase/topic:** 08 — RAG, Agents & Knowledge; [Embeddings and Vector Search (8.1)](http://localhost:3003/learn/embeddings-and-vector-search). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Use only the vector type and exact-search sections during Embeddings and Vector Search in Phase 08 after the introductory similarity lessons. Defer ANN indexes until Vector Databases.
- **Prerequisites:** [Linear Algebra (2.5)](http://localhost:3003/learn/linear-algebra); [Database Engineering with PostgreSQL (3.2)](http://localhost:3003/learn/database-engineering-with-postgresql)
- **Read in order:** Getting started: vector type and dimensions → Querying: distance operators → Exact nearest-neighbor search → Storing vectors.
- **Learn:** Keep dimensions and model identity consistent Interpret a distance operator's ranking
- **Why here:** A small SQL example connects embedding geometry to a durable query without making index tuning a prerequisite for embeddings.
- **Practical activity:** Store a few supplied same-model vectors and compare exact rankings under cosine and inner-product operators, retaining source IDs.
- **Finished when:** Document vector provenance and dimensions One expected relevant result is checked manually
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [Graph RAG Knowledge Assistant](http://localhost:3003/projects/graph-rag-knowledge-assistant).
- **Next:** After the exercise, continue to Vector Databases. Use the linked project milestone to connect these skills. [Vector Databases (8.2)](http://localhost:3003/learn/vector-databases)

#### pgvector-primary — primary placement

- **Phase/topic:** 08 — RAG, Agents & Knowledge; [Vector Databases (8.2)](http://localhost:3003/learn/vector-databases). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during Vector Databases in Phase 08 after PostgreSQL and Embeddings and Vector Search. Use it in Traditional RAG once the storage/query baseline works.
- **Prerequisites:** [Database Engineering with PostgreSQL (3.2)](http://localhost:3003/learn/database-engineering-with-postgresql); [Embeddings and Vector Search (8.1)](http://localhost:3003/learn/embeddings-and-vector-search)
- **Read in order:** Vector columns → Insert and query → Distance operators → Exact search baseline → Approximate indexes → Metadata filtering → Recall and latency.
- **Learn:** Implement permission-filtered similarity search Compare index recall and cost with exact search
- **Why here:** You understand both relational ownership and embedding geometry, so a vector index is a measured extension to familiar storage.
- **Practical activity:** Store a small set of chunks and embeddings, enforce tenant filters, then compare exact and indexed retrieval on labeled queries.
- **Finished when:** Model/dimensions match stored vectors Report recall and latency without leaking another tenant’s content
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [Graph RAG Knowledge Assistant](http://localhost:3003/projects/graph-rag-knowledge-assistant).
- **Next:** After the exercise, continue to Traditional RAG. Use the linked project milestone to connect these skills. [Traditional RAG (8.3)](http://localhost:3003/learn/traditional-rag)

#### pgvector-reference-8.3

- **Phase/topic:** 08 — RAG, Agents & Knowledge; [Traditional RAG (8.3)](http://localhost:3003/learn/traditional-rag). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Revisit filtering and vector-query sections during Traditional RAG in Phase 08 after an exact/indexed search baseline.
- **Prerequisites:** [Database Engineering with PostgreSQL (3.2)](http://localhost:3003/learn/database-engineering-with-postgresql); [Embeddings and Vector Search (8.1)](http://localhost:3003/learn/embeddings-and-vector-search); [Vector Databases (8.2)](http://localhost:3003/learn/vector-databases)
- **Read in order:** Querying nearest neighbors → Filtering → Joins and source metadata → Index query behavior.
- **Learn:** Combine similarity and ownership constraints Keep retrieved chunks traceable to sources
- **Why here:** The database must return authorized evidence with provenance; pgvector itself does not generate grounded answers.
- **Practical activity:** Write a tenant-filtered retrieval query that joins chunk/source metadata, then test an allowed query and a denied cross-tenant fixture.
- **Finished when:** Another tenant's chunks cannot appear Returned evidence includes source IDs and the query/model version
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [Graph RAG Knowledge Assistant](http://localhost:3003/projects/graph-rag-knowledge-assistant).
- **Next:** After the exercise, continue to Advanced RAG. Use the linked project milestone to connect these skills. [Advanced RAG (8.4)](http://localhost:3003/learn/advanced-rag)

#### pgvector-reference-8.4

- **Phase/topic:** 08 — RAG, Agents & Knowledge; [Advanced RAG (8.4)](http://localhost:3003/learn/advanced-rag). Stage: ADVANCED — RETURN LATER.
- **Open when:** Read index/filter tuning sections during Advanced RAG in Phase 08 only after measuring a working RAG baseline.
- **Prerequisites:** [Database Engineering with PostgreSQL (3.2)](http://localhost:3003/learn/database-engineering-with-postgresql); [Embeddings and Vector Search (8.1)](http://localhost:3003/learn/embeddings-and-vector-search); [Vector Databases (8.2)](http://localhost:3003/learn/vector-databases); [Traditional RAG (8.3)](http://localhost:3003/learn/traditional-rag)
- **Read in order:** HNSW and IVFFlat indexes → Filtering and approximate search → Iterative scans where supported → Exact-search comparison → Query plans.
- **Learn:** Measure recall against an exact baseline Explain filter/index interactions
- **Why here:** Approximate search and metadata filters can change recall; source-level measurements must precede a tuning claim.
- **Practical activity:** Compare exact retrieval with one ANN configuration on fixed labeled queries under the same tenant filter; record recall, latency and query settings.
- **Finished when:** The same authorized cases are used for both runs The report records index parameters and one failure case
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [Graph RAG Knowledge Assistant](http://localhost:3003/projects/graph-rag-knowledge-assistant).
- **Next:** After the exercise, continue to Graph Theory and Knowledge Graphs. Use the linked project milestone to connect these skills. [Graph Theory and Knowledge Graphs (8.5)](http://localhost:3003/learn/graph-theory-and-knowledge-graphs)

### 42. Windows Subsystem for Linux

Stable ID: `linux`. Original resource retained. Priority: **CORE**. [Official source](https://learn.microsoft.com/en-us/windows/wsl/). **C1–C12: PASS.** One resource/bookmark key `resource:linux`; 2 distinct visit(s).

Corrections to learning moments: `linux-primary` (focusSections, practicalTask, completionCriteria); `linux-reference-1.6-bash` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen, whyAtThisStage, practicalTask, learningObjectives, completionCriteria, nextStep, nextTopicId).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### linux-primary — primary placement

- **Phase/topic:** 00 — Computer Science Foundations; [Command Line and Linux (0.4)](http://localhost:3003/learn/command-line-and-linux). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during Command Line and Linux in Phase 00 after basic computer/OS concepts and Windows terminal navigation, if using Windows.
- **Prerequisites:** [Computer Fundamentals (0.1)](http://localhost:3003/learn/computer-fundamentals); [Operating Systems (0.2)](http://localhost:3003/learn/operating-systems)
- **Read in order:** Install WSL and choose a distribution → Basic WSL commands → Set up a WSL development environment → Working across Windows and Linux file systems → Running commands across the Windows/Linux boundary.
- **Learn:** Operate a local Linux environment Connect process and filesystem behavior to development
- **Why here:** You can practice server-like commands locally before adding containers or a cloud account.
- **Practical activity:** If using Windows, set up a WSL development environment and run a supplied hello-world command or program. Record the interpreter, working directory and Windows/Linux file paths. On Linux/macOS use the existing environment.
- **Finished when:** Explain where the interpreter and project files live Demonstrate the supplied command and identify the path boundary without requiring prior Python programming
- **Project connection:** [Python Student Management System](http://localhost:3003/projects/python-student-management-system); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Git and GitHub. Use the linked project milestone to connect these skills. [Git and GitHub (0.5)](http://localhost:3003/learn/git-and-github)

#### linux-reference-1.6-bash

- **Phase/topic:** 01 — Python & Programming; [Bash (1.6-bash)](http://localhost:3003/learn/bash). Stage: OPTIONAL REFERENCE.
- **Open when:** Consult the WSL environment and interoperability sections while studying Bash in Phase 01, after the command-line setup. This is an environment reference, not a Bash-language manual.
- **Prerequisites:** [Command Line and Linux (0.4)](http://localhost:3003/learn/command-line-and-linux); [Python Professional Development (1.5)](http://localhost:3003/learn/python-professional-development)
- **Read in order:** WSL basic commands → Set up a WSL development environment → Windows/Linux file interoperability → Running Linux commands from Windows.
- **Learn:** Identify the shell environment and file boundary Distinguish WSL setup from Bash syntax
- **Why here:** You need to know where a shell script runs and how paths cross the Windows/Linux boundary; the Bash lessons supply language concepts.
- **Practical activity:** Run a supplied harmless input-checking script in a temporary WSL directory and document its working directory, interpreter and Windows/Linux path mapping.
- **Finished when:** The supplied script runs in the documented environment Linux/macOS learners can state the equivalent existing-shell setup without installing WSL
- **Project connection:** [Python Student Management System](http://localhost:3003/projects/python-student-management-system); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Software Engineering Fundamentals. Use the linked project milestone to connect these skills. [Software Engineering Fundamentals (3.1)](http://localhost:3003/learn/software-engineering-fundamentals)

### 43. Ragas Documentation

Stable ID: `ragas`. Added resource retained. Priority: **OPTIONAL**. [Official source](https://docs.ragas.io/en/latest/). **C1–C12: PASS.** One resource/bookmark key `resource:ragas`; 2 distinct visit(s).

Corrections to learning moments: `ragas-visit-8.3-1` (projectIds).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### ragas-visit-8.3-1

- **Phase/topic:** 08 — RAG, Agents & Knowledge; [Traditional RAG (8.3)](http://localhost:3003/learn/traditional-rag). Stage: READ AFTER COMPLETING THIS TOPIC.
- **Open when:** Open after building a working Traditional RAG baseline in Phase 08 and reading its RAG evaluation lesson. Capture questions, evidence and answers before installing an evaluator.
- **Prerequisites:** [Embeddings and Vector Search (8.1)](http://localhost:3003/learn/embeddings-and-vector-search); [Vector Databases (8.2)](http://localhost:3003/learn/vector-databases); [Traditional RAG (8.3)](http://localhost:3003/learn/traditional-rag) Previous lessons: [RAG evaluation (8.3.19)](http://localhost:3003/learn/traditional-rag#8.3.19).
- **Read in order:** Representative evaluation dataset → Capturing retrieved contexts and answers → Selected faithfulness and retrieval metrics → Inspecting failures → Comparing a baseline.
- **Learn:** Measure retrieval separately from answer support. Recognize the limitations of judge-generated scores.
- **Why here:** The first document assistant now produces inspectable retrieval and answer traces, so evaluation can improve an actual baseline.
- **Practical activity:** Create a small versioned set of answerable and unanswerable PDF questions, evaluate the baseline with one chosen tool and inspect low-scoring cases.
- **Finished when:** The same questions and settings are retained for a later comparison. A short report separates retrieval failures from unsupported generated claims.
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant).
- **Next:** Improve only a measured retrieval weakness in Advanced RAG. Return for broader regression evaluation in Phase 10. [Advanced RAG (8.4)](http://localhost:3003/learn/advanced-rag)

#### ragas-primary — primary placement

- **Phase/topic:** 10 — Production, Security & MLOps; [AI and LLM Evaluation (10.4)](http://localhost:3003/learn/ai-and-llm-evaluation). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open the full evaluation workflow during AI and LLM Evaluation in Phase 10. First try a small RAG-specific evaluation after a working Traditional RAG baseline in Phase 08.
- **Prerequisites:** [LLM Internals (6.4)](http://localhost:3003/learn/llm-internals); [Embeddings and Vector Search (8.1)](http://localhost:3003/learn/embeddings-and-vector-search); [Vector Databases (8.2)](http://localhost:3003/learn/vector-databases); [Traditional RAG (8.3)](http://localhost:3003/learn/traditional-rag); [Software and API Testing (10.3)](http://localhost:3003/learn/software-and-api-testing)
- **Read in order:** Evaluation datasets → Faithfulness → Answer relevance → Context precision and recall → Experiment comparison → Failure inspection.
- **Learn:** Separate retrieval and response evaluation Interpret score limitations and compare the same cases
- **Why here:** Evaluation concepts are core, but this optional tool is useful once you can capture questions, retrieved evidence and answers from a real application.
- **Practical activity:** Compare baseline and improved retrieval for the document assistant using a fixed dataset; inspect low-scoring examples and write a short report.
- **Finished when:** Keep the dataset and settings fixed across comparisons Check sampled judge results manually and record limitations
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [Graph RAG Knowledge Assistant](http://localhost:3003/projects/graph-rag-knowledge-assistant); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to Docker and Containers. Use the linked project milestone to connect these skills. [Docker and Containers (10.5)](http://localhost:3003/learn/docker-and-containers)

### 44. DeepEval Documentation

Stable ID: `deepeval`. Added resource retained. Priority: **OPTIONAL**. [Official source](https://deepeval.com/docs/introduction). **C1–C12: PASS.** One resource/bookmark key `resource:deepeval`; 1 distinct visit(s).

Corrections to learning moments: `deepeval-primary` (prerequisiteTopicIds, focusSections, recommendedTiming, startWhen).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### deepeval-primary — primary placement

- **Phase/topic:** 10 — Production, Security & MLOps; [AI and LLM Evaluation (10.4)](http://localhost:3003/learn/ai-and-llm-evaluation). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during AI and LLM Evaluation in Phase 10 after testing fundamentals and a working LLM application. Choose DeepEval or Ragas for the first evaluation workflow; compare the second tool later only if useful.
- **Prerequisites:** [LLM Internals (6.4)](http://localhost:3003/learn/llm-internals); [Traditional RAG (8.3)](http://localhost:3003/learn/traditional-rag); [Software and API Testing (10.3)](http://localhost:3003/learn/software-and-api-testing); [AI Agents (8.7)](http://localhost:3003/learn/ai-agents)
- **Read in order:** Test cases and evaluation datasets → Relevancy and faithfulness metrics → Hallucination evaluation and judge limits → RAG evaluation → Agent/tool-use and multi-turn evaluation after AI Agents → Custom metrics and rubrics → Regression tests → Optional CI integration.
- **Learn:** Create repeatable quality tests Explain judge disagreement and failure cases
- **Why here:** A stable application and explicit rubrics let an evaluation framework detect regressions rather than assign unexplained numbers.
- **Practical activity:** Create normal, boundary and unsupported-question cases for CCAI or the document assistant, compare two versions and inspect failed assertions.
- **Finished when:** Tests distinguish an intentionally degraded response Document model/judge settings and manually inspect disputed scores
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to DevOps and CI/CD. Use the linked project milestone to connect these skills. [DevOps and CI/CD (10.7)](http://localhost:3003/learn/devops-and-ci-cd)

### 45. Promptfoo Documentation

Stable ID: `promptfoo`. Added resource retained. Priority: **OPTIONAL**. [Official source](https://www.promptfoo.dev/docs/getting-started/). **C1–C12: PASS.** One resource/bookmark key `resource:promptfoo`; 4 distinct visit(s).

Corrections to learning moments: `promptfoo-visit-10.3-1` (prerequisiteTopicIds, whyAtThisStage, learningObjectives, completionCriteria); `promptfoo-visit-10.4-2` (prerequisiteTopicIds, whyAtThisStage, learningObjectives, completionCriteria); `promptfoo-visit-10.7-3` (prerequisiteTopicIds, whyAtThisStage, learningObjectives, completionCriteria).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### promptfoo-primary — primary placement

- **Phase/topic:** 10 — Production, Security & MLOps; [AI and LLM Security (10.2)](http://localhost:3003/learn/ai-and-llm-security). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during AI and LLM Security in Phase 10 after prompt/context design, provider integration and OWASP application-security concepts; read the relevant LLM threat material first.
- **Prerequisites:** [Prompt Engineering and Context Design (6.7)](http://localhost:3003/learn/prompt-engineering-and-context-design); [AI Provider Integration (7.4)](http://localhost:3003/learn/ai-provider-integration); [Application Security (10.1)](http://localhost:3003/learn/application-security) Previous lessons: [Prompt injection (10.2.2)](http://localhost:3003/learn/ai-and-llm-security#10.2.2).
- **Read in order:** Prompt tests and assertions → Provider/prompt comparison → Regression checks → Authorized red-team quickstart → Prompt injection and disclosure tests → CI reports.
- **Learn:** Test normal and adversarial prompts Verify a mitigation with the same fixed cases
- **Why here:** You can describe the trust boundary and then test whether a prompt change or tool permission actually improves safety.
- **Practical activity:** Run bounded tests against your own CCAI test endpoint with synthetic inputs, document a failure, apply a mitigation and rerun the same cases.
- **Finished when:** No real secrets or private records appear in fixtures Reports explain both detected risks and test limitations
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Software and API Testing. Use the linked project milestone to connect these skills. [Software and API Testing (10.3)](http://localhost:3003/learn/software-and-api-testing)

#### promptfoo-visit-10.3-1

- **Phase/topic:** 10 — Production, Security & MLOps; [Software and API Testing (10.3)](http://localhost:3003/learn/software-and-api-testing). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Revisit Promptfoo during Software and API Testing in Phase 10 after the AI security introduction, using a small fixed CCAI test set.
- **Prerequisites:** [Prompt Engineering and Context Design (6.7)](http://localhost:3003/learn/prompt-engineering-and-context-design); [AI Provider Integration (7.4)](http://localhost:3003/learn/ai-provider-integration); [AI and LLM Security (10.2)](http://localhost:3003/learn/ai-and-llm-security)
- **Read in order:** Test inputs and assertions → Deterministic checks versus judge checks → Regression reports.
- **Learn:** Turn a rubric into a deterministic assertion where possible. Show that a deliberately degraded response fails a regression case.
- **Why here:** A locally working security fixture can now become a repeatable software test, rather than a one-off adversarial demonstration.
- **Practical activity:** Add normal and adversarial synthetic fixtures and show one assertion that catches a deliberate regression.
- **Finished when:** The fixed normal/adversarial suite fails on the deliberate regression. Fixtures contain no secrets and each failed assertion has an explanation.
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to AI and LLM Evaluation. Use the linked project milestone to connect these skills. [AI and LLM Evaluation (10.4)](http://localhost:3003/learn/ai-and-llm-evaluation)

#### promptfoo-visit-10.4-2

- **Phase/topic:** 10 — Production, Security & MLOps; [AI and LLM Evaluation (10.4)](http://localhost:3003/learn/ai-and-llm-evaluation). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Use the comparison sections during AI and LLM Evaluation after you have a representative dataset and a chosen baseline.
- **Prerequisites:** [Prompt Engineering and Context Design (6.7)](http://localhost:3003/learn/prompt-engineering-and-context-design); [AI Provider Integration (7.4)](http://localhost:3003/learn/ai-provider-integration); [AI and LLM Security (10.2)](http://localhost:3003/learn/ai-and-llm-security); [Software and API Testing (10.3)](http://localhost:3003/learn/software-and-api-testing)
- **Read in order:** Prompt/provider comparisons → Quality assertions → Cost and latency budgets → Judge limitations.
- **Learn:** Compare two variants on identical inputs. Separate deterministic assertions from uncertain judge scores.
- **Why here:** A representative dataset and explicit rubric let you compare prompt/provider variants across quality, security, latency and cost.
- **Practical activity:** Compare two prompt versions on identical fixtures; inspect quality, disclosure failures, latency and cost together.
- **Finished when:** Both variants use the same fixed cases and recorded settings. The report includes a failed example, score limits and measured cost/latency.
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Docker and Containers. Use the linked project milestone to connect these skills. [Docker and Containers (10.5)](http://localhost:3003/learn/docker-and-containers)

#### promptfoo-visit-10.7-3

- **Phase/topic:** 10 — Production, Security & MLOps; [DevOps and CI/CD (10.7)](http://localhost:3003/learn/devops-and-ci-cd). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Consider CI integration during DevOps and CI/CD after prompt tests work locally and evaluation cost is understood.
- **Prerequisites:** [Git and GitHub (0.5)](http://localhost:3003/learn/git-and-github); [Software and API Testing (10.3)](http://localhost:3003/learn/software-and-api-testing); [AI and LLM Evaluation (10.4)](http://localhost:3003/learn/ai-and-llm-evaluation); [Docker and Containers (10.5)](http://localhost:3003/learn/docker-and-containers); [Cloud Computing (10.6)](http://localhost:3003/learn/cloud-computing)
- **Read in order:** CI/CD integration → Controlled fixture counts → Secret handling → Reviewing evaluation artifacts.
- **Learn:** Bound a regression job's fixture count and provider cost. Protect credentials and retain an inspectable evaluation report.
- **Why here:** Only tests that already work locally and have understood cost should become automated checks; deployment remains a separate controlled step.
- **Practical activity:** Design a small manually reviewed regression job with synthetic fixtures and protected credentials; keep deployment independent.
- **Finished when:** The proposed job fails on a known regression and preserves its report. Fixture limits, permissions, secret handling and deployment separation are documented.
- **Project connection:** [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Logging, Monitoring, and Observability. Use the linked project milestone to connect these skills. [Logging, Monitoring, and Observability (10.8)](http://localhost:3003/learn/logging-monitoring-and-observability)

Selected precise official guides: [Authorized red-team quickstart](https://www.promptfoo.dev/docs/red-team/quickstart/); [CI/CD integration](https://www.promptfoo.dev/docs/integrations/ci-cd/).

### 46. NVIDIA CUDA Programming Guide

Stable ID: `cuda`. Added resource retained. Priority: **OPTIONAL**. [Official source](https://docs.nvidia.com/cuda/cuda-programming-guide/). **C1–C12: PASS.** One resource/bookmark key `resource:cuda`; 2 distinct visit(s).

Reviewed: no learning-moment content correction was required. Resource identity, link targets and classification passed.

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### cuda-primary — primary placement

- **Phase/topic:** 05 — Deep Learning & PyTorch; [GPU and Model Training Fundamentals (5.4)](http://localhost:3003/learn/gpu-and-model-training-fundamentals). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open only the introductory concepts during GPU and Model Training Fundamentals in Phase 05 after PyTorch tensor operations. Return to kernel programming in Phase 11 only if choosing that specialization.
- **Prerequisites:** [Functions and Modular Programming (1.2)](http://localhost:3003/learn/functions-and-modular-programming); [Linear Algebra (2.5)](http://localhost:3003/learn/linear-algebra); [PyTorch (5.2)](http://localhost:3003/learn/pytorch) Previous lessons: [VRAM (5.4.3)](http://localhost:3003/learn/gpu-and-model-training-fundamentals#5.4.3).
- **Read in order:** Programming-model overview → Parallel execution → GPU memory → Threads and blocks conceptually → Memory hierarchy → Host/device movement → Basic performance measurement.
- **Learn:** Explain CPU/GPU data movement Estimate and inspect device-memory use
- **Why here:** GPU and memory understanding is core; reading a selected implementation guide can clarify those ideas without making custom kernels compulsory.
- **Practical activity:** Where compatible NVIDIA hardware exists, measure a tiny tensor operation and memory use. Otherwise trace a documented execution diagram and write a measurement plan.
- **Finished when:** Distinguish transfer time from computation time Explain the memory budget or clearly label reference-only observations
- **Project connection:** [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Natural Language Processing. Use the linked project milestone to connect these skills. [Natural Language Processing (6.1)](http://localhost:3003/learn/natural-language-processing)

#### cuda-visit-11.3-1

- **Phase/topic:** 11 — Advanced AI Architecture; [Model Serving and Inference Optimization (11.3)](http://localhost:3003/learn/model-serving-and-inference-optimization). Stage: ADVANCED — RETURN LATER.
- **Open when:** Return in Phase 11 after serving/inference basics and only if you choose low-level CUDA programming. Learn C++ ownership and the necessary language subset before writing custom kernels.
- **Prerequisites:** [GPU and Model Training Fundamentals (5.4)](http://localhost:3003/learn/gpu-and-model-training-fundamentals); [LLM Internals (6.4)](http://localhost:3003/learn/llm-internals); [Concurrency and Performance (9.6)](http://localhost:3003/learn/concurrency-and-performance); [C++ — Optional Systems Path (1.7-cpp)](http://localhost:3003/learn/cpp-optional-systems-path) Previous lessons: [GPU inference (11.3.6)](http://localhost:3003/learn/model-serving-and-inference-optimization#11.3.6).
- **Read in order:** Kernel execution concepts → Memory access and transfers → Profiling → Performance trade-offs → Multi-GPU concepts only when needed.
- **Learn:** Explain CPU/GPU data movement Estimate and inspect device-memory use
- **Why here:** A measured serving bottleneck is needed to justify the extra complexity of low-level accelerator code.
- **Practical activity:** With compatible hardware, profile one small existing computation before and after a single change. Without it, analyze a documented kernel and produce a testable experiment plan.
- **Finished when:** Separate measured results from reference-only analysis. Document correctness, precision, memory and timing assumptions.
- **Project connection:** [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to High Availability and Reliability. Use the linked project milestone to connect these skills. [High Availability and Reliability (11.4)](http://localhost:3003/learn/high-availability-and-reliability)

### 47. Ray Documentation

Stable ID: `ray`. Added resource retained. Priority: **ADVANCED**. [Official source](https://docs.ray.io/en/latest/). **C1–C12: PASS.** One resource/bookmark key `resource:ray`; 2 distinct visit(s).

Corrections to learning moments: `ray-primary` (prerequisiteTopicIds, previousLessonIds); `ray-serve` (prerequisiteTopicIds, previousLessonIds).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### ray-primary — primary placement

- **Phase/topic:** 11 — Advanced AI Architecture; [Model Serving and Inference Optimization (11.3)](http://localhost:3003/learn/model-serving-and-inference-optimization). Stage: ADVANCED — RETURN LATER.
- **Open when:** Return in Phase 11 during Model Serving and Inference Optimization after Python concurrency, queues, distributed systems and basic model inference.
- **Prerequisites:** [Advanced Python (1.4)](http://localhost:3003/learn/advanced-python); [GPU and Model Training Fundamentals (5.4)](http://localhost:3003/learn/gpu-and-model-training-fundamentals); [LLM Internals (6.4)](http://localhost:3003/learn/llm-internals); [Queues and Background Processing (9.4)](http://localhost:3003/learn/queues-and-background-processing); [Distributed Systems (9.5)](http://localhost:3003/learn/distributed-systems); [Concurrency and Performance (9.6)](http://localhost:3003/learn/concurrency-and-performance); [AI System Architecture (11.1)](http://localhost:3003/learn/ai-system-architecture) Previous lessons: [What is model serving? (11.3.1)](http://localhost:3003/learn/model-serving-and-inference-optimization#11.3.1); [GPU inference (11.3.6)](http://localhost:3003/learn/model-serving-and-inference-optimization#11.3.6).
- **Read in order:** Ray Core tasks → Actors → Object references → CPU/GPU resource scheduling → Distributed execution → Fault tolerance → Ray Serve only when justified.
- **Learn:** Compare sequential and parallel execution Explain resource and failure constraints
- **Why here:** You can now determine whether distributed execution solves a measured workload problem rather than replacing a simple queue by fashion.
- **Practical activity:** Run a small sequential and Ray task-based workload, compare overhead and speed, then consider Serve only for a real serving requirement.
- **Finished when:** Record workload, resources and elapsed time Explain one case where distribution does not help
- **Project connection:** [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to High Availability and Reliability. Use the linked project milestone to connect these skills. [High Availability and Reliability (11.4)](http://localhost:3003/learn/high-availability-and-reliability)

#### ray-serve

- **Phase/topic:** 11 — Advanced AI Architecture; [Model Serving and Inference Optimization (11.3)](http://localhost:3003/learn/model-serving-and-inference-optimization). Stage: ADVANCED — RETURN LATER.
- **Open when:** Consider Ray Serve during the advanced production-platform project only after the Ray Core exercise and evidence that distributed serving is required.
- **Prerequisites:** [Advanced Python (1.4)](http://localhost:3003/learn/advanced-python); [LLM Internals (6.4)](http://localhost:3003/learn/llm-internals); [Queues and Background Processing (9.4)](http://localhost:3003/learn/queues-and-background-processing); [Distributed Systems (9.5)](http://localhost:3003/learn/distributed-systems); [Scalable AI Systems (9.7)](http://localhost:3003/learn/scalable-ai-systems); [AI System Architecture (11.1)](http://localhost:3003/learn/ai-system-architecture) Previous lessons: [What is model serving? (11.3.1)](http://localhost:3003/learn/model-serving-and-inference-optimization#11.3.1); [GPU inference (11.3.6)](http://localhost:3003/learn/model-serving-and-inference-optimization#11.3.6).
- **Read in order:** Ray Serve overview → Deployments and replicas → Request handling → Model composition → Resource allocation → Failure behavior.
- **Learn:** Compare sequential and parallel execution Explain resource and failure constraints
- **Why here:** Serving orchestration adds operational cost; the parallel-workload comparison should establish a need before a framework is adopted.
- **Practical activity:** If justified, serve one small model and test a failure or concurrency limit, comparing the design with a simpler single-process baseline.
- **Finished when:** State why a simpler deployment is insufficient. Record model, workload, resources and failure behavior.
- **Project connection:** [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to High Availability and Reliability. Use the linked project milestone to connect these skills. [High Availability and Reliability (11.4)](http://localhost:3003/learn/high-availability-and-reliability)

Selected precise official guides: [Ray Core concepts](https://docs.ray.io/en/latest/ray-core/key-concepts.html); [Ray Serve](https://docs.ray.io/en/latest/serve/).

### 48. Terraform Documentation

Stable ID: `terraform`. Added resource retained. Priority: **OPTIONAL**. [Official source](https://developer.hashicorp.com/terraform/docs). **C1–C12: PASS.** One resource/bookmark key `resource:terraform`; 1 distinct visit(s).

Corrections to learning moments: `terraform-primary` (prerequisiteTopicIds, focusSections).

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### terraform-primary — primary placement

- **Phase/topic:** 10 — Production, Security & MLOps; [DevOps and CI/CD (10.7)](http://localhost:3003/learn/devops-and-ci-cd). Stage: USE DURING PROJECT.
- **Open when:** Open after your first successful manual cloud deployment, during DevOps and CI/CD in Phase 10 or the production-platform project.
- **Prerequisites:** [Computer Networking (0.3)](http://localhost:3003/learn/computer-networking); [Command Line and Linux (0.4)](http://localhost:3003/learn/command-line-and-linux); [Git and GitHub (0.5)](http://localhost:3003/learn/git-and-github); [Docker and Containers (10.5)](http://localhost:3003/learn/docker-and-containers); [Cloud Computing (10.6)](http://localhost:3003/learn/cloud-computing)
- **Read in order:** Infrastructure as Code → Providers and resources → Variables and outputs → State protection → Modules → Core workflow: write, plan and approved apply → Destroy and lifecycle safety: read and plan only → Environment separation.
- **Learn:** Review an infrastructure plan Protect state and separate environments
- **Why here:** A known working deployment gives you a baseline to encode and review before introducing infrastructure automation.
- **Practical activity:** Define a minimal learning environment, validate the configuration and review a plan; document state access, expected cost and cleanup decisions.
- **Finished when:** Explain every planned resource/change Document secret/state protection and the approval boundary for real changes
- **Project connection:** [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Logging, Monitoring, and Observability. Use the linked project milestone to connect these skills. [Logging, Monitoring, and Observability (10.8)](http://localhost:3003/learn/logging-monitoring-and-observability)

Selected precise official guides: [Core workflow](https://developer.hashicorp.com/terraform/intro/core-workflow).

### 49. GitHub Actions Documentation

Stable ID: `github-actions`. Added resource retained. Priority: **CORE**. [Official source](https://docs.github.com/en/actions/get-started/understand-github-actions). **C1–C12: PASS.** One resource/bookmark key `resource:github-actions`; 1 distinct visit(s).

Reviewed: no learning-moment content correction was required. Resource identity, link targets and classification passed.

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### github-actions-primary — primary placement

- **Phase/topic:** 10 — Production, Security & MLOps; [DevOps and CI/CD (10.7)](http://localhost:3003/learn/devops-and-ci-cd). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during DevOps and CI/CD in Phase 10 after Git, Python Professional Development and Software and API Testing.
- **Prerequisites:** [Git and GitHub (0.5)](http://localhost:3003/learn/git-and-github); [Python Professional Development (1.5)](http://localhost:3003/learn/python-professional-development); [Software and API Testing (10.3)](http://localhost:3003/learn/software-and-api-testing)
- **Read in order:** Workflows and events → Jobs and steps → Runners → YAML configuration → Build/test/typecheck/lint steps → Secrets → Environment protection.
- **Learn:** Create a small reproducible CI workflow Keep deployment credentials out of untrusted jobs
- **Why here:** You already have meaningful checks to automate, so a workflow can provide useful feedback without unnecessary release complexity.
- **Practical activity:** Create a CI pipeline for curriculum validation, TypeScript, lint, tests and build; keep any later deployment in a separately controlled workflow.
- **Finished when:** A deliberate failing check fails the job Secrets and environment protection are documented before deployment is added
- **Project connection:** [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Logging, Monitoring, and Observability. Use the linked project milestone to connect these skills. [Logging, Monitoring, and Observability (10.8)](http://localhost:3003/learn/logging-monitoring-and-observability)

### 50. Celery Documentation

Stable ID: `celery`. Added resource retained. Priority: **CORE**. [Official source](https://docs.celeryq.dev/en/stable/). **C1–C12: PASS.** One resource/bookmark key `resource:celery`; 1 distinct visit(s).

Reviewed: no learning-moment content correction was required. Resource identity, link targets and classification passed.

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### celery-primary — primary placement

- **Phase/topic:** 09 — System Design & Scalability; [Queues and Background Processing (9.4)](http://localhost:3003/learn/queues-and-background-processing). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during Queues and Background Processing in Phase 09 after Python async concepts, FastAPI and the introductory queue/broker lessons.
- **Prerequisites:** [Functions and Modular Programming (1.2)](http://localhost:3003/learn/functions-and-modular-programming); [Object-Oriented Programming (1.3)](http://localhost:3003/learn/object-oriented-programming); [Advanced Python (1.4)](http://localhost:3003/learn/advanced-python); [FastAPI (7.2)](http://localhost:3003/learn/fastapi) Previous lessons: [Message queues (9.4.2)](http://localhost:3003/learn/queues-and-background-processing#9.4.2); [Brokers (9.4.5)](http://localhost:3003/learn/queues-and-background-processing#9.4.5).
- **Read in order:** First steps → Brokers and workers → Task execution and states → Acknowledgement → Retries and idempotency → Periodic tasks → Monitoring → Result handling.
- **Learn:** Design durable background work Handle duplicate delivery safely
- **Why here:** You can distinguish an in-process background task from work that needs a separate worker, durable delivery and recovery.
- **Practical activity:** Implement a background document-ingestion job with a stable idempotency key, bounded retries and an inspectable failure state.
- **Finished when:** Duplicate delivery does not create duplicate logical documents A worker failure leaves a documented retry or dead-letter path
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [Production-Ready Scalable AI Platform](http://localhost:3003/projects/production-ready-scalable-ai-platform).
- **Next:** After the exercise, continue to Distributed Systems. Use the linked project milestone to connect these skills. [Distributed Systems (9.5)](http://localhost:3003/learn/distributed-systems)

Selected precise official guides: [First steps](https://docs.celeryq.dev/en/stable/getting-started/first-steps-with-celery.html).

### 51. OpenAI Prompt Engineering Guide

Stable ID: `prompt-engineering`. Added resource retained. Priority: **OPTIONAL**. [Official source](https://developers.openai.com/api/docs/guides/prompt-engineering). **C1–C12: PASS.** One resource/bookmark key `resource:prompt-engineering`; 3 distinct visit(s).

Reviewed: no learning-moment content correction was required. Resource identity, link targets and classification passed.

Content verification: **verified**. Official public page retrieved. Documentation is free to read; execution, hardware and hosted services may have separate costs.

#### prompt-engineering-primary — primary placement

- **Phase/topic:** 06 — NLP, Transformers & LLMs; [Prompt Engineering and Context Design (6.7)](http://localhost:3003/learn/prompt-engineering-and-context-design). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Open during Prompt Engineering and Context Design in Phase 06 after Language Model Fundamentals and LLM Internals.
- **Prerequisites:** [Language Model Fundamentals (6.2)](http://localhost:3003/learn/language-model-fundamentals); [LLM Internals (6.4)](http://localhost:3003/learn/llm-internals)
- **Read in order:** Message roles and instructions → Task and context structure → Zero-shot and examples → Typed prompt variables → Code-managed templates and versioning → Structured outputs with validation → Fixed prompt evaluations.
- **Learn:** Write a testable prompt contract Compare prompt variants without trusting fluent output
- **Why here:** You can distinguish context and inference from model training, so prompt behavior can be tested as part of an application contract.
- **Practical activity:** Build two or three code-managed prompt variants, test the same normal and edge inputs and record response quality, tokens and latency; validate any JSON output.
- **Finished when:** Keep test fixtures and prompt versions reproducible Explain one regression and one provider-specific behavior
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to LLM Training and Adaptation. Use the linked project milestone to connect these skills. [LLM Training and Adaptation (6.5)](http://localhost:3003/learn/llm-training-and-adaptation)

#### prompt-engineering-visit-7.4-1

- **Phase/topic:** 07 — Backend & AI Engineering; [AI Provider Integration (7.4)](http://localhost:3003/learn/ai-provider-integration). Stage: LEARN DURING THIS TOPIC.
- **Open when:** Revisit the provider implementation details during AI Provider Integration in Phase 07, after designing a tested prompt contract in Phase 06.
- **Prerequisites:** [Prompt Engineering and Context Design (6.7)](http://localhost:3003/learn/prompt-engineering-and-context-design); [FastAPI (7.2)](http://localhost:3003/learn/fastapi)
- **Read in order:** Message roles and instruction boundaries → Typed template variables → Schema validation → Versioned prompt fixtures → Context limits.
- **Learn:** Keep provider syntax behind an adapter. Validate structured output before application use.
- **Why here:** The prompt is now part of a validated API boundary with explicit credentials, timeout handling and output checks.
- **Practical activity:** Integrate one versioned template through a mockable provider adapter, rejecting invalid output and recording the template version without logging private inputs.
- **Finished when:** The adapter can be tested with supplied responses. Invalid JSON or semantic values produce controlled errors.
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to Token and Cost Engineering. Use the linked project milestone to connect these skills. [Token and Cost Engineering (7.5)](http://localhost:3003/learn/token-and-cost-engineering)

#### prompt-engineering-visit-11.2-2

- **Phase/topic:** 11 — Advanced AI Architecture; [Intelligent Model Routing (11.2)](http://localhost:3003/learn/intelligent-model-routing). Stage: ADVANCED — RETURN LATER.
- **Open when:** Return during Intelligent Model Routing in Phase 11 only after evaluation fundamentals and provider adapters are working.
- **Prerequisites:** [Prompt Engineering and Context Design (6.7)](http://localhost:3003/learn/prompt-engineering-and-context-design); [AI Provider Integration (7.4)](http://localhost:3003/learn/ai-provider-integration); [AI and LLM Evaluation (10.4)](http://localhost:3003/learn/ai-and-llm-evaluation); [AI System Architecture (11.1)](http://localhost:3003/learn/ai-system-architecture)
- **Read in order:** Prompt/version comparison → Context selection → Task contracts → Structured output validation → Regression evaluations.
- **Learn:** Evaluate routing and prompt changes together. Record provider-specific differences rather than assuming portability.
- **Why here:** Changing the selected model or context assembly can change task behavior even when the prompt text remains identical.
- **Practical activity:** Compare two CCAI routing/prompt configurations on the same fixtures; record quality, cost, latency and validation failures.
- **Finished when:** The comparison uses identical cases and a fixed baseline. A provider-specific regression is documented.
- **Project connection:** [RAG Document Assistant](http://localhost:3003/projects/rag-document-assistant); [CCAI Intelligent Model Router](http://localhost:3003/projects/ccai-intelligent-model-router).
- **Next:** After the exercise, continue to Model Serving and Inference Optimization. Use the linked project milestone to connect these skills. [Model Serving and Inference Optimization (11.3)](http://localhost:3003/learn/model-serving-and-inference-optimization)

## Verification results

| Command                                                                                 | Actual final result                                                                               |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `npm run check:curriculum`                                                              | PASS — 12 phases, 83 topics, 1,313 lessons, 51 resources, 7 projects, 53 technologies             |
| `npm run typecheck`                                                                     | PASS — no TypeScript errors                                                                       |
| `npm run lint`                                                                          | PASS — no errors or warnings                                                                      |
| `npm test`                                                                              | PASS — 23 tests, 0 failed, 0 skipped                                                              |
| `npm run build`                                                                         | PASS — Next.js 16.4.3 production build, 120 static pages generated                                |
| `SMOKE_BASE_URL=http://localhost:3003 npm run check:resource-internal-links -- --write` | PASS — 1190 references, 163 distinct targets, 103 pages, 10 distinct lesson fragments, 0 failures |
| `npm run test:routes` with the same base URL                                            | PASS — 114/114 pages; 404, lesson/resource metadata search, resource controls and state endpoint  |
| `npm run check:resource-links -- --write`                                               | PASS for reachability — 62/62 URLs responded successfully                                         |

Internal audit evidence: [resource-internal-link-audit.json](D:/ONEDAY/docs/resource-internal-link-audit.json). External reachability evidence: [resource-link-check.json](D:/ONEDAY/docs/resource-link-check.json). Complete per-resource/per-moment audit data: [resource-final-audit.json](D:/ONEDAY/docs/resource-final-audit.json).

The validator now rejects missing explicit contextual plans, future prerequisites presented as learn-now, circular prerequisites except a deliberately after-topic visit, misplaced sequence numbers, unlabeled advanced visits, duplicate prerequisites/projects and JSON/PSV editorial drift. Regression tests cover current/deferred reference labels, earliest future visits, specific source/project corrections, missing next-topic fallbacks and unverified sources losing their old verification date.

## Remaining links/content that could not be verified

No internal target failed, and none of the 62 catalog main/supplemental URLs failed the reachability check. A successful HTTP response does not establish that specific client-rendered legal documents are readable or current.

| Resource / link                                                                                  | What was verified                            | What remains unverified                                                                        | Handling                                                                                                                  |
| ------------------------------------------------------------------------------------------------ | -------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `privacy-india` — [MeitY official portal](https://www.meity.gov.in/)                             | Official origin and successful HTTP response | Its client-rendered data-protection source material could not be inspected in this environment | Catalog status is `needs_review`; `verifiedAt` is cleared; the card explains the limit. Original ID and URL are retained. |
| [MeitY Act-page candidate](https://www.meity.gov.in/digital-personal-data-protection-act-2023-4) | Official search result / HTML response       | The page yielded no readable legal text                                                        | Not added as a verified supplemental catalog link. Manual inspection of current official documents remains necessary.     |

No browser visual or live Supabase account/email result is claimed by this audit. Its internal-link evidence comes from the freshly built local HTML, and persistence/ownership evidence comes from the PostgreSQL integration and import-compatibility tests. No database contents, auth settings, environment variables, production deployment or existing project requirement/checklist positions were changed.

## Audit implementation files

- Authored revisit plans: `src/data/resource-revisits.psv` and `src/data/resource-revisits.json`.
- Corrected primary plans/editorial mirror: `src/data/resource-plans.json` and `src/data/resource-plans.psv`.
- Corrected assembly and verification: `src/data/resource-learning.ts` and `src/data/resource-verification.json`.
- Corrected contextual grouping and the filtered-library link: `src/lib/resource-learning.ts` and `src/components/resource-card.tsx`.
- Stronger validator/tests: `scripts/validate-resource-learning.ts` and `tests/resource-learning.test.ts`.
- Reproducible HTML link audit: `scripts/check-resource-internal-links.ts`, its package command, and `docs/resource-internal-link-audit.json`.
- Updated URL evidence and this Markdown/JSON audit report. The earlier upgrade report links here as the final authority.

Local review: [Resources](http://localhost:3003/resources). No commit, push or deployment was performed.
