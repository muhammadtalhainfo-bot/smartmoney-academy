// GA4 Event Tracking Utility
export function trackEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

export function trackPurchase(transactionId, value, currency = 'USD') {
  trackEvent('purchase', {
    transaction_id: transactionId,
    value: value,
    currency: currency,
    items: [{
      item_name: 'Pro Subscription',
      item_category: 'subscription',
      price: value,
      quantity: 1
    }]
  });
}

export function trackLogin(method = 'email') {
  trackEvent('login', { method });
}

export function trackSignUp(method = 'email') {
  trackEvent('sign_up', { method });
}

export function trackLessonStart(lessonId, lessonName) {
  trackEvent('lesson_start', {
    lesson_id: lessonId,
    lesson_name: lessonName
  });
}

export function trackLessonComplete(lessonId, lessonName, score) {
  trackEvent('lesson_complete', {
    lesson_id: lessonId,
    lesson_name: lessonName,
    score: score
  });
}
\nexport function trackCheckoutStart(plan) {
  trackEvent('begin_checkout', {
    currency: 'USD',
    items: [{ item_name: 'Pro Subscription', item_category: 'subscription', item_variant: plan }]
  });
}

export function trackShare(platform, contentType, contentId) {
  trackEvent('share', { method: platform, content_type: contentType, item_id: String(contentId) });
}
