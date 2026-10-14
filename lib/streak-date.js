export function isBackdatedStreakDate(today, lastActive) {
  if (
    typeof today !== 'string' ||
    typeof lastActive !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(today) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(lastActive)
  ) {
    return false;
  }

  // Canonical ISO dates compare in calendar order.
  return today < lastActive;
}
