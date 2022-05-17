import { initializeApp } from "firebase/app";

// Firebase methods for creating and authoriztion users
// Methods create documents for authorized users
// and handles sign in authoriztaion
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver
} from "firebase/auth";

import {
  getFirestore,
  doc, // doc retrieves document instances from firestore db
  getDoc, // getting document data (access data)
  setDoc, // setting document data (setting data)
  collection, // Returns a collection reference
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot
} from "firebase/firestore";

import { Category } from "../../store/category/category.types";

// Necessary config copied from firebase when
// app is created
const firebaseConfig = {
  apiKey: "AIzaSyDzQLYyToqhxtma2BiODElyBhWZFtHX5mE",
  authDomain: "noneko-clothing-db.firebaseapp.com",
  projectId: "noneko-clothing-db",
  storageBucket: "noneko-clothing-db.appspot.com",
  messagingSenderId: "582434101743",
  appId: "1:582434101743:web:7d0ce6c85ca9bdf3f1fe1a",
};

const firebaseApp = initializeApp(firebaseConfig);

// Creates google authorization provider object which is used in this app for 'sign in with google'
const googleProvider = new GoogleAuthProvider();

// Another firebase config for the google popup to sign in with google
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(); // singelton used to help track authentication states throughout app

// This function creates a user from 'sign in with google'
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore(); // Directly points to firestore db

export type ObjectToAdd = {
  title: string;
}

// Write shop-data to firestore db
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);
  return querySnapShot.docs.map((docSnapshot) => docSnapshot.data() as Category);
};

export type AdditionalInformation = {
  displayName?: string;
}

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
}

// This function is used to create an authorized user in firebase db
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;
  // Check for existing document reference doc takes 3 args | database instance | collection | uid
  // userDocRef points to a unique point id in database. It does not create the document or data
  const userDocRef = doc(db, "users", userAuth.uid);
  // Get data from specific user with uid
  const userSnapshot = await getDoc(userDocRef);

  // if user data does not exist
  // create / set document with data from userAuth into collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // set userDoc with object keys pulled off from userAuth and a time stamp when document was created
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating user", error);
    }
  }
  // if user data exists
  // return userDocRef
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

// Create user document for users that sign up with email and password
export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  // stop this function from running if email and password aren't present
  if (!email || !password) return;

  // firebase method to create authorized user in firestore db
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Check if user sign in is authorized and is in the firestore db
export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// Signs user out and updates nav component to allow a user to sign in
export const signOutUser = async () => await signOut(auth);

// Observerable Listner to keep track of user auth and consolodate auth
// logic in using Redux within App component
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
