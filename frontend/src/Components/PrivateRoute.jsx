import React, { useContext } from "react";
import { Auth } from "./AuthContext";
import { Navigate } from "react-router-dom";
export const PrivateRoute = ({ children }) => {
  const { userName } = useContext(Auth);
  if (!userName) {
    return <Navigate to={"/login"} />;
  }
  return children;
};
