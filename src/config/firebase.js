// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDt-pMP-KjNEiZnjD8S-sawECnvbM9TlY",
  authDomain: "crud-6a0eb.firebaseapp.com",
  projectId: "crud-6a0eb",
  storageBucket: "crud-6a0eb.appspot.com",
  messagingSenderId: "157192722771",
  appId: "1:157192722771:web:0af5930ec3a5205cbaa9a6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
