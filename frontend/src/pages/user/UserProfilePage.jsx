import UserProfile from "../../components/UserProfile/UserProfile";
import { Navigate } from "react-router-dom";

function UserProfilePage() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth" />;
  }

  return <UserProfile />;
}

export default UserProfilePage;
