// Based on CRA template

// export function register() {
//     if ('serviceWorker' in navigator) {
//       window.addEventListener('load', () => {
//         navigator.serviceWorker
//           .register('/sw.js')
//           .then(reg => console.log('Service Worker registered:', reg))
//           .catch(err => console.error('Service Worker registration failed:', err));
//       });
//     }
//   }
  // serviceWorkerRegistration.js

// Check if service workers are supported
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname === '127.0.0.1'
);

export function register() {
  if ('serviceWorker' in navigator) {
    // The service worker URL can be different based on your project setup
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Skip service worker registration if the app is served from a different origin
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

      if (isLocalhost) {
        // In development, we don't register the service worker
        console.log('Service Worker is not registered in development mode');
      } else {
        // Register the service worker in production
        navigator.serviceWorker
          .register(swUrl)
          .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
      }
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
