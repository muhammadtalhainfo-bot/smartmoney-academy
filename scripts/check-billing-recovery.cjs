const fs = require('node:fs');

const checkout = fs.readFileSync('app/api/create-checkout/route.js', 'utf8');
const portal = fs.readFileSync('app/api/create-portal/route.js', 'utf8');
const webhook = fs.readFileSync('app/api/webhook/route.js', 'utf8');
const errors = [];

const adminActions = fs.readFileSync('app/admin/actions.js', 'utf8');
const deleteBlock = adminActions.slice(
  adminActions.indexOf("case 'profile.delete':"),
  adminActions.indexOf("case 'blog.list':")
);
if (!deleteBlock.includes("stripe.subscriptions.list")) {
  errors.push('Admin account deletion must inspect linked Stripe subscriptions.');
}
if (!deleteBlock.includes("for (const subscription of page.data)")) {
  errors.push('Stripe subscription pagination must use the SDK response data array.');
}
if (!deleteBlock.includes("page.has_more") || !deleteBlock.includes("starting_after: startingAfter")) {
  errors.push('Admin deletion must paginate through all linked Stripe subscriptions.');
}
if (!deleteBlock.includes("await stripe.subscriptions.cancel(subscription.id)")) {
  errors.push('Active or delinquent subscriptions must be cancelled before auth deletion.');
}
if (!deleteBlock.includes("Stripe still reports billable subscriptions; account deletion is blocked.")) {
  errors.push('Admin deletion must fail closed if billable subscriptions remain.');
}
if (deleteBlock.indexOf("await stripe.subscriptions.cancel(subscription.id)") > deleteBlock.indexOf("await supabase.auth.admin.deleteUser(userId)")) {
  errors.push('Stripe cancellation must happen before deleting the auth account.');
}

if (!checkout.includes("['active', 'trialing', 'past_due'].includes(subscription.status)")) {
  errors.push('Checkout must prevent duplicate subscriptions for active, trialing, and past-due customers.');
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
if (!webhook.includes("['active', 'trialing', 'past_due'].includes(subscription.status)")) {
  errors.push('Webhook and checkout must agree on which subscription states retain Pro entitlement.');
}

if (errors.length) {
  for (const error of errors) console.error('Billing recovery guard failed: ' + error);
  process.exit(1);
}
console.log('Billing recovery guard passed: linked past-due customers can reach the authenticated, rate-limited Stripe portal.');
