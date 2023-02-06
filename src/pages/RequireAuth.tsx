import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTypedSelector } from "../hooks/useTypedSelector";

const RequireAuth = () => {
  const isAuth = useAuth();
  const { userData } = useTypedSelector((state) => state.user);
  const location = useLocation();

  return isAuth || userData ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace={true} />
  );
};
export default RequireAuth;
