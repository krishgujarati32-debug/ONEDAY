# Curriculum structure

`outline.json` preserves the ordered master curriculum: 12 phases, 79 original topics and 1,276 original subtopics. The supporting-language section is split into JavaScript/TypeScript, SQL and Bash, each with its own learning page. `curriculum.ts` also adds 3 optional Java, Go and C++ topics with 15 lessons. Totals are derived, never stored in dashboard components.

Topic packs in `knowledge.json` supply the explanation, why, engineering application and integrated assignment. `lessons.json` supplies a distinct context-appropriate definition at each ordered subtopic index. The assembly adds structured study objectives, application context, exercises, completion criteria, estimates and reference IDs. All original titles are retained.

IDs such as `1.2` and `1.2.3` are persistent data identifiers. Slugs are URL identifiers. Treat IDs as stable after deployment: changing them requires a deliberate migration of progress, notes and bookmarks. Do not reuse an existing ID for a different learning concept.

Core topics are the main path. Fine-tuning, advanced RAG, Graph RAG, the final architecture phase and selected situational tools are advanced/optional exploration. Essential preceding core concepts remain available independently. Mathematics is explicitly a parallel track. Optional supporting languages do not become core prerequisites.

Resource relationships live in `resources.ts`; topic-specific mappings take precedence over phase defaults. Technology records link to valid topics. Project requirements have stable indexed checklist IDs. If reordering a published project checklist, migrate those stored IDs too.

After changes:

```powershell
npm run curriculum:index
npm run check:curriculum
npm test
```

The validator checks unique IDs/slugs, original coverage and order, nonempty educational content, prerequisites, resource references, technology relationships and generated index parity. It validates URL syntax; external availability is separately checked against official sources and can change after the verification date.
