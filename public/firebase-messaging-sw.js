importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js',
);

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

// 푸시 이벤트 처리
// 푸시 내용을 처리해서 알림으로 띄운다.
self.addEventListener('push', function (event) {
  console.log('서비스워커푸시이벤트확인', event);

  const data = event.data.json(); // JSON 파싱
  console.log('JSON 데이터:', data);
  // 알림 메세지일 경우엔 event.data.json().notification;

  const options = {
    body: data.notification.body,
    icon: '/images/icon-512x512.png',
    image: '/images/icon-512x512.png',
    data: {
      click_action: data.data.redirectUrl, // 이 필드는 밑의 클릭 이벤트 처리에 사용됨
    },
  };

  event.waitUntil(
    self.registration.showNotification(data.notification.title, options),
  );
});

// 클릭 이벤트 처리
// 알림을 클릭하면 사이트로 이동한다.
self.addEventListener('notificationclick', function (event) {
  event.preventDefault();
  // 알림창 닫기
  event.notification.close();
  console.log('서비스워커푸시알림클릭', event);

  // 이동할 url
  // 아래의 event.notification.data는 위의 푸시 이벤트를 한 번 거쳐서 전달 받은 options.data에 해당한다.
  // api에 직접 전달한 데이터와 혼동 주의
  const urlToOpen = event.notification.data.click_action;

  // 클라이언트에 해당 사이트가 열려있는지 체크
  const promiseChain = clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then(function (windowClients) {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url.includes(urlToOpen)) {
          matchingClient = windowClient;
          break;
        }
      }

      // 열려있다면 focus, 아니면 새로 open
      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(urlToOpen);
      }
    });

  event.waitUntil(promiseChain);
});
