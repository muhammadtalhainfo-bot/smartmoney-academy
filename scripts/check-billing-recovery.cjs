const fs = require('node:fs');

const checkout = fs.readFileSync('app/api/create-checkout/route.js', 'utf8');
const portal = fs.readFileSync('app/api/create-portal/route.js', 'utf8');
const webhook = fs.readFileSync('app/api/webhook/route.js', 'utf8');
const errors = [];

if (!checkout.includes('customerHasEntitledSubscription(stripe, stripeCustomerId)')) {
  errors.push('Checkout must use the shared paginated subscription scan to prevent duplicate subscriptions.');
}
if (!webhook.includes('customerHasEntitledSubscription(stripe, customerId)')) {
  errors.push('Webhook entitlement recalculation must use the shared paginated subscription scan.');
}
const subscriptionHelper = fs.readFileSync('lib/stripe-subscriptions.js', 'utf8');
if (!subscriptionHelper.includes("const ENTITLED_SUBSCRIPTION_STATUSES = new Set(['active', 'trialing', 'past_due'])")) {
  errors.push('Shared subscription scan must preserve active, trialing, and past-due entitlement semantics.');
}
if (!subscriptionHelper.includes('starting_after: startingAfter') ||
    !subscriptionHelper.includes('page.has_more') ||
    !subscriptionHelper.includes("limit: 100")) {
  errors.push('Shared subscription scan must paginate Stripe list results using starting_after.');
}
if (checkout.includes('const subscriptions = await stripe.subscriptions.list({') ||
    webhook.includes('async function customerHasActiveSubscription')) {
  errors.push('Checkout and webhook must not retain separate non-paginated subscription scans.');
}
if (!portal.includes("if (!profile?.stripe_customer_id)")) {
  errors.push('Billing portal must require a linked Stripe customer.');
}
if (/if \(!profile\?\.is_pro\s*\|\|\s*!profile\?\.stripe_customer_id\)/.test(portal)) {
  errors.push('Billing portal must not require is_pro; past-due users need a recovery path.');
}
if (!portal.includes("await supabase.auth.getUser()")) {
  errors.push('Billing portal must authenticate the caller.');
}
if (!portal.includes("consume_api_rate_limit") || !portal.includes("allowed !== true")) {
  errors.push('Billing portal must preserve the server-side rate limit.');
}
if (!webhook.includes('customerHasEntitledSubscription(stripe, customerId)')) {
  errors.push('Webhook entitlement recalculation must use the same status-aware helper as checkout.');
}

const adminActions = fs.readFileSync('app/admin/actions.js', 'utf8');
const deleteCase = adminActions.match(/case 'profile\.delete': \{([\s\S]*?)\n    \}\n    case '/)?.[1] || '';
if (!deleteCase.includes("select('stripe_customer_id')")) {
  errors.push('Admin account deletion must load the linked Stripe customer before deleting the Auth user.');
}
if (!deleteCase.includes('cancelCustomerSubscriptions(stripe, profile.stripe_customer_id)')) {
  errors.push('Admin account deletion must cancel linked Stripe subscriptions before Auth deletion.');
}
if (!deleteCase.includes("if (!stripeSecret) throw new Error(")) {
  errors.push('Admin account deletion must fail closed when Stripe is not configured.');
}
if (deleteCase.indexOf('cancelCustomerSubscriptions(stripe, profile.stripe_customer_id)') < 0 ||
    deleteCase.indexOf('supabase.auth.admin.deleteUser(userId)') < 0 ||
    deleteCase.indexOf('cancelCustomerSubscriptions(stripe, profile.stripe_customer_id)') > deleteCase.indexOf('supabase.auth.admin.deleteUser(userId)')) {
  errors.push('Stripe cancellation must finish before the Auth account is deleted.');
}
if (!adminActions.includes("async function cancelCustomerSubscriptions(stripe, customerId)") ||
    !adminActions.includes("starting_after: startingAfter")) {
  errors.push('Subscription cancellation must paginate all Stripe subscriptions for the customer.');
}
if (!adminActions.includes("const TERMINAL_STRIPE_SUBSCRIPTION_STATUSES = new Set(['canceled', 'incomplete_expired'])")) {
  errors.push('Admin deletion must explicitly treat only canceled and incomplete_expired subscriptions as terminal.');
}
if (!adminActions.includes("async function assertCustomerSubscriptionsTerminal(stripe, customerId)") ||
    !adminActions.includes("await assertCustomerSubscriptionsTerminal(stripe, customerId)")) {
  errors.push('Admin deletion must re-list Stripe subscriptions and verify terminal states before Auth deletion.');
}
if (!adminActions.includes("if (!TERMINAL_STRIPE_SUBSCRIPTION_STATUSES.has(subscription.status))")) {
  errors.push('Admin deletion must also handle unpaid, paused, and unrecognized non-terminal subscription states.');
}
const adminPage = fs.readFileSync('app/admin/page.js', 'utf8');
if (!adminPage.includes('cancels linked Stripe subscriptions first')) {
  errors.push('Admin confirmation must disclose that account deletion cancels linked Stripe subscriptions.');
}

if (errors.length) {
  for (const error of errors) console.error('Billing recovery guard failed: ' + error);
  process.exit(1);
}
console.log('Billing recovery and admin deletion safety guards passed.');


