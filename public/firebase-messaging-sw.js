importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

// Firebase 초기화
firebase.initializeApp({
  apiKey: 'AIzaSyBfrXLO5vfWpmoyqO9jqRFn8uEw3nHei1Y',
  authDomain: 'gymmi-e23b1.firebaseapp.com',
  projectId: 'gymmi-e23b1',
  storageBucket: 'gymmi-e23b1.firebasestorage.app',
  messagingSenderId: '186695108886',
  appId: '1:186695108886:web:87784a64f0a1aad4e76837',
  measurementId: 'G-HWG97VJDCD',
});

const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log('[서비스 워커] 백그라운드 메시지 수신:', payload);
  const notificationTitle = payload.notification?.title || '알림';
  const notificationOptions = {
    body: payload.notification?.body || '내용 없음',
    icon: payload.notification?.icon || '/images/basicIcon.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 클릭 이벤트 처리
self.addEventListener('notificationclick', (event) => {
  console.log('알림 클릭 이벤트 발생:', event);
  event.notification.close();
  const url = event.notification.data?.click_action || '/';
  event.waitUntil(clients.openWindow(url));
});
