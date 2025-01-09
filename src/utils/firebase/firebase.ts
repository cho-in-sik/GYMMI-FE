import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBfrXLO5vfWpmoyqO9jqRFn8uEw3nHei1Y',
  authDomain: 'gymmi-e23b1.firebaseapp.com',
  projectId: 'gymmi-e23b1',
  storageBucket: 'gymmi-e23b1.firebasestorage.app',
  messagingSenderId: '186695108886',
  appId: '1:186695108886:web:87784a64f0a1aad4e76837',
  measurementId: 'G-HWG97VJDCD',
};

export const firebaseApp = initializeApp(firebaseConfig);
