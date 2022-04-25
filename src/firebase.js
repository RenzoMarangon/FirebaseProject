// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9wRIqoW_ggIFLTK3XQSXfDa4y09z2jUI",
  authDomain: "fir-proyect-38d8a.firebaseapp.com",
  projectId: "fir-proyect-38d8a",
  storageBucket: "fir-proyect-38d8a.appspot.com",
  messagingSenderId: "896569335188",
  appId: "1:896569335188:web:61cb11e16e755c592ec381"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage( app )
const db = getFirestore(app)

export default db;
export { app, storage };