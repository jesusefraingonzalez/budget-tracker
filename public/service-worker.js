// files to cache
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/index.js',
    '/manifest.webmanifest',
    '/styles.css',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
];

const CACHE_NAME = 'static-cache-v1';
const DATA_CACHE = 'data-cache-v1';

//install event listener to cache files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log("Files were pre-cached successfully!");
                return cache.addAll(FILES_TO_CACHE);
            })
    );
    self.skipWaiting();
});

// activate event listener
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keyList => {
                console.log(keyList);
                return Promise.all(
                    keyList.map(key => {
                        if (key !== CACHE_NAME && key !== DATA_CACHE) {
                            console.log('removing old caches ', key);
                            return caches.delete(key);
                        }
                    })
                );
            })
    );

    self.clients.claim();
});

// fetch event listener to update data
self.addEventListener('fetch', event => {
    if (event.request.url.includes('/api/')) {
        event.respondWith(
            caches.open(DATA_CACHE)
                .then(cache => {
                    return fetch(event.request)
                        .then(res => {
                            if (res.status === 200) cache.put(event.request.url, res.clone());
                            return res;
                        })
                        .catch(err => cache.match(event.request))
                })
                .catch(err => console.err(err))
        );
        return;
    };

    
    event.respondWith(
        caches.match(event.request)
            .then(res => res || fetch(event.request))
    );
});


