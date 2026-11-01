# Progress calculations

Every lesson is independently marked `not_started`, `in_progress`, `completed` or `needs_revision`. A completed record has an ISO UTC `completedAt`; all other statuses have a null completion date. Checkbox completion can be undone. Topic revision is explicit and can be reversed without overwriting unrelated topics.

For any set of lessons:

`percentage = completed lesson count / actual lesson count × 100`

An empty set is 0%. Display rounds to at most one decimal; stored calculations keep full precision. Five completed lessons out of eight display 62.5%.

- Topic/phase percentages include **all** lessons in that topic/phase, as their labels explain.
- Core percentage includes only lessons whose priority is `core`.
- Optional percentage combines `optional` and `advanced` lessons.
- Overall percentage includes both groups.
- `needs_revision` is not complete. Revision takes precedence in topic status, followed by partial/in-progress behavior. A topic is complete only when every lesson is complete.

The next recommendation finds the earliest incomplete core lesson's topic. Only after core completion does it suggest optional material. Continue Learning resumes an incomplete last-visited topic, otherwise uses that recommendation. No topic is completed because time elapsed.

Study minutes come only from submitted sessions. The weekly chart groups by the learner's local Monday–Sunday calendar week; date-only session values avoid converting local study dates through UTC. Completion timestamps are grouped by the browser's local date. Revision clears current completion timestamps, so the chart shows currently completed lessons rather than an immutable activity history.

The weekly goal is seven times the daily goal. The completion estimate divides remaining core lesson minutes by the goal and rounds up; it is expressed as study days, not a guaranteed graduation date. Projects and revision add time. Project checklists are tracked independently of lesson completion.
