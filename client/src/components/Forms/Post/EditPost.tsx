import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
  useGetPostQuery,
  useUpdatePostMutation,
} from "../../../api/services/postApi";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IFormPost } from "../../../models/forms/post";
import "easymde/dist/easymde.min.css";
import Editor from "react-simplemde-editor";
import { ButtonsAddPost } from "./components/Buttons";
import { AlertError } from "../../UI/AlertError";
import { Options } from "easymde";
import { FormAddPostSkeleton } from "./Skeleton";
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

export const FormEditPost = () => {
  const classes = useStyles();
  const { id } = useParams();
  const isEdit = !!id;
  const [imageUrl, setImageUrl] = useState("");
  const [selectImage, setSelectImage] = useState<Blob | null>(null);
  const { userData } = useTypedSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors: errorsForm },
  } = useForm({ defaultValues });
  const navigate = useNavigate();
  const [
    updatePost,
    {
      isSuccess: isUpdateSuccess,
      isLoading: isUpdateLoading,
      error: errorUpdate,
      isError: isUpdateError,
    },
  ] = useUpdatePostMutation();

  const {
    isSuccess: isGetSuccess,
    isFetching: isGetFetching,
    isError: isGetError,
    data: post,
  } = useGetPostQuery(
    { id, isEdit },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const handleChangeValues = () => {
    if (isGetSuccess && post && !isUpdateSuccess) {
      setValue("title", post.title);
      setValue("text", post.text || "");
      setValue("tags", post.tags ? post.tags.join(",") : "");
      setImageUrl(post.imageUrl);
    }
  }
  useEffect(() => {
    if (isGetError || isUpdateSuccess) {
      navigate("/");
    }
    if (post && post.user._id !== userData?._id) {
      navigate("/");
    }
    handleChangeValues();
  }, [
    isUpdateSuccess,
    isGetFetching
  ]);
  const handleOnSubmit = ({ title, tags, text }: IFormPost) => {
    const formData = new FormData();
    formData.append("image", selectImage ? selectImage : imageUrl);
    if (title !== post?.title) formData.append("title", title);
    if (tags !== post?.tags.join(",")) formData.append("tags", tags);
    if (text !== post?.text) formData.append("text", text);
    updatePost({ id, body: formData });
  };

  if (isGetFetching) {
    return <FormAddPostSkeleton />;
  }
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
        error={!!errorsForm.title || isUpdateError}
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
        error={!!errorsForm.tags || isUpdateError}
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

      <AlertError error={errorUpdate} />
      <ButtonsAddPost
        handleReset={handleChangeValues}
        isDisabled={isUpdateLoading || !!errorsForm.title}
      />
    </form>
  );
};
