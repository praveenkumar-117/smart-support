
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import IsLoading from "../components/otherComponents/IsLoading";

function ProtectedRoute({ allowedRole }) {
  const { user, token, loading } = useSelector(
    (state) => state.auth
  );

  if (loading) {
    return <IsLoading />
  }
    if (!token || !user) {
      return <Navigate to="/" replace />;
    }

    if (allowedRole && user.role !== allowedRole) {
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
  }

  export default ProtectedRoute;
