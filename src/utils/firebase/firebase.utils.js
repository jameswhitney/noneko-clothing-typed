import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzQLYyToqhxtma2BiODElyBhWZFtHX5mE",
  authDomain: "noneko-clothing-db.firebaseapp.com",
  projectId: "noneko-clothing-db",
  storageBucket: "noneko-clothing-db.appspot.com",
  messagingSenderId: "582434101743",
  appId: "1:582434101743:web:7d0ce6c85ca9bdf3f1fe1a",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
