// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9OLqJqU1TUsQv4LvOuAB0RssEIGAeR34",
  authDomain: "library-55a94.firebaseapp.com",
  projectId: "library-55a94",
  storageBucket: "library-55a94.appspot.com",
  messagingSenderId: "400321199741",
  appId: "1:400321199741:web:5f6cdc37a1d6264de6fb14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)
export const auth=getAuth(app)