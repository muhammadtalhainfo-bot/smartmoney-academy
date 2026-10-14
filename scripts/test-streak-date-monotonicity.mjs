import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const helperSource = await readFile(new URL('../lib/streak-date.js', import.meta.url), 'utf8');
const helperModuleUrl = 'data:text/javascript;base64,' + Buffer.from(helperSource).toString('base64');
const { isBackdatedStreakDate } = await import(helperModuleUrl);
const route = await readFile(new URL('../app/api/streak/route.js', import.meta.url), 'utf8');

assert.equal(isBackdatedStreakDate('2026-10-13', '2026-10-14'), true, 'earlier client timezone date is backdated');
assert.equal(isBackdatedStreakDate('2026-10-14', '2026-10-14'), false, 'same day is not backdated');
assert.equal(isBackdatedStreakDate('2026-10-15', '2026-10-14'), false, 'forward date is not backdated');
assert.equal(isBackdatedStreakDate('2026-10-14', null), false, 'new profiles have no previous date');
assert.equal(isBackdatedStreakDate(undefined, '2026-10-14'), false, 'missing current date is rejected safely');
assert.equal(isBackdatedStreakDate('2026-1-4', '2026-10-14'), false, 'non-canonical dates are ignored');

const backdateGuard = route.indexOf('isBackdatedStreakDate(today, profile.last_active)');
const incrementPoint = route.indexOf('const yesterday = previousDate(today)');
assert.ok(backdateGuard >= 0, 'streak route must use the date monotonicity guard');
assert.ok(incrementPoint > backdateGuard, 'the monotonicity guard must run before calculating streak increments');

console.log('Streak date monotonicity tests passed.');
