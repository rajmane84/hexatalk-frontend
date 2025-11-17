import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/not-found";
import Navbar from "../components/navbar";
import HomePage from "../pages/home";
import ChatPage from "../pages/chat-page";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat/:chatId" element={<ChatPage />} />
      </Route>

      <Route path="/sign-in" element={<h1>Sign In</h1>} />
      <Route path="/sign-up" element={<h1>Sign Up</h1>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;