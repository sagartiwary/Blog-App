import { createContext, useState } from "react";

export const Auth = createContext();

export const AuthContext = ({ children }) => {
  const [userName, setUserName] = useState(false);
  return (
    <Auth.Provider value={{ userName, setUserName }}>{children}</Auth.Provider>
  );
};
