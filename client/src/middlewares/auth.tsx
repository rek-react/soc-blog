import { Outlet } from "react-router-dom";
import { useGetMeQuery } from "../api/services/userApi";
import { Loader } from "../components/Loader";
import { useAuth } from "../hooks/useAuth";

const AuthMiddleware = () => {
  const isAuth = useAuth();
  const { isLoading } = useGetMeQuery(null, {
    skip: !isAuth,
  });
  if (isLoading) {
    return <Loader />;
  }

  return <Outlet />;
};
export default AuthMiddleware;
