import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/not-found";
import Navbar from "../components/navbar";
import HomePage from "../pages/home";
import ChatPage from "../pages/chat-page";
import NotificationPage from "../pages/notifications-page";
import ProtectedRoute from "./protected-route";
import SignIn from "../pages/auth/sign-in";
import SignUp from "../pages/auth/sign-up";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <Navbar />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/chat/:chatId" element={<ChatPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
      </Route>

      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
