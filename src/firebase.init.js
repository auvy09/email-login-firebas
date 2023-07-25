// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDA4I5pO7JhjGSSj5z22J-OOaCJCBPv_JA",
    authDomain: "email-login-firebasev2.firebaseapp.com",
    projectId: "email-login-firebasev2",
    storageBucket: "email-login-firebasev2.appspot.com",
    messagingSenderId: "691029896321",
    appId: "1:691029896321:web:a3bfaf7bde66f8da3ff180"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;