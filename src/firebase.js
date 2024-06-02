// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCt-EGSnfadOwmwJxhor07cn-LWqKxwO3w",
  authDomain: "movie-manager-130ff.firebaseapp.com",
  databaseURL: "https://movie-manager-130ff-default-rtdb.firebaseio.com",
  projectId: "movie-manager-130ff",
  storageBucket: "movie-manager-130ff.appspot.com",
  messagingSenderId: "161121729102",
  appId: "1:161121729102:web:3b01f0df1a81a3be3f211f",
  measurementId: "G-MME5BEQVL1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);