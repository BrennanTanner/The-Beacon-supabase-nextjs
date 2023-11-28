'use strict';

/* eslint-env browser, serviceworker */

self.addEventListener('install', () => {
	self.skipWaiting();
});

self.addEventListener('push', function(event) {
	console.log('Push message received.');
	let notificationTitle = 'A beacon was lit!';
	const notificationOptions = {
		body:  'Someone has lit their beacon!',
		icon: './Beacon.png',
		badge: './Beacon.png',
		data: {
			url: 'https://www.lightthebeacon.app',
		},
	};

	if (event.data) {
		const dataText = event.data.text();
		notificationTitle = 'A beacon was lit!';
		notificationOptions.body = `${dataText} has lit their beacon!`;
	}

	event.waitUntil(
		self.registration.showNotification(
			notificationTitle,
			notificationOptions,
		),
	);
});

self.addEventListener('notificationclick', function(event) {
	console.log('Notification clicked.');
	event.notification.close();

	let clickResponsePromise = Promise.resolve();
	if (event.notification.data && event.notification.data.url) {
		clickResponsePromise = clients.openWindow(event.notification.data.url);
	}

	event.waitUntil(clickResponsePromise);
});
