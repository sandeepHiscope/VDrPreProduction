// serviceWorkerRegistration.js

// Check if service workers are supported
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function register() {
  if ('serviceWorker' in navigator) {
    // Don't rely on process.env.PUBLIC_URL as it might be undefined
    const publicUrl = new URL(window.location.origin);
    
    window.addEventListener('load', () => {
      // Use the root path for the service worker
      const swUrl = `${window.location.origin}/sw.js`;

      if (isLocalhost) {
        // This is running on localhost, check if service worker still exists
        checkValidServiceWorker(swUrl);
        
        console.log('Running on localhost - service worker limited functionality');
      } else {
        // Register the service worker in production
        registerValidSW(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
      
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched
              console.log('New content is available and will be used when all tabs are closed');
            } else {
              // At this point, everything has been precached
              console.log('Content is cached for offline use');
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

function checkValidServiceWorker(swUrl) {
  // Check if the service worker can be found
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      // Ensure service worker exists, and that we get the expected response
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found - reload the page
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found - proceed as normal
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}