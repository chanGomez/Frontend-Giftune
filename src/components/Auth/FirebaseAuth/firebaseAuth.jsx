// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfdTeoIvAvOLiRg0_6jia8n3v0mjU-5yY",
  authDomain: "giftune-auth.firebaseapp.com",
  projectId: "giftune-auth",
  storageBucket: "giftune-auth.appspot.com",
  messagingSenderId: "617561190752",
  appId: "1:617561190752:web:272c4ec327b7774c036e05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

