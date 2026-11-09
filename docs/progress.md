# Learning progress and retained data

The dashboard uses the active lesson manifest as its denominator. The recommendation follows the ordered lessons and pauses at topic practice after that topic’s lessons are complete. Visiting another topic does not change that recommendation. An empty path is zero percent, and the final lesson and practice leave no next step.

Lesson states remain not started, in progress, completed and needs revision. Completing a lesson stores its UTC timestamp. The learner can undo the completion or explicitly mark it for revision. Opening a page never completes a lesson.

Retained lessons use their existing IDs. A moved lesson carries the saved state and timestamp to its new location automatically through that ID. Retired IDs remain valid in saved state, including version 1 exports. They do not add active lesson credit. Project milestones retain their keys when the expected work is the same. The combined ingestion, RAG and MCP project uses separate keys. Prior RAG and MCP checks remain in backups.

The existing Supabase revision checks, RLS and authenticated save transaction apply to both active and historical records. Browser preview keeps the original local storage key. The V5 evidence and checkpoint IDs use the current progress table. The planner archive uses the additive planner compatibility migration. To transfer preview progress to a cloud account, export JSON, sign in, then review and confirm the import through Account & data.

The [original migration map](../src/data/curriculum-migration-map.json) and the [V5 migration map](../src/data/v5-migration-map.json) record the two generations of curriculum changes. See [database schema](database.md) for the persistence boundary.
