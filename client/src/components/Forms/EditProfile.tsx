import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IFormProfile } from "../../models/forms/profile";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useUpdateMeMutation } from "../../api/services/userApi";
import { useNavigate } from "react-router-dom";
import { AlertError } from "../UI/AlertError";
import { ImageForm } from "../ImageForm";
import { makeStyles } from "@mui/styles";
import { FormGroup } from "@mui/material";

const useStyles = makeStyles(() => ({
  field: {
    margin: "20px 0 10px !important",
  },
}));

const defaultValues: IFormProfile = {
  fullName: "",
  email: "",
};

export const FormProfile = () => {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const [selectImage, setSelectImage] = useState<Blob | null>(null);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const { userData } = useTypedSelector((state) => state.user);
  const [updateMe, { isLoading, isSuccess, error, isError }] =
    useUpdateMeMutation();
  const handleOnSubmit = ({ fullName, email }: IFormProfile) => {
    const formData = new FormData();
    if (fullName !== userData?.fullName) formData.append("fullName", fullName);
    if (email !== userData?.email) formData.append("email", email);
    formData.append("image", selectImage ? selectImage : imageUrl);
    updateMe(formData);
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);
  useEffect(() => {
    handleChangeValues()
  }, [userData, setValue]);
  const handleChangeValues = () => {
    if (userData) {
      setImageUrl(userData.avatarUrl || "");
      setValue("fullName", userData.fullName || "");
      setValue("email", userData.email || "");
    }
  };
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <ImageForm
        imageUrl={imageUrl}
        selectImage={selectImage}
        setImageUrl={setImageUrl}
        setSelectImage={setSelectImage}
        isProfile
      />
      <FormGroup>
        <TextField
          className={classes.field}
          type="text"
          label="Полное имя"
          error={!!errors.fullName || isError}
          helperText={errors.fullName?.message}
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
          type="email"
          label="Email"
          error={!!errors.email || isError}
          helperText={errors.email?.message}
          {...register("email", {
            required: "Обязательно Email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Неккоретный Email",
            },
          })}
          fullWidth
        />
      </FormGroup>
      {userData?.isActive ? (
        <Typography color="green" variant="h6">
          Аккаунт активирован
        </Typography>
      ) : (
        <Typography color="red" variant="h6">
          Аккаунт не активирован
        </Typography>
      )}
      <AlertError error={error} />
      <Button
        style={{ marginTop: 20 }}
        type="submit"
        size="large"
        variant="contained"
        disabled={isLoading}
      >
        Изменить
      </Button>
      <Button
        style={{ marginTop: 20, marginLeft: 20 }}
        type="button"
        size="large"
        onClick={handleChangeValues}
      >
        Cбросить
      </Button>
    </form>
  );
};
