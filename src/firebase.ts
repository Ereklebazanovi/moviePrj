// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYy_Yh_6NAIA8tUe2ppdBKTtilPbr9l8I",
  authDomain: "movie-oauth.firebaseapp.com",
  projectId: "movie-oauth",
  storageBucket: "movie-oauth.firebasestorage.app",
  messagingSenderId: "427555866433",
  appId: "1:427555866433:web:8b2e1bd85acbc9177fc3c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
