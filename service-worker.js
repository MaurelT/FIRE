var dataCacheName = "FireData-v0.1";
var cacheName = "FirePWA-v0.1";
var filesToCache =  [
  '/',
  '/*',
  '/scripts/*',
  '/styles/*',
  '/manifest.json',
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});
