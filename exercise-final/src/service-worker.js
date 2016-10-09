var appCacheName = 'ncSummitApp-ex-3';
var dataCacheName = 'ncSummitData-ex-3';

var filesToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/css/app.css',
    '/js/app.js',
    '/images/logo__regular.svg',
    '/fonts/icon-font.woff',
];

self.addEventListener('install', function (event) {
    console.log('[ServiceWorker] Install');

    event.waitUntil(
        caches.open(appCacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');

            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (event) {
    console.log('[ServiceWorker] Activate');

    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== appCacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);

                    return caches.delete(key);
                }
            }));
        })
    );

    return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
    console.log('[ServiceWorker] Fetch', event.request.url);

    if (event.request.url.indexOf('api') > -1) {
        event.respondWith(
            caches.open(dataCacheName).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                });
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        );
    }
});