const cacheName = "HeroesJS";

// Indicar lo que se guardara en cache
const staticAssets = [
    // Guarda lo que hay en la principal
    './',
    './logo.png',
    './index.html',
    './registrar.html',
    './manifest.webmanifest',
    './globales.css',
    './styles.css',
    './registrar.css',
    './app.js',
];

/* Se auto esucha y va a solicitar la instalacion, le mandamos una promesa y
 le metemos una constante de cache y abrimos la cache y le guardamos lo que tenemos en staticAssests
*/
self.addEventListener("install", async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

// Activamos el service Worker
self.addEventListener('activate', e => {
    self.clients.claim();
});

// request de la pagina para traernos lo de la cache
self.addEventListener('fetch', async e => {
    const req = e.request;
    const url = new URL(req.url);

    if (req.method === "POST") {
        return;
    } else {
        if (url.origin == location.origin) {
            e.respondWith(cacheFirst(req));
        } else {
            e.respondWith(networkAndCache(req));
        }
    }

});

async function cacheFirst(req) {
    if (req.method === "POST") {
        return;
    } else {
        const cache = await caches.open(cacheName);
        const cached = await cache.match(req);
        return cached || fetch(req);
    }
}

async function networkAndCache(req) {
    if (req.method === "POST") {
        return;
    } else {
        const cache = await caches.open(cacheName);
        try {

            const fresh = await fetch(req);
            await cache.put(req, fresh.clone());
            return fresh;

        } catch (error) {
            const cached = await cache.match(req);
            return cached;
        }
    }


}
