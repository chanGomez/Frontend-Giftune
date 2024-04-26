// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAthu } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfUZ1xju7nbTpaAPKbTAg_dhCw9W2nnwo",
  authDomain: "wrapt-60a45.firebaseapp.com",
  projectId: "wrapt-60a45",
  storageBucket: "wrapt-60a45.appspot.com",
  messagingSenderId: "201257303462",
  appId: "1:201257303462:web:613c247c6de98f8e00a367",
  measurementId: "G-0BEYBSEY28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAthu(app);

export{ app, auth, analytics}