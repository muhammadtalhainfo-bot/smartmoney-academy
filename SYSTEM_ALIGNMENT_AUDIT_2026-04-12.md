# SmartMoney Academy Deep Research + Alignment Audit (April 12, 2026)

## Objective
Validate whether the project is currently running smoothly and whether core systems are aligned (build/runtime, lint/code quality, docs/config, and architecture consistency).

## Executive verdict
- **Runtime/build status:** ✅ Production build succeeds and app starts/responds with HTTP 200.
- **Code quality gate status:** ❌ Lint gate fails with high error volume (75 errors, 15 warnings across 26 files).
- **System alignment status:** ⚠️ Partially aligned. Core app routing/build is healthy, but quality and documentation alignment are not yet production-clean.

## Checks performed
1. `npm run lint`
2. `npx eslint . -f json -o /tmp/eslint-report.json`
3. `node` summary parser for ESLint JSON report
4. `npm run build`
5. `npm run start` + `curl -I http://127.0.0.1:3000` smoke check
6. `npm outdated` (dependency drift check)
7. Spot consistency checks:
   - `diff -q app/lib/supabase.js lib/supabase.js`
   - sitemap strategy presence check (`app/sitemap.js` vs `public/sitemap.xml`)

## Findings

### 1) Runtime health (good)
- Next.js production build completed successfully.
- Route generation completed for 30 routes.
- Local startup was successful and returned `HTTP/1.1 200 OK` for `/`.

**Conclusion:** the application can be built and served successfully in its current state.

### 2) Code quality/lint health (not good)
- ESLint reports **75 errors** and **15 warnings**.
- Issues span **26 files**.
- Highest-impact files by count include:
  - `app/page.js` (12 errors)
  - `app/journal/page.js` (10 errors, 2 warnings)
  - `app/foundations/page.js` (8 errors)
  - `app/admin/page.js` (5 errors, 5 warnings)
- Common error classes:
  - `react/jsx-no-comment-textnodes`
  - `react/no-unescaped-entities`
  - `react-hooks/set-state-in-effect`
- Common warning class:
  - `@next/next/no-img-element`

**Conclusion:** deploy runtime is healthy, but engineering quality gate is currently failing.

### 3) Alignment check (mixed)

#### Build/runtime alignment
- `package.json` scripts (`build`, `start`) are valid and operational.
- App Router route map generation is coherent.

#### Documentation alignment
- `README.md` is still the default Create Next App boilerplate and does not document SmartMoney-specific setup, QA baseline, environment variables, or operations workflow.

#### Naming/branding alignment
- Package is named `ict-learning-app` while repository/product branding is SmartMoney Academy.
- Not a blocker, but this creates identity drift in tooling and ops logs.

#### Architecture consistency
- `app/lib/supabase.js` and `lib/supabase.js` are byte-identical (duplicate source of truth).
- This can create future drift if only one copy is edited.

#### Dependency audit alignment
- `npm outdated` could not complete due npm registry access policy (`403 Forbidden`), so dependency freshness could not be fully verified from this environment.

## Risk level by area
- **Immediate release blocker:** Lint errors (high).
- **Operational risk:** Duplicate Supabase client file (medium).
- **Maintainability risk:** Boilerplate README and naming drift (medium).
- **Unknown risk (environment-limited):** Dependency freshness/security drift (medium, unverified here).

## Prioritized remediation plan

### P0 (this week)
1. Clear all lint **errors** so CI-quality baseline is restored.
2. Address `react-hooks/set-state-in-effect` patterns first in high-traffic pages.
3. Replace accidental JSX comment-text nodes and unescaped entities.

### P1 (next)
1. Consolidate Supabase client into a single canonical file/path.
2. Replace visible `<img>` instances in critical pages with `next/image`.

### P2 (cleanup/alignment)
1. Rewrite README with SmartMoney-specific setup and validation commands.
2. Decide whether to rename package from `ict-learning-app` to match brand.
3. Add a CI pipeline (lint + build) if not already enforced upstream.

## Bottom line
The app is **operational at runtime**, but it is **not fully aligned as an engineering system** until lint errors and source-of-truth/documentation drift are addressed.
