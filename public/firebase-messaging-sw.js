importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAIxFuwHl0nxNN_17t3LfmBh52Fj3IA0co",
    authDomain: "push-notification-97937.firebaseapp.com",
    projectId: "push-notification-97937",
    storageBucket: "push-notification-97937.appspot.com",
    messagingSenderId: "307111201154",
    appId: "1:307111201154:web:0fa79060177eac826b279b",
    measurementId: "G-WPQGC45ZE8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/1ww.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
