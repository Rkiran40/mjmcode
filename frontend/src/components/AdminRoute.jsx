import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  // ✅ Must match login storage key
  const token = localStorage.getItem("token");

  // Allow access if token exists
  if (token) {
    return children;
  }

  // Otherwise redirect to login
  return <Navigate to="/admin/login" replace />;
}

export default AdminRoute;
