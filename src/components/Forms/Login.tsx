import { useEffect } from "react";
import {
  useLoginMutation,
  useLogoutMutation,
} from "../../api/services/authApi";
import { IFormLogin } from "../../models/forms/auth/login";
import { AlertError } from "../UI/AlertError";
import { ButtonAuth } from "../UI/ButtonAuth";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  field: {
    marginBottom: "20px !important",
  },
}));

const defaultValues: IFormLogin = {
  login: "",
  password: "",
};

export const FormLogin = () => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors: errorsForm },
  } = useForm({ defaultValues });

  const [loginUser, { error, isError, isLoading, isSuccess }] =
    useLoginMutation();
  const [logoutUser] = useLogoutMutation();
  const navigate = useNavigate();
  const isAuth = useAuth();
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
    if (isAuth) {
      logoutUser();
    }
  }, [isLoading]);
  const handleOnSubmit = (values: IFormLogin) => {
    loginUser(values);
  };
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <TextField
        className={classes.field}
        label="E-Mail или fullname"
        type="text"
        error={!!errorsForm.login || isError}
        helperText={errorsForm.login?.message}
        {...register("login", { required: "Обязательно Email" })}
        fullWidth
      />
      <TextField
        className={classes.field}
        label="Пароль"
        type="password"
        error={!!errorsForm.password || isError}
        helperText={errorsForm.password?.message}
        {...register("password", {
          required: "Обязательно Password",
        })}
        fullWidth
      />
      <AlertError error={error} />
      <ButtonAuth isLoading={isLoading}>Войти</ButtonAuth>
    </form>
  );
};
