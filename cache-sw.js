let restaurantCache = "restaurantCache";
let cacheFiles = [
	'./index.html',
    './restaurant.html',
    './css/styles.css',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    'https://fonts.googleapis.com/css?family=Roboto'
]

// Install cache
self.addEventListener('install', function(event) {
	console.log("Installing Service Worker: ", event);

	event.waitUntil(
		caches
			.open(restaurantCache)
			.then(cache => cache.addAll(cacheFiles))
			.catch(err => console.error("Service Worker failed to open Cache: ", err))
	);
});

// Fetch results from cache
self.addEventListener('fetch', function(event) {
		console.log("Fetch Service Worker: ", event);

		event.respondWith(
			caches
				.match(event.request)
				.then(response => response || fetch(event.request))
				.catch(err => console.error("Fetch Service Worker Error: ", err))
		);
});

self.addEventListener('activate', function(event) {
	console.log("Activate Service Worker: ", event);

	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames
					.filter(cacheName => cacheName !== restaurantCache)
					.map(cacheName => caches.delete(cacheName))
			)
		})
	)
});