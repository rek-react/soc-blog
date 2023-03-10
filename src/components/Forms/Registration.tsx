import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { ButtonAuth } from "../UI/ButtonAuth";
import { AlertError } from "../UI/AlertError";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useLogoutMutation,
  useRegisterMutation,
} from "../../api/services/authApi";
import { IFormRegister } from "../../models/forms/auth/register";
import { useAuth } from "../../hooks/useAuth";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  field: {
    marginBottom: "20px !important",
  },
}));

const defaultValues: IFormRegister = {
  fullName: "",
  email: "",
  password: "",
};

export const FormRegistration = () => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,

    formState: { errors: errorsForm },
  } = useForm({ defaultValues });

  const [registerUser, { error, isError, isLoading, isSuccess }] =
    useRegisterMutation();
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
  const handleOnSubmit = (values: IFormRegister) => {
    values.fullName = values.fullName.replace(/\s*/g, "");
    registerUser(values);
  };
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <TextField
        className={classes.field}
        type="text"
        label="Полное имя"
        error={!!errorsForm.fullName || isError}
        helperText={errorsForm.fullName?.message}
        {...register("fullName", {
          required: "Обязательно полное имя",
          minLength: {
            value: 3,
            message: "Длина fullName должа быть не менее 3 символов",
          },
        })}
        fullWidth
      />
      <TextField
        className={classes.field}
        label="E-Mail"
        type="email"
        error={!!errorsForm.email || isError}
        helperText={errorsForm.email?.message}
        {...register("email", {
          required: "Обязательно Email",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Неккоретный Email",
          },
        })}
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
          minLength: {
            value: 5,
            message: "Длина пароля должа быть минимум 5 символов",
          },
        })}
        fullWidth
      />
      <AlertError error={error} />
      <ButtonAuth isLoading={isLoading}>Зарегистрироваться</ButtonAuth>
    </form>
  );
};
