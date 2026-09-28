# ICT Flow — Publish Checklist

## What changed

- Consolidated the Next.js configuration into `next.config.js` and removed the duplicate config file.
- Unified the curriculum data source at `lib/curriculum.js`.
- Expanded the curriculum to **38 modules / 203+ lesson units**.
- Added two new modules: **Trade Review & Journal Process** and **Macro, News & Execution Risk**.
- Fixed lesson sharing scope and dashboard streak client handling.
- Fixed lesson social-image routing so metadata points to real module assets.
- Added methodology language to lesson pages so ICT/SMC interpretations are clearly presented as frameworks rather than guaranteed market mechanics.
- Removed the exposed Finnhub API key from source and changed market-data fallback to **no fake prices**.
- Updated sitemap/static params for the new lesson routes.
- Added conditional Google AdSense loader and dynamic `/ads.txt` support.
- Updated privacy/cookie language for advertising and Google Ads Settings.
- Removed outdated module/student/count claims from the active app source.

## Required environment variables

The repository does not commit real secrets. Add these variables directly in Vercel (or your deployment provider) and fill only the values you actually use:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_KEY` (server-only)
- `FINNHUB_API_KEY` (server-only, only if market data is enabled)
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_MONTHLY_PRICE`
- `NEXT_PUBLIC_STRIPE_YEARLY_PRICE`
- `NEXT_PUBLIC_APP_URL`
- `ONESIGNAL_REST_API_KEY` (server-only)
- `NEXT_PUBLIC_ADSENSE_CLIENT`
- `NEXT_PUBLIC_ADSENSE_SLOT` (the ad slot ID used by `AdSlot.js`)
- `ANTHROPIC_API_KEY` (server-only, required for Journal AI Coach)
- `ADMIN_PASSWORD` (server-only, required for admin login)

`NEXT_PUBLIC_ADSENSE_CLIENT` should be the AdSense publisher/client value, for example `ca-pub-1234567890123456`.

## AdSense activation

1. Add `ictflow.com` to your AdSense account and complete Google's site/ownership review.
2. Enable the ad format(s) you want in AdSense. The project now loads the AdSense script when `NEXT_PUBLIC_ADSENSE_CLIENT` is configured.
3. Deploy with the publisher ID set. `/ads.txt` will then return the first-party Google ads.txt line automatically.
4. In AdSense Privacy & Messaging, configure the applicable Google-certified consent setup before serving personalized ads to regions where Google requires it.
5. Keep the Privacy and Cookies pages live and linked from the site footer.

## Before production deploy

Run locally or in CI:

```bash
npm ci
npm run lint
npm run build
```

Then smoke-test:

- `/`
- `/courses`
- `/lesson/1`
- `/lesson/31`
- `/lesson/32`
- `/dashboard`
- `/privacy`
- `/cookies`
- `/ads.txt`
- `/sitemap.xml`

Also test signup/login, lesson completion, quiz submission, journal entry creation, Stripe checkout, and admin login with production environment variables.

## Security note

The previous ZIP contained a Finnhub credential in source. It has been removed from the active code. **Rotate/revoke that credential before publishing the revised project.** Do not paste the replacement key into source control; set it only as a deployment secret.

## Verification limitation

The source was statically checked in this environment, but the full Next.js lint/build could not be executed because dependency installation timed out. Do not skip the CI/local `npm run lint` and `npm run build` before production release.
