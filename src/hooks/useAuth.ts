import { useTypedSelector } from "./useTypedSelector";

export const useAuth = (): boolean => {
  const { accessToken } = useTypedSelector((state) => state.user);
  const isAuth = !!accessToken;
  return isAuth;
};
