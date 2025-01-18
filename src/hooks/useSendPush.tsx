'use client';

import { useEffect, useState } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import { firebaseApp } from '@/utils/firebase/firebase';

const useSendPush = () => {
  const [token, setToken] = useState('');
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState('');

  useEffect(() => {
    const retrieveToken = async () => {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        try {
          const messaging = getMessaging(firebaseApp);

          // 알림 권한 요청
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          if (permission === 'granted') {
            alert('grandted는 됐어');
            // FCM 토큰 가져오기
            const currentToken = await getToken(messaging, {
              vapidKey:
                'BCfFDqn6mJDC_unugYg5-MuS4nYZWmY40sI3GKNqanCX8wIyL4QQM8yVpyN_uLqDqNP52lppWC9upzAJADfaoGY',
            });
            alert(currentToken);
            if (currentToken) {
              setToken(currentToken);
              console.log('FCM Token:', currentToken);
            } else {
              console.warn(
                'No registration token available. Request permission to generate one.',
              );
            }
          }
        } catch (error) {
          alert(error);
          console.error('An error occurred while retrieving token:', error);
        }
      } else {
        console.warn('Service Worker is not supported in this browser.');
      }
    };

    retrieveToken();
  }, []);

  return { fcmToken: token, notificationPermissionStatus };
};

export default useSendPush;
