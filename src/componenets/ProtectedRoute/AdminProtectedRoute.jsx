import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // User login nahi hai
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // User admin nahi hai
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin hai
  return children;
};

export default AdminProtectedRoute;