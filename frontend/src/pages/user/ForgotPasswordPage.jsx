import { useSelector } from "react-redux";
import ForgotPassword from "../../components/Auth/ForgotPassword/ForgotPassword";
import { Navigate } from "react-router-dom";

function ForgotPasswordPage() {
  const { isAuth } = useSelector((state) => state.user);

  return isAuth ? <Navigate to="/" /> : <ForgotPassword />;
}

export default ForgotPasswordPage;
