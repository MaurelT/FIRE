/* Copyright 2018 F.I.R.E

Author : Thomas Maurel
Version : 0.1
Date : 15/10/2018

*/

var dataCacheName = "FireData-v0.1";
var cacheName = "FirePWA-v0.1";
var filesToCache =  [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/styles/inline.css',
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

