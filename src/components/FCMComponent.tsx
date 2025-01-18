'use client';

import { useEffect } from 'react';
import { getMessaging, onMessage } from 'firebase/messaging';
import { firebaseApp } from '@/utils/firebase/firebase';

import useSendPush from '@/hooks/useSendPush';
import { postFcmToken } from '@/api/fcm';

export default function FCMComponent() {
  const { fcmToken, notificationPermissionStatus } = useSendPush();

  useEffect(() => {
    if (typeof window !== 'undefined' && fcmToken) {
      // FCM 토큰 로컬스토리지에 저장
      localStorage.setItem('fcmToken', fcmToken);
      const token = localStorage.getItem('accessToken');
      if (token) {
        postFcmToken(fcmToken)
          .then((res) => console.log('FCM Token sent:', res))
          .catch((err) => console.error('Error sending FCM Token:', err));
      }
    }

    // 알림 권한 요청
    if (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      Notification.permission !== 'granted'
    ) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('알림 권한 허용되었습니다.');
        } else {
          console.warn('알림 권한 거부됨');
        }
      });
    }

    // 포그라운드 상태에서 수신된 푸시 메시지 처리
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log('포그라운드 메시지 수신:', payload);
        const { title, body } = payload.notification || {};

        if (Notification.permission === 'granted') {
          new Notification(title || '알림', {
            body: body || '내용 없음',
            icon: '/images/basicIcon.png',
          });
        }
      });

      return () => {
        unsubscribe(); // 메시지 구독 해제
      };
    }
  }, [fcmToken]);

  return null;
}
