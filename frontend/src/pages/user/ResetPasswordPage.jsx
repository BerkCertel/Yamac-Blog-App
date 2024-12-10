import ResetPassword from "../../components/Auth/ResetPassword/ResetPassword";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ResetPasswordPage() {
  const { isAuth } = useSelector((state) => state.user);

  return isAuth ? <Navigate to="/" /> : <ResetPassword />;
}

export default ResetPasswordPage;
