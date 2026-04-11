#!/usr/bin/env bash
set -euo pipefail

printf "\n== SmartMoney Academy: Project Health Check ==\n"

printf "\n[1/4] Dependency audit (production deps)\n"
npm audit --omit=dev || true

printf "\n[2/4] ESLint baseline\n"
npm run -s lint || true

printf "\n[3/4] Next.js production build validation\n"
npm run -s build || true

printf "\n[4/4] TODO/FIXME scan\n"
rg -n "TODO|FIXME|HACK|XXX" app lib || true

printf "\n== Health check complete ==\n"
