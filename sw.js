// Offline shell for the weather display.
//
// Network first, cache as fallback. That order matters for how this app is updated:
// you upload a new index.html to GitHub Pages, so a cache-first worker would serve
// the old page on the next relaunch and only pick up the change the relaunch after.
// Network first means you always get the newest file when the Wi-Fi is up, and the
// cached copy only appears when it is down.
//
// The Open-Meteo calls are deliberately not cached here. They are cross origin, and
// the page already stashes its last good forecast in localStorage.
//
// No version bumping needed: every successful load refreshes the cached copy.

var CACHE = 'weather-shell';
var ASSETS = ['./', './index.html', './icon.png'];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  if (req.url.indexOf(self.location.origin) !== 0) return;   // let the API go straight out

  e.respondWith(
    fetch(req).then(function (res) {
      if (res && res.status === 200) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
      }
      return res;
    }, function () {
      return caches.match(req).then(function (hit) {
        // A navigation to any path still deserves the app rather than a browser error.
        return hit || caches.match('./index.html');
      });
    })
  );
});
