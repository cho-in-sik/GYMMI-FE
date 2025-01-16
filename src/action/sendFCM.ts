'use server';

import admin, { ServiceAccount } from 'firebase-admin';

interface NotificationData {
  title: string;
  body: string;
  image?: string;
  click_action?: string;
  token: string;
}

export const sendFCMNotification = async (data: NotificationData) => {
  const serviceAccount: ServiceAccount = {
    projectId: 'gymmi-e23b1',
    privateKey: 'nrFHJbXNTrLukC1G6AAx_0IwLHPJT7DK9-M_j92cVRs',
    clientEmail: 'firebase-adminsdk-ib7jp@gymmi-e23b1.iam.gserviceaccount.com',
  };

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const message = {
    notification: {
      title: data.title,
      body: data.body,
      image: data.image,
    },
    data: {
      click_action: data.click_action || '/',
    },
    token: data.token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to send FCM notification');
  }
};
