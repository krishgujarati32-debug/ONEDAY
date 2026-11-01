# Row Level Security

Every exposed personal-data table has an owner policy for the authenticated role:

```sql
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id)
```

`USING` restricts visible existing rows for reads, updates and deletion. `WITH CHECK` restricts inserted and updated ownership. The anonymous role has no table privileges. Database foreign keys keep user-owned data associated with real users.

RPC functions are `SECURITY INVOKER`, set an empty search path and qualify schema references. They check that `auth.uid()` exists and rely on the same owner policies. Execute privileges are revoked from public/anonymous roles. No function accepts a user ID argument, and no service-role key is used by the application.

The state API applies independent identity validation and a static curriculum ID allowlist. Text notes are rendered as text, never executed HTML. Database errors are logged server-side; clients receive useful bounded failure messages.

Run `npm test`. `tests/database.test.ts` boots PostgreSQL through PGlite, supplies a minimal auth schema and two identities, applies the **actual migration**, and verifies owner round-trips, cross-user SELECT/INSERT/UPDATE/DELETE denial on every table, anonymous denial, atomic rollback and revision conflicts. Only authentication identity plumbing is mocked.

Before production, repeat isolation checks with two real Supabase accounts, confirm RLS is enabled in the dashboard and attempt direct REST/RPC access with the non-owner JWT. The local policy test is strong migration evidence but does not verify your project's deployed configuration.
