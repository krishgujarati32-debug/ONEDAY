# Authentication flow

The current integration uses `@supabase/ssr`, cookie-based browser/server clients and the Next.js 16 `proxy.ts` convention. The request proxy refreshes tokens through `getClaims()` and forwards all updated cookies to both the downstream request and the browser response.

The configured private dashboard/settings/saved routes redirect to sign-in. Public lessons and resources stay accessible. Data reads and writes independently call server-side `auth.getUser()`; redirect checks are never the data authorization boundary.

Sign-up requests an email confirmation unless the project's own Supabase configuration bypasses confirmation. Sign-in uses email/password. PKCE redirects exchange an authorization code at `/auth/callback`. Token-hash email templates may instead use `/auth/confirm` with a validated email OTP type. Recovery directs users to `/auth/update-password`; authenticated password updates use Supabase's API. Invalid/expired callback links return a useful sign-in error.

Redirect destinations must be local absolute paths and cannot begin with `//` or contain a backslash. Sign-out clears the Supabase session, reloads provider state and returns to the public homepage.

If public configuration is absent, account forms explain preview mode and link to local learning/setup instead of pretending to create an account. Configured but signed-out users never save progress to a local account substitute. Preview exports can be explicitly imported after sign-in.

Check actual email templates, allowlisted redirects, SMTP and session refresh on your own project. Local tests cannot establish email delivery or behavior of external project settings.

Official integration reference: [Supabase SSR client setup](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs).
