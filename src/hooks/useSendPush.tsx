'use client';

import { useState, useEffect } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import { firebaseApp } from '@/utils/firebase/firebase';

const useSendPush = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  const requestFcmToken = async () => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      try {
        const messaging = getMessaging(firebaseApp);

        // FCM 토큰 요청
        const currentToken = await getToken(messaging, {
          vapidKey:
            'BCfFDqn6mJDC_unugYg5-MuS4nYZWmY40sI3GKNqanCX8wIyL4QQM8yVpyN_uLqDqNP52lppWC9upzAJADfaoGY',
        });

        if (currentToken) {
          setFcmToken(currentToken);
          console.log('FCM Token:', currentToken);
        } else {
          console.warn(
            'No registration token available. Request permission to generate one.',
          );
        }
      } catch (error) {
        console.error('Error retrieving FCM token:', error);
      }
    } else {
      console.warn('Service Worker is not supported in this browser.');
    }
  };

  return { fcmToken, requestFcmToken };
};

export default useSendPush;
