# SmartMoney Academy — Engineering Review Playbook

If I were reviewing this repository as a top-tier software engineer, I'd use the workflow below to **find issues fast**, **prioritize correctly**, and **ship improvements safely**.

## 1) Start with measurable baselines

Run these checks first and capture outputs in a dated audit note:

1. `npm run lint`
2. `npm run build`
3. `npm audit --omit=dev`
4. `npm run health:check`

Why: you need an objective before/after view. Fixes should reduce errors/warnings and keep the build green.

---

## 2) Triage issues by business impact

Use this severity model:

- **P0 — Release blockers:** build breaks, runtime crashes, syntax errors, auth/payment failures.
- **P1 — Correctness/security:** data loss, broken user flows, key leaks, incorrect calculations.
- **P2 — UX/performance:** slow pages, hydration warnings, missing image optimization.
- **P3 — Maintainability:** duplication, naming inconsistency, dead code, style debt.

Work top-down (P0 -> P3). Never optimize low-impact code before blockers.

---

## 3) Fix by theme, not file-by-file randomness

For this codebase (Next.js App Router + React), fix in this order:

1. **Lint blockers that can break CI/build**
   - JSX textnode comment mistakes (`react/jsx-no-comment-textnodes`)
   - unescaped entities in JSX (`react/no-unescaped-entities`)
   - parser/syntax errors

2. **React hook safety/correctness**
   - `setState` patterns in effects that cause cascading renders
   - components created during render (`react-hooks/static-components`)

3. **Performance and consistency**
   - replace critical-path `<img>` with `next/image`
   - reduce inline-style repetition into reusable components/styles

4. **Architecture cleanup**
   - remove duplicates (e.g., duplicate clients/utilities)
   - consolidate environment/config handling

This improves reliability quickly while controlling regression risk.

---

## 4) Validate each batch before moving on

After each theme:

- rerun lint/build,
- click through affected pages locally,
- verify no console errors,
- commit with a focused message.

Small, focused commits make debugging and rollback easier.

---

## 5) Improvement backlog format (what to track)

Track improvements as tickets with:

- **Problem statement** (what is broken/suboptimal)
- **Impact** (users, revenue, operations, SEO, performance)
- **Evidence** (lint output, screenshots, logs)
- **Acceptance criteria** (clear done definition)
- **Risk level + rollback plan**

---

## 6) Suggested weekly engineering cadence

- **Daily:** run lint/build before any PR.
- **Twice weekly:** resolve highest-impact debt tickets.
- **Weekly:** run full health check and publish trend (error count, warnings, build status).
- **Monthly:** dependency/security and performance sweep.

---

## 7) Definition of Done for each improvement

A change is done only when:

1. Code is committed with clear message.
2. `npm run lint` results are not worse than baseline.
3. `npm run build` passes.
4. User path affected by change is manually sanity-tested.
5. Follow-up debt (if any) is logged explicitly.

---

## 8) Fast command set

```bash
npm run lint
npm run build
npm run health:check
```

Use these as your standard pre-PR gate.
