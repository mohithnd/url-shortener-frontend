import { createContext } from "react";

export const AuthContext = createContext(null);

export const AuthProider = ({ children }) => {
  const value = {};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
