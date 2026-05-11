import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: "dashboard-tds-25",
  appId: "1:919633065833:web:d977d54d900128d5a0eff8",
  storageBucket: "dashboard-tds-25.firebasestorage.app",
  apiKey: "AIzaSyDKtu5IZgGr7rQ0cCulNSMpRxDheK73XYE",
  authDomain: "dashboard-tds-25.firebaseapp.com",
  messagingSenderId: "919633065833"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
