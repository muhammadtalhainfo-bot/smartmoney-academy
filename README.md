# ICT Flow

ICT Flow is a Next.js trading-education platform built around a structured ICT / Smart Money Concepts curriculum, practice tools, a trade journal, quizzes, authentication, optional Pro access, and market-data integrations.

## Current project state

- **38 modules**
- **203+ lesson units**
- All 38 modules and 203+ lessons are free; Pro adds premium tools and an ad-free experience
- Responsive dark/gold UI with accessibility focus states
- Structured lesson metadata, sitemap and static route generation
- Conditional Google AdSense loader + first-party `/ads.txt`
- Supabase authentication/data
- Stripe checkout for Pro access
- Finnhub market ticker, with **no fake fallback prices** when the API is not configured

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Production validation

Before publishing, run:

```bash
npm ci
npm run lint
npm run build
```

Then smoke-test the important routes and authenticated flows. See `PUBLISH_CHECKLIST.md` for the full release checklist.

## Environment variables

Use `.env.example` as the template. Never commit real secrets.

Server-only credentials include the Supabase service key, Finnhub API key, Stripe secret/webhook secrets, and OneSignal REST key. The AdSense client ID is public and is safe to expose through `NEXT_PUBLIC_ADSENSE_CLIENT`.

## AdSense

Set:

```text
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

After the site is approved and deployed with that value, the app will load the AdSense script and generate the appropriate first-party Google line at `/ads.txt`.

AdSense account/site approval, ad serving settings, and regional consent configuration are controlled in the Google account and cannot be completed from source code alone.

## Security

The previous project archive contained a Finnhub credential in source. That credential has been removed from active source. **Rotate/revoke the exposed credential before using the revised project in production.**
