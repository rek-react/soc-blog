import { FormGroup } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUpdateMeMutation } from "../../api/services/userApi";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IFormProfile } from "../../models/forms/profile";
import { ImageForm } from "../ImageForm";
import { AlertError } from "../UI/AlertError";

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
    formData.append("image", selectImage ? selectImage : imageUrl);
    formData.append("fullName", fullName);
    formData.append("email", email);
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
