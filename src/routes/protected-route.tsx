import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/user.store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userDetails = useUserStore((state) => state);
  // const userDetails = {email: 'r@rm.com'}

  if(userDetails.email !== null && userDetails.email !== null) return children

  return <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
