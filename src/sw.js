const CACHE_NAME = 'healthcare-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/App.jsx',
  '/main.jsx', // Your main JS file
  '/index.css', // Your CSS file
  '/assets/logo.png', // Example static assets
  // Add more files as needed
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event (offline-first caching strategy)
self.addEventListener('fetch', (event) => {
  // Check if the request is for an API endpoint
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache the API response for future use
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clonedResponse);
          });
          return response;
        })
        .catch(() => {
          // If network is unavailable, serve the cached response
          return caches.match(event.request);
        })
    );
  } else {
    // Cache for other assets (HTML, CSS, JS, Images)
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          // If we have a cached response, serve it; otherwise, fetch from the network
          return cachedResponse || fetch(event.request);
        })
    );
  }
});

// Background Sync Example (to handle failed API calls when offline)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-api-calls') {
    event.waitUntil(
      // Implement your logic for syncing data once the user is back online
      console.log('Syncing failed API calls...')
    );
  }
});

// Push Notifications Example (Optional)
self.addEventListener('push', (event) => {
  const title = event.data ? event.data.text() : 'Healthcare Update';
  const options = {
    body: 'You have an update in your healthcare app.',
    icon: '/assets/icons/healthcare-icon.png', // Example icon
    badge: '/assets/icons/healthcare-badge.png',
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
