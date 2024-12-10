import { useSelector } from "react-redux";
import Admin from "../../components/Admin/Admin";
import { Navigate } from "react-router-dom";

function AdminPage() {
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth" />;
  }

  if (user?.user && user?.user?.role == "admin") {
    return <Admin />;
  }

  if (user?.user && user?.user?.role == "user") {
    return <Navigate to="/profile" />;
  }
}

export default AdminPage;
