import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/user/HomePage";
import AboutPage from "./pages/user/AboutPage";
import ContactPage from "./pages/user/ContactPage";
import ArticlesPage from "./pages/user/ArticlesPage";
import BooksPage from "./pages/user/BooksPage";
import BookDetailsPage from "./pages/user/BookDetailsPage";
import ArticleDetailsPage from "./pages/user/ArticleDetailsPage";
import UserProfilePage from "./pages/user/UserProfilePage";
import NotFoundPage from "./pages/user/NotFountPage";
import AuthPage from "./pages/user/AuthPage";
import ForgotPasswordPage from "./pages/user/ForgotPasswordPage";
import ResetPasswordPage from "./pages/user/ResetPasswordPage";
import AdminPage from "./pages/admin/AdminPage";
import GuestBookPage from "./pages/user/GuestBookPage";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { profile } from "./redux/userSlice";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "animate.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <Routes>
        <Route exact path="/admin" element={<AdminPage />} />
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/contact" element={<ContactPage />} />
        <Route exact path="/about" element={<AboutPage />} />
        <Route exact path="/guestbook" element={<GuestBookPage />} />
        <Route exact path="/auth" element={<AuthPage />} />
        <Route exact path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route exact path="/reset/:token" element={<ResetPasswordPage />} />
        <Route exact path="/profile" element={<UserProfilePage />} />
        <Route exact path="/books" element={<BooksPage />} />
        <Route exact path="/book/:id" element={<BookDetailsPage />} />
        <Route exact path="/articles" element={<ArticlesPage />} />
        <Route exact path="/article/:id" element={<ArticleDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
