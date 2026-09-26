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

export function setUserId(userId) {
  if (typeof window !== 'undefined') {
    window.__USER_ID__ = userId;
    if (window.gtag) {
      window.gtag('config', 'G-HRGZYFXQ5W', { user_id: userId });
    }
  }
}
