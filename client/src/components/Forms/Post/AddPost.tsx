import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
  useCreatePostMutation,
} from "../../../api/services/postApi";
import { IFormPost } from "../../../models/forms/post";
import "easymde/dist/easymde.min.css";
import Editor from "react-simplemde-editor";
import { ButtonsAddPost } from "./components/Buttons";
import { AlertError } from "../../UI/AlertError";
import { Options } from "easymde";
import { makeStyles } from "@mui/styles";
import { ImageForm } from "../../ImageForm";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginTop: "20px !important",
    "& input": {
      fontSize: "35px",
      fontWeight: 900,
      [theme.breakpoints.down("sm")]: {
        fontSize: "23px",
      },
    },
  },
  tags: {
    margin: "25px 0 15px !important",
  },
  editor: {
    margin: "30px -30px",
    ":global": {
      ".cm-s-easymde": {
        border: 0,
        fontSize: "22px",
      },

      ".editor-toolbar": {
        border: 0,
        backgroundColor: "rgb(0 0 0 / 2%)",
      },
    },
    [theme.breakpoints.down("sm")]: {
      margin: "15px -15px",
    },
  },
  error: {
    color: "#d32f2f",
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: 1.66,
    letterSpacing: "0.03333em",
  },
}));

const defaultValues = {
  imageUrl: "",
  title: "",
  tags: "",
  text: "",
};

const options = {
  spellChecker: false,
  autofocus: true,
  placeholder: "Введите текст...",
  status: false,

  autosave: {
    enabled: true,
    delay: 1000,
  },
} as Options;

export const FormAddPost = () => {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState("");
  const [selectImage, setSelectImage] = useState<Blob | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors: errorsForm },
  } = useForm({ defaultValues });
  const navigate = useNavigate();
  const [
    createPost,
    {
      isSuccess: isCreateSuccess,
      isLoading: isCreateLoading,
      isError: isCreateError,
      error: errorCreate,
    },
  ] = useCreatePostMutation();
  useEffect(() => {
    if (isCreateSuccess) {
      navigate("/");
    }
  }, [isCreateSuccess]);
  const handleOnSubmit = ({ title, tags, text }: IFormPost) => {
    const formData = new FormData();
    formData.append("image", selectImage ? selectImage : imageUrl);
    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("text", text);
    createPost(formData);
  };
  const handleReset = () => {
    reset();
    setImageUrl("");
  };
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <ImageForm
        selectImage={selectImage}
        setSelectImage={setSelectImage}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
      />
      <TextField
        className={classes.title}
        variant="standard"
        helperText={errorsForm.title?.message}
        error={!!errorsForm.title || isCreateError}
        {...register("title", {
          required: "Обязательно загаловок",
          minLength: {
            value: 3,
            message: "Длина загаловка должна быть минимум 3 символа",
          },
        })}
        placeholder="Заголовок статьи..."
        fullWidth
        FormHelperTextProps={{ classes: { error: classes.error } }}
      />
      <TextField
        className={classes.tags}
        style={{ margin: "25px 0 15px !important" }}
        variant="standard"
        helperText={errorsForm.tags?.message}
        error={!!errorsForm.tags || isCreateError}
        {...register("tags", {
          pattern: {
            value: /^([0-9a-zа-я]+)(\s*[,]\s*[0-9a-zа-я]+)*$/i,
            message: "Нужно писать через запятую",
          },
        })}
        placeholder="Тэги"
        fullWidth
      />
      <Controller
        name="text"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Editor
            value={value}
            options={options}
            onChange={onChange}
            className={classes.editor}
          />
        )}
      />

      <AlertError error={errorCreate } />
      <ButtonsAddPost
        handleReset={handleReset}
        isDisabled={
          isCreateLoading ||
          isCreateError ||
          !!errorsForm.title
        }
      />
    </form>
  );
};
