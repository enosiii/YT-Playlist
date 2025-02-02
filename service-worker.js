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

// Handle notification click events
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const action = event.action;

  if (action.startsWith('playlist')) {
    const playlistIndex = parseInt(action.replace('playlist', '')) - 1;
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        if (clientList.length > 0) {
          const client = clientList[0];
          client.focus();
          client.postMessage({ type: 'switchPlaylist', index: playlistIndex });
        }
      })
    );
  }
});

// Handle messages from the app
self.addEventListener('message', (event) => {
  if (event.data.type === 'updateNotification') {
    event.waitUntil(
      self.registration.showNotification("YouTube Playlist 🎧", {
        body: "Switch playlists from the notification",
        icon: "https://enosiii.github.io/PWA/YTP/yt1-icon-512x512.png",
        actions: event.data.actions
      })
    );
  }
});
