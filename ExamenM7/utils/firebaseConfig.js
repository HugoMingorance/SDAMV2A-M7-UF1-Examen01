// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWgqqWJaXHBublwGLEaFXXUweU7dTcewo",
  authDomain: "examenm7-415b1.firebaseapp.com",
  projectId: "examenm7-415b1",
  storageBucket: "examenm7-415b1.firebasestorage.app",
  messagingSenderId: "904016259654",
  appId: "1:904016259654:web:72d8d7288ea4ce51f53847",
  measurementId: "G-E7VLJ3TKJJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};
