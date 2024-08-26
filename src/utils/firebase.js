import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCybzQ2lTcI2uN9wkZVrNt4WKMcCNAekXA",
  authDomain: "ieee-website-75f21.firebaseapp.com",
  projectId: "ieee-website-75f21",
  storageBucket: "ieee-website-75f21.appspot.com",
  messagingSenderId: "595732300564",
  appId: "1:595732300564:web:a068b0495c03b42b763801",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
