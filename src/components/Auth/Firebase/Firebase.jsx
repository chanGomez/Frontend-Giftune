import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
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
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export{ app, auth}