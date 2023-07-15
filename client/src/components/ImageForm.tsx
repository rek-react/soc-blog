import { FC, ChangeEvent, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    marginTop: "20px",
    display: "block",
    height: "300px",
    width: "100%",
    maxWidth: "300px",
    [theme.breakpoints.down("sm")]: {
      height: "200px",
      margin: " 20px auto 0",
    },
  },
  imageProfile: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
  },
}));

interface ImageFormProps {
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  selectImage: Blob | null;
  setSelectImage: React.Dispatch<React.SetStateAction<Blob | null>>;
  isProfile?: boolean;
}

export const ImageForm: FC<ImageFormProps> = ({
  imageUrl,
  setImageUrl,
  selectImage,
  setSelectImage,
  isProfile,
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (selectImage) {
      const objectUrl = URL.createObjectURL(selectImage);
      setImageUrl(objectUrl);
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [selectImage, setImageUrl]);
  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectImage(e.target.files[0]);
      e.target.value = "";
    }
  };
  const fileInput = useRef<HTMLInputElement>(null);
  const handleClickFile = () => fileInput.current?.click();
  const handleClickRemoveImage = () => {
    setSelectImage(null);
    setImageUrl("");
  };

  return (
    <>
      <Button
        sx={{
          p: {
            sm: "7px 21px",
            xs: "7px 10px",
          },
        }}
        onClick={handleClickFile}
        variant="outlined"
        size="large"
      >
        Загрузить {isProfile ? "аватар" : "превью"}
      </Button>
      <input
        type="file"
        accept=".jpeg,.png,.jpg"
        onChange={handleChangeFile}
        ref={fileInput}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            style={{ marginLeft: 10 }}
            variant="contained"
            color="error"
            onClick={handleClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={clsx(classes.image, {
              [classes.imageProfile]: isProfile,
            })}
            src={
              imageUrl.match("blob:")
                ? imageUrl
                : `${import.meta.env.VITE_API_URI}/uploads/${imageUrl}`
            }
            alt="Uploaded"
          />
        </>
      )}
    </>
  );
};
