import type React from "react";
import { Navigate } from "react-router-dom";

type props = {
  children: React.ReactNode;
};
const ProtectedRoute = ({ children }: props) => {
    const token = localStorage.getItem("token");

    if(!token){
        return <Navigate to={'/sign-in'} replace/>
    }
  return <>{children}</>;
};
//ProtectedRoute

export default ProtectedRoute;
