# SmartMoney Academy Website Audit (March 25, 2026)

This audit focuses on what is **missing**, **duplicated**, and **small/weird** in the current codebase.

## 1) Critical issues (must fix first)

1. **Homepage and multiple pages have JSX text that renders like comments (`// ...`) and fails linting.**
   - This causes noisy UI and hard build/lint failures.
   - Present on home page and multiple route pages/components.

2. **`dashboard` contains a hook/immutability bug where `updateStreak` is used before declaration.**
   - This is flagged by ESLint as a correctness issue and can cause stale behavior.

3. **State updates happen directly inside effects (`setState` in `useEffect`) in key components.**
   - Seen in `app/page.js` and `CookieBanner`.
   - Triggers modern React lint rule (`react-hooks/set-state-in-effect`) and can cause render churn.

4. **A Supabase publishable key is hardcoded in source.**
   - Move URL/key to environment variables and keep one canonical client factory.

## 2) Duplicate / redundant items

1. **Duplicate Supabase client file (same code twice).**
   - `app/lib/supabase.js` and `lib/supabase.js` are identical.
   - Only `lib/supabase.js` appears used by app routes/components.

2. **Two sitemap systems are present.**
   - Dynamic sitemap route (`app/sitemap.js`) and static file (`public/sitemap.xml`) both exist.
   - Keep one strategy to avoid conflicting indexing output.

3. **Likely duplicate/legacy image assets in `public/images`.**
   - Both normalized and “title-style” filename variants exist for similar lesson artwork.
   - Unreferenced files detected:
     - `Fair Value Gaps (FVG).png`
     - `LIQUIDITY CONCEPTS.png`
     - `Market Structure.png`
     - `ORDER BLOCKS.png`
     - `POWER OF THREE (AMD).png`
     - `bullish market structure.png`

## 3) Missing things

1. **No clean CI-quality lint baseline.**
   - Current lint run reports 59 issues (47 errors, 12 warnings).

2. **Missing image optimization on multiple pages.**
   - `<img>` is used where `next/image` should be used for LCP/performance.

3. **Missing robust dependency handling in React hooks.**
   - Several `useEffect/useCallback` missing dependencies (`router`, `supabase`, etc.).

4. **Missing external-link best practice in nav dropdown.**
   - Discord entry is an external URL but is rendered with regular `Link` handling and no explicit external-link treatment.

## 4) Small / weird UX details

1. **Homepage microcopy has casing/wording inconsistencies** (e.g., “youtube channel” lowercase brand name).
2. **Heavy inline styles in navbar and pages** increase maintenance complexity and make visual consistency drift more likely.
3. **Some quote/apostrophe characters are unescaped in JSX**, causing lint noise and potentially odd rendering.
4. **Comment-like section labels are mixed into visible UI text** (`// What is ICT`, `// Curriculum`, etc.).
   - If intentional, keep only where stylistically desired and remove accidental occurrences.

## 5) Prioritized remediation plan

### Phase A (stability + deploy hygiene)
- Fix all JSX comment-textnode/unescaped entity errors.
- Fix `dashboard` function ordering and hook dependency correctness.
- Resolve `set-state-in-effect` issues (replace with derived initial state or guarded effect patterns).

### Phase B (cleanup + consistency)
- Remove unused duplicate Supabase client file; keep one canonical import path.
- Choose one sitemap strategy (prefer `app/sitemap.js` in App Router projects).
- Delete or archive unreferenced legacy images.

### Phase C (quality/perf)
- Convert critical visible `<img>` to `next/image`.
- Normalize typography/copy style and section-label treatment.
- Reduce large inline-style blocks into reusable utility classes/components.

## 6) Validation commands used for this audit

- `npm run lint`
- `rg --files | head -n 200`
- `find public/images -maxdepth 1 -type f | sed 's#public/images/##' | sort`
- Python check for unreferenced image files by exact filename search
- `rg -n "from ['\"](\.\./|\./)?lib/supabase|app/lib/supabase|../lib/supabase|@/lib/supabase|@/app/lib/supabase" app lib`

