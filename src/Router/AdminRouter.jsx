import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../Hook/useAuth";
import useAdmin from "../Hook/useAdmin";
import { LoaderIcon } from "react-hot-toast";
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <LoaderIcon></LoaderIcon>;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
