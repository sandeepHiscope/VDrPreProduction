import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "prompt", // Changed from autoUpdate to prompt for more control
      injectRegister: "auto", // This will handle injection of register
      filename: "sw.js", // Explicit filename
      strategies: "generateSW", // Use the generateSW strategy
      includeAssets: [
        "favicon.svg",
        "robots.txt",
        "offline.html",
        "icons/web-app-manifest-192x192.png",
        "icons/web-app-manifest-512x512.png",
        "screenshots/desktop.png",
        "screenshots/mobile.png",
      ],
      manifest: {
        name: "Verified Doctor App",
        short_name: "VDr",
        description: "Access trusted, verified doctors anytime, anywhere.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#0f172a",
        icons: [
          {
            src: "/icons/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icons/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
        screenshots: [
          {
            src: "/public/vdrDesktop.png",
            sizes: "1280x800",
            type: "image/png",
            form_factor: "wide",
            label: "Desktop view of Verified Doctor App",
          },
          {
            src: "/public/vdrMobile.png",
            sizes: "750x1334",
            type: "image/png",
            label: "Mobile view of Verified Doctor App",
          },
        ],
      },
      workbox: {
        swDest: "sw.js", // Ensure the service worker is generated at the root
        globDirectory: "dist", // Output directory
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        navigateFallback: "/index.html", // Fallback for SPA
        navigateFallbackDenylist: [/^\/api\//], // Don't fallback API routes
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-stylesheets",
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
            options: {
              cacheName: "pages",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              ["style", "script", "worker"].includes(request.destination),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "assets",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: ({ url }) =>
              url.origin === self.location.origin &&
              url.pathname.endsWith(".png"),
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "index.html",
      },
    }),
  ],
});
