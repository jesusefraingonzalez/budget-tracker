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
            })
    );
});
// fetch event listener to update data



