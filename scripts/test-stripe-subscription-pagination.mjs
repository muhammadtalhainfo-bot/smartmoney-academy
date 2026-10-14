import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const helperSource = await readFile(new URL('../lib/stripe-subscriptions.js', import.meta.url), 'utf8');
const helperModuleUrl = 'data:text/javascript;base64,' + Buffer.from(helperSource).toString('base64');
const { customerHasEntitledSubscription } = await import(helperModuleUrl);

function subscription(id, status) {
  return { id, status };
}

function stripeMock(pages) {
  const calls = [];
  return {
    calls,
    subscriptions: {
      async list(params) {
        calls.push(params);
        const page = pages[calls.length - 1];
        assert.ok(page, 'Subscription helper requested an unexpected extra page.');
        return page;
      },
    },
  };
}

function cancelledPage(start, count = 100) {
  return {
    data: Array.from({ length: count }, (_, index) => subscription('sub_cancelled_' + (start + index), 'canceled')),
    has_more: true,
  };
}

// A current entitled subscription can sit beyond the first 100 historical subscriptions.
{
  const stripe = stripeMock([
    cancelledPage(0),
    { data: [subscription('sub_active_100', 'active')], has_more: false },
  ]);
  assert.equal(await customerHasEntitledSubscription(stripe, 'cus_pagination'), true);
  assert.equal(stripe.calls.length, 2);
  assert.equal(stripe.calls[0].customer, 'cus_pagination');
  assert.equal(stripe.calls[0].status, 'all');
  assert.equal(stripe.calls[0].limit, 100);
  assert.equal(stripe.calls[1].starting_after, 'sub_cancelled_99');
}

// Each entitled status must be recognized, including a past-due recovery subscription.
for (const status of ['active', 'trialing', 'past_due']) {
  const stripe = stripeMock([{ data: [subscription('sub_' + status, status)], has_more: true }]);
  assert.equal(await customerHasEntitledSubscription(stripe, 'cus_entitled'), true, status);
  assert.equal(stripe.calls.length, 1, 'Should stop once an entitled subscription is found.');
}

// No entitled subscription across multiple pages should return false after exhausting results.
{
  const stripe = stripeMock([
    cancelledPage(0),
    {
      data: [
        subscription('sub_unpaid', 'unpaid'),
        subscription('sub_paused', 'paused'),
        subscription('sub_incomplete_expired', 'incomplete_expired'),
      ],
      has_more: false,
    },
  ]);
  assert.equal(await customerHasEntitledSubscription(stripe, 'cus_no_entitlement'), false);
  assert.equal(stripe.calls.length, 2);
  assert.equal(stripe.calls[1].starting_after, 'sub_cancelled_99');
}

// An empty page must terminate defensively even if the provider indicates more results.
{
  const stripe = stripeMock([{ data: [], has_more: true }]);
  assert.equal(await customerHasEntitledSubscription(stripe, 'cus_empty_page'), false);
  assert.equal(stripe.calls.length, 1);
}

// No customer ID must not make a Stripe request.
{
  const stripe = stripeMock([]);
  assert.equal(await customerHasEntitledSubscription(stripe, null), false);
  assert.equal(stripe.calls.length, 0);
}

console.log('Stripe subscription pagination tests passed.');
