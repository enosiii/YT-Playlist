const CACHE_NAME = 'ytp-cache-v1';
const urlsToCache = [
  'playlist.js',
  'index.html',
  'manifest.json',
  'yt1-icon-192x192.png',
  'yt1-icon-512x512.png',
  'https://www.youtube.com/iframe_api' // Adding YouTube iframe API for caching
];

// Install event - Caching essential resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch event - Serving cached resources
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
