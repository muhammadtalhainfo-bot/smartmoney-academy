self.addEventListener('fetch', function(event) {
  event.respondWith(fetch(event.request));
});

importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js');
