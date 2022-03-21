import { createContext, useState } from "react";

// Create default value for UserContext
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// Component to wrap any component that needs access to Context
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
