import { useEffect } from "react";
import { useLogoutMutation } from "../api/services/authApi";
import { FormRegistration } from "../components/Forms/Registration";
import { PaperRoot } from "../components/PaperRoot";
import { useAuth } from "../hooks/useAuth";

const Registration = () => {
  const [logout] = useLogoutMutation()
  const isAuth = useAuth()
  useEffect(()=> {
    if(isAuth){
      logout()
    }
  }, [])
  return (
    <PaperRoot title="Регистрация">
      <FormRegistration />
    </PaperRoot>
  );
};
export default Registration;
