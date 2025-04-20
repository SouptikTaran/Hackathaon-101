// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4ZGFDW-fofo_VGhQoZo5hc-I6iVkFUOs",
  authDomain: "decrd-e9c18.firebaseapp.com",
  projectId: "decrd-e9c18",
  storageBucket: "decrd-e9c18.firebasestorage.app",
  messagingSenderId: "844880557687",
  appId: "1:844880557687:web:319afee7e358b45e2eb872",
  measurementId: "G-LD2CSKKCS7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };