import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = false;

  return isLoggedIn ? children : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
