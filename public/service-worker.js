// files to cache

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

// fetch event listener to update data



