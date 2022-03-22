// This context is used in firebase utils, nav, and sign-in
// components to track if authenticated user is signed-in, sign-out
import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// Create default value for UserContext
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// Component to wrap any component that needs access to Context
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  // Listen to changes in auth status, create a user doc if none exist
  // unsubscribe if user logs out
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
