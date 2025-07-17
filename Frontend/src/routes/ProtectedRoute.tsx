import type React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type props = {
  children: React.ReactNode;
};
type decodedToken = {
  exp: number;
};
const ProtectedRoute = ({ children }: props) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/sign-in"} replace />;
  }
  try {
    const decodedToken: decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem(token);
      return <Navigate to={"/sign-in"} replace />;
    }

    return <>{children}</>;
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to={"/sign-in"} replace />;
  }
};

export default ProtectedRoute;
