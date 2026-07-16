import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Check if token exists and user is admin
  if (!token || !user || user.is_admin !== 1) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;
