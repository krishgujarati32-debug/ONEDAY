# Deploying to Vercel

1. Run `npm ci`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run check:curriculum` and `npm run build`.
2. Create a GitHub repository, commit source and lockfile, and push. Keep `.env.local`, `.next` and `node_modules` out of source control.
3. Create a Supabase project. Apply the included migration once and configure email/password authentication.
4. Import the GitHub repository in Vercel using the Next.js framework preset. Use `npm ci` and `npm run build`; do not select static export or override the output folder.
5. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to Production. Configure Preview separately, preferably with a different Supabase project.
6. Deploy and set the Supabase canonical Site URL to the resulting production domain. Add the precise callback/recovery URLs to the authentication redirect allowlist. If a custom domain is introduced later, update those values again.
7. Test the actual deployment before relying on it for long-term study. A changed build-time public variable requires a fresh deployment.

## Production verification checklist

- [ ] The homepage, all navigation and a representative lesson load over HTTPS.
- [ ] Missing credentials produce a clear preview notice; production credentials remove that notice after sign-in.
- [ ] A fresh account starts at zero with no sessions, notes or bookmarks.
- [ ] Sign-up delivers a real confirmation email and the link reaches the expected domain.
- [ ] Sign-in and sign-out work. Private pages redirect when signed out; public curriculum stays open.
- [ ] Password recovery delivers a usable link and permits an authenticated password update.
- [ ] The session remains usable after token refresh.
- [ ] Complete a lesson, save a note and bookmark, log a session, then reload.
- [ ] Sign in from another browser/device and verify those records.
- [ ] Use a second account to verify it cannot read or modify the first account's data through direct REST/RPC requests.
- [ ] Try simultaneous browser tabs: a stale save must fail visibly instead of replacing newer data.
- [ ] Export data, validate merge/replace import, and confirm reset only on a disposable test account.
- [ ] Check mobile navigation, keyboard focus, dialog dismissal, dark/light/system appearance and reduced motion.
- [ ] Verify RLS on all six tables, no privileged key in frontend configuration, and exact environment separation.
- [ ] Confirm source/model/dataset licensing and privacy assumptions for any projects you independently build from the curriculum.

No Vercel deployment or Supabase project was provisioned by the local application build. The source is prepared for deployment; account ownership, external credentials, email configuration, GitHub repository and deployment are yours to configure.

## Initial source-control commands

After creating an empty GitHub repository, replace the URL below with your repository URL:

```powershell
git init
git add .
git commit -m "Build AI systems learning platform"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY.git
git push -u origin main
```

Review staged files before committing and confirm that `.env.local`, build output and dependencies are ignored.
