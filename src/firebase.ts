import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: "tds-convert-v1-77854",
  appId: "1:444430203937:web:ca55831d44c9b4a70ab760",
  storageBucket: "tds-convert-v1-77854.firebasestorage.app",
  apiKey: "AIzaSyCUmzMHFZp6Oa28WfvexydOGupD2wDgLWw",
  authDomain: "tds-convert-v1-77854.firebaseapp.com",
  messagingSenderId: "444430203937"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
