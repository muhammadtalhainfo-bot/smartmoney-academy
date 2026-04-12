# SmartMoney Academy Website Deep Audit (April 12, 2026)

This audit was re-run to verify whether the project is currently **running smoothly** and whether key pieces are **aligned** (build/lint/config/assets/data wiring).

## Executive summary

- **Production build:** ✅ Passes (`next build` succeeds).
- **Lint/quality gate:** ❌ Fails with a high error count (75 errors, 15 warnings; 90 total).
- **System alignment:** ⚠️ Mixed. Runtime build is stable, but code-quality and consistency alignment are not yet at release-ready baseline.

## What is working well

1. **Build pipeline is healthy for production output.**
   - `npm run build` completed successfully and generated all expected routes.

2. **Primary Supabase import path is consistent in app usage.**
   - App code imports `createClient` from `@/lib/supabase` consistently.

3. **Route generation is complete across marketing, auth, learning, and API surfaces.**
   - Static and dynamic routes are both emitted successfully in the build output.

## What is not aligned yet (blocking smoothness)

### 1) ESLint is currently failing hard

`npm run lint` reports **90 issues**:
- **75 errors** (blocking)
- **15 warnings** (non-blocking)

Most frequent categories:
- `react/jsx-no-comment-textnodes` (comment-like `//` text rendered inside JSX trees)
- `react/no-unescaped-entities` (raw `'`/`"` in JSX text)
- `react-hooks/set-state-in-effect` (synchronous `setState` in effect body)
- `react-hooks/static-components` (component definitions created during render)

### 2) Duplicate Supabase client file still exists

- `app/lib/supabase.js`
- `lib/supabase.js`

They are currently identical, which creates maintenance drift risk even though imports are mostly standardized to `@/lib/supabase`.

### 3) Asset set has potential drift/noise

A filename-reference scan shows many files in `public/images` that are not directly referenced by exact name in app/public/readme/config search scope. This suggests either:
- legacy files that should be archived/deleted, or
- references constructed dynamically and needing explicit documentation.

Either way, the current state is not fully “obviously aligned.”

## Deep-check command log

```bash
npm ci
npm run lint
npm run build
rg -n "from ['\"](\.{1,2}/)*lib/supabase|from ['\"]@/lib/supabase|from ['\"]@/app/lib/supabase|from ['\"](\.{1,2}/)*app/lib/supabase" app lib
find public/images -maxdepth 1 -type f | sed 's#public/images/##' | sort
python - <<'PY'
import os,subprocess,re
files=subprocess.check_output(['find','public/images','-maxdepth','1','-type','f']).decode().splitlines()
images=[os.path.basename(f) for f in files]
unused=[]
for img in images:
    r=subprocess.run(['rg','-n','-F',img,'app','public','README.md','next.config.mjs'],stdout=subprocess.PIPE,stderr=subprocess.DEVNULL)
    if r.returncode!=0:
        unused.append(img)
print('\n'.join(sorted(unused)))
PY
```

## Priority remediation plan

### Phase 1 — Restore code-quality alignment (highest priority)

1. Fix all `react/jsx-no-comment-textnodes` occurrences by converting visual section labels/comments to valid JSX text patterns.
2. Fix `react/no-unescaped-entities` issues by escaping or rephrasing text nodes.
3. Refactor `setState` calls currently triggered synchronously in `useEffect` bodies where lint flags `react-hooks/set-state-in-effect`.
4. Fix render-time component factory patterns that violate `react-hooks/static-components`.

### Phase 2 — Remove structural drift

1. Keep a single canonical Supabase browser client file (`lib/supabase.js`) and remove duplicate.
2. Document/clean `public/images` ownership and references (delete or archive clearly unused assets).
3. Decide on sitemap ownership strategy and keep one canonical source if duplicate outputs are possible.

### Phase 3 — Performance and consistency hardening

1. Replace high-traffic `<img>` usage with `next/image` where practical.
2. Normalize heavy inline style usage into reusable classes/components.
3. Add CI check to fail PRs on lint regression and optionally track warning budget.

## Current readiness verdict

- **Runs?** Yes (build and route generation work).
- **Smoothly and fully aligned?** Not yet. Lint failures and duplication/drift indicators show meaningful cleanup remains before claiming full alignment.
