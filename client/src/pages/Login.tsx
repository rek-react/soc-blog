import { useEffect } from "react";
import { FormLogin } from "../components/Forms/Login";
import { PaperRoot } from "../components/PaperRoot";
import { useAuth } from "../hooks/useAuth";
import { useLogoutMutation } from "../api/services/authApi";

const Login = () => {
  const isAuth = useAuth()
  const [logout] = useLogoutMutation()
  useEffect(()=> {
    if(isAuth){
      logout()
    }
  }, [])
  return (
    <PaperRoot title="Вход">
      <FormLogin />
    </PaperRoot>
  );
};
export default Login;
