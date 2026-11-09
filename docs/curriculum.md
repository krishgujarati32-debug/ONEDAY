# Curriculum authoring and validation

The active sequence is assembled by `src/data/curriculum.ts` from `course-sequence.ts`, the authored `course-v5-*.ts` topic batches, `course-labs.ts` and retained definitions from the published curriculum. `projects.ts`, `resources.ts` and `technologies.ts` provide the fixed portfolio, contextual references and technology catalog.

The original outline, knowledge and definition files are retained editorial inputs. The legacy assembler validates that published resource relationships and historical identities remain reproducible. Current pages and active progress use the generated V5 manifest. Earlier curriculum IDs remain legal in persisted snapshots and backups.

Phase numbers are 01–14. Lesson numbers derive from position. Lesson IDs are durable keys and may differ from the displayed sequence. Keep a published lesson ID only if its original objective remains the same. When a new exercise changes the scope, use a new ID. Move links and relationship metadata together.

Run `npm run curriculum:index` followed by `npm run check:curriculum` and `npm run check:curriculum:v5`. The validator checks exact phase order, contiguous prerequisite chains, identity uniqueness, required content, resource and project relationships, published objective preservation, exhaustive historical dispositions and generated-data parity. HTML route and anchor checks require a local running server.

See the [V5 coverage, migration and verification record](v5-implementation.md) and the [exact topic contract](../src/data/v5-targets.json).
