import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBFXI88w_YtNZOwiUxZ-kU8RclocKdRtPQ',
  authDomain: 'projet-odd.firebaseapp.com',
  projectId: 'projet-odd',
  storageBucket: 'projet-odd.appspot.com',
  messagingSenderId: '559952560648',
  appId: '1:559952560648:web:8079805fa1b2f92338c7bd',
  measurementId: 'G-BTE3HQKNR9'
};

const app = initializeApp(firebaseConfig);

export default app;
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
