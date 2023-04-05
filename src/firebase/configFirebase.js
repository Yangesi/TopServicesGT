// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMVi9EY-U8KQEgWCJ-cagXdnz7o1_arjY",
    authDomain: "top-services-gt.firebaseapp.com",
    projectId: "top-services-gt",
    storageBucket: "top-services-gt.appspot.com",
    messagingSenderId: "284940863369",
    appId: "1:284940863369:web:7c7aa3ab4ff8d5605c0358",
    measurementId: "G-8GKZHTKG5R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

