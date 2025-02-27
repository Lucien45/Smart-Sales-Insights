import React from "react"
import { ProtectedRouteProps } from "../types/routes"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, useLocation } from "react-router-dom";


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  
  const { user, token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  else{
    return <Navigate to="/admin" replace />;
  }
  return (
    <>{children}</>
  )
}

export default ProtectedRoute