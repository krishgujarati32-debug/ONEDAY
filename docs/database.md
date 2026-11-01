# Database schema

All user-owned tables reference `auth.users(id)` with cascading deletion and enforce RLS.

| Table               | Key / uniqueness                        | Data                                                                 |
| ------------------- | --------------------------------------- | -------------------------------------------------------------------- |
| `user_settings`     | `user_id` primary key                   | Name, daily goal, theme, language, last topic, revision, update time |
| `learning_progress` | UUID primary key; unique user/subtopic  | Status, completion timestamp, create/update times                    |
| `notes`             | user/item key                           | Text for a topic, subtopic or project; update time                   |
| `bookmarks`         | UUID primary key; unique user/type/item | Topic, subtopic, resource or project target                          |
| `study_sessions`    | UUID primary key; user/date index       | Topic, date, minutes, notes and create time                          |
| `project_checks`    | user/item key                           | Boolean functional requirement completion                            |

`learning_progress.notes` is retained as a compatibility field; the UI consistently stores editable notes in the unified `notes` table.

`read_learning_state()` returns the owner's records in the validated application shape. A new account receives real empty collections and default settings without seeded progress. Timestamp serialization is normalized to UTC ISO strings.

`save_learning_state(payload, expected_revision)` inserts a settings row when necessary, locks that row, compares the revision, replaces only the caller's learning rows and increments the revision in the same transaction. A failure rolls back every table update. Every SQL write sets user ownership from `auth.uid()`; clients cannot nominate a target account.

Database constraints validate statuses, status/date agreement, bounds, item types, uniqueness and foreign-key ownership existence. The server additionally validates static curriculum IDs and payload shape. Static curriculum content is not duplicated into the personal-data database.

Migration: `supabase/migrations/202611010001_learning_platform.sql`. Apply once to a new project, then add subsequent versioned migrations for future changes. Do not repeatedly rerun a create-table migration against a populated production database.
