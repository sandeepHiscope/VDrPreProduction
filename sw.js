import { precacheAndRoute } from 'workbox-precaching';

// Injects manifest from VitePWA plugin
precacheAndRoute(self.__WB_MANIFEST);

const CACHE_NAME = 'healthcare-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/App.jsx',
  '/main.jsx',
  '/index.css',
  '/assets/logo.png', // Your static assets
  '/assets/logo.png',
  '/assets/icons/healthcare-icon.png',
  '/assets/icons/healthcare-badge.png',
  '/offline.html',  // Ensure offline access to a fallback page
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
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clonedResponse);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          return cachedResponse || fetch(event.request);
        })
    );
  }
});

// Background Sync Example (to handle failed API calls when offline)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-api-calls') {
    event.waitUntil(
      console.log('Syncing failed API calls...')
    );
  }
});

// Push Notifications Example
self.addEventListener('push', (event) => {
  const title = event.data ? event.data.text() : 'Healthcare Update';
  const options = {
    body: 'You have an update in your healthcare app.',
    icon: '/assets/icons/healthcare-icon.png',
    badge: '/assets/icons/healthcare-badge.png',
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Workbox Precaching and Routing
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.0/workbox-sw.js');

if (workbox) {
  workbox.skipWaiting();
  workbox.clientsClaim();

  // Precache assets (images and routes)
  workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: 'ef95cf36c029ac33f5edd6ece46e1b3c' },
    { url: '/offline.html', revision: '6ce319106a4d8cd0ae5a0d08a07ae540' },
    { url: '/assets/logo.png', revision: 'a98e716193a70fee6ce925b43643fb0f' },
    { url: '/assets/icons/healthcare-icon.png', revision: 'b2b4e3f0fb1b54282f924cb3001c66e3' },
    { url: '/assets/icons/healthcare-badge.png', revision: '4a5d2ef938bf90e242fa3e65f5b26fc9' },
    // Add more static assets as needed
  ]);

  // Cache Google Fonts with Stale-While-Revalidate
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );

  // Cache images with CacheFirst strategy
  workbox.routing.registerRoute(
    ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 2592e3,
        }),
      ],
    })
  );

  // Cache JavaScript, CSS, and other assets with Stale-While-Revalidate
  workbox.routing.registerRoute(
    ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'assets',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 2592e3,
        }),
      ],
    })
  );

  // Cache pages with NetworkFirst strategy
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'document',
    new workbox.strategies.NetworkFirst({
      cacheName: 'pages',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 604800, // 1 week
        }),
      ],
    })
  );
}
