import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCinDymN3uSScau-FesSP9rCoLZZmtKL94',
  authDomain: 'kickads-metrics.firebaseapp.com',
  projectId: 'kickads-metrics',
  storageBucket: 'kickads-metrics.appspot.com',
  messagingSenderId: '473663126662',
  appId: '1:473663126662:web:7a6a9c5ef3804aa861a507'
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);