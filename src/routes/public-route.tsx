import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/user.store";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const email = useUserStore((state) => state.email);

  if (email) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;