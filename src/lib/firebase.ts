import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "resonant-analyst-5dckx.firebaseapp.com",
  projectId: "resonant-analyst-5dckx",
  storageBucket: "resonant-analyst-5dckx.appspot.com",
  messagingSenderId: "608769256217",
  appId: "1:608769256217:web:c67c5453005b85a363b963",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
