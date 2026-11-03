import { initializeApp } from "firebase/app";
//import {getAnalytics} from 'firebase/analytics'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4W1jaf_-uGIH-l2ff9RpmiNUlHnGMbQk",
  authDomain: "mi-ecommerce-react-d85fa.firebaseapp.com",
  projectId: "mi-ecommerce-react-d85fa",
  storageBucket: "mi-ecommerce-react-d85fa.firebasestorage.app",
  messagingSenderId: "1046628756437",
  appId: "1:1046628756437:web:36a1ac074e11d50347ab5c",
};

const app = initializeApp(firebaseConfig);
// Si agregaste Analytics verás esto además.
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
