if (!self.define) {
  let e,
    n = {};
  const s = (s, t) => (
    (s = new URL(s + ".js", t).href),
    n[s] ||
      new Promise((n) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = n), document.head.appendChild(e);
        } else (e = s), importScripts(s), n();
      }).then(() => {
        let e = n[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (t, i) => {
    const o =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (n[o]) return;
    let a = {};
    const c = (e) => s(e, o),
      r = { module: { uri: o }, exports: a, require: c };
    n[o] = Promise.all(t.map((e) => r[e] || c(e))).then((e) => (i(...e), a));
  };
}
define(["./workbox-9744ce2b"], function (e) {
  "use strict";
  self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "offline.html", revision: "6ce319106a4d8cd0ae5a0d08a07ae540" },
        {
          url: "icons/web-app-manifest-192x192.png",
          revision: "f0a99780c7a458ab16a8a2169fa3914e",
        },
        {
          url: "icons/web-app-manifest-512x512.png",
          revision: "764266f632c23d9e53271d9a73b09852",
        },
        {
          url: "manifest.webmanifest",
          revision: "31009b24e79a3c2e02d294e8bed9364d",
        },
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL("/index.html"), {
        denylist: [/^\/api\//],
      })
    ),
    e.registerRoute(
      /^https:\/\/fonts\.googleapis\.com/,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.gstatic\.com/,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 30, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ request: e }) => "document" === e.destination,
      new e.NetworkFirst({
        cacheName: "pages",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ request: e }) => ["style", "script", "worker"].includes(e.destination),
      new e.StaleWhileRevalidate({
        cacheName: "assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) =>
        e.origin === self.location.origin && e.pathname.endsWith(".png"),
      new e.CacheFirst({
        cacheName: "images",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET"
    );
});
