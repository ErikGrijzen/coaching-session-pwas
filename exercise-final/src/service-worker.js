var appShellCacheName = 'ncSummitAppShell-0.0.3';
var appDataCacheName = 'ncSummitData-0.0.3';
var appShellCacheFiles= [
    '/',
    '/index.html',
    '/css/main.min.css',
    '/js/app.min.js',
    '/images/logo__regular.svg',
    '/fonts/icon-font.woff',
    '/fonts/icon-font.eot',
    '/fonts/icon-font.svg',
];

self.addEventListener('install', function (event) {
    console.log('[ServiceWorker] Install');

    event.waitUntil(
        caches.open(appShellCacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');

            return cache.addAll(appShellCacheFiles);
        })
    );
});

self.addEventListener('activate', function (event) {
    console.log('[ServiceWorker] Activate');

    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== appShellCacheName && key !== appDataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);

                    return caches.delete(key);
                }
            }));
        })
    );

    return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
    console.log('[ServiceWorker] Fetch:', event.request.url);

    if (event.request.url.indexOf('api') > -1) {
        event.respondWith(
            caches.open(appDataCacheName).then(function(cache) {
                return fetch(event.request)
                    .then(function(response) {
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