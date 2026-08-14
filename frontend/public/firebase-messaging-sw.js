// Firebase Cloud Messaging Service Worker
// This file MUST be named firebase-messaging-sw.js and placed in /public/

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Replace with your actual Firebase config
firebase.initializeApp({
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID'
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title || 'Krishi Sahayak Alert', {
    body: body || 'New weather update available',
    icon: '/vite.svg',
    badge: '/vite.svg',
    tag: 'weather-alert',
    data: payload.data || {}
  });
});
