import { useEffect, useLayoutEffect, useState } from "react";
import { useLoginMutation } from "../../api/services/authApi";
import { IFormLogin } from "../../models/forms/auth/login";
import { AlertError } from "../UI/AlertError";
import { ButtonAuth } from "../UI/ButtonAuth";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const useStyles = makeStyles(() => ({
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
    setValue,
    getValues,
    formState: { errors: errorsForm },
  } = useForm({ defaultValues });
  const [checked, setChecked] = useState(false);
  const [rememberLogin, setRememberLogin] = useLocalStorage("login");
  const [loginUser, { error, isError, isLoading, isSuccess }] =
    useLoginMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (rememberLogin) {
      setValue("login", rememberLogin);
      setChecked(true);
    }
  }, []);
  useLayoutEffect(() => {
    if (isSuccess) {
      if (checked) {
        setRememberLogin(getValues("login"));
      } else if (!checked && rememberLogin) {
        setRememberLogin("");
      }
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);
  const handleOnSubmit = (values: IFormLogin) => {
    loginUser(values);
  };
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <FormGroup>
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
        <FormControlLabel
          sx={{
            alignSelf: "flex-start",
          }}
          control={
            <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
          }
          label="Запомнить меня"
        />
      </FormGroup>

      <AlertError error={error} />
      <ButtonAuth isLoading={isLoading}>Войти</ButtonAuth>
    </form>
  );
};
