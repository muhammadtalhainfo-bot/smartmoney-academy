const ENTITLED_SUBSCRIPTION_STATUSES = new Set(['active', 'trialing', 'past_due']);

export async function customerHasEntitledSubscription(stripe, customerId) {
  if (!customerId) return false;

  let startingAfter;
  for (;;) {
    const page = await stripe.subscriptions.list({
      customer: customerId,
      status: 'all',
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });
    const subscriptions = page.data || [];

    if (subscriptions.some((subscription) =>
      ENTITLED_SUBSCRIPTION_STATUSES.has(subscription.status)
    )) {
      return true;
    }

    if (!page.has_more || subscriptions.length === 0) return false;
    startingAfter = subscriptions[subscriptions.length - 1].id;
  }
}
