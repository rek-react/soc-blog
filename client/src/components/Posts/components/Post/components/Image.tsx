import { FC } from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      height: "200px",
    },
  },
  imageFull: {
    height: "400px",
    [theme.breakpoints.down("sm")]: {
      height: "200px",
    },
  },
}));

interface ImagePostProps {
  imageUrl: string;
  isFullPost?: boolean;
  title: string;
}

export const ImagePost: FC<ImagePostProps> = ({
  imageUrl,
  title,
  isFullPost,
}) => {
  const classes = useStyles();
  return (
    <img
      className={clsx(classes.image, { [classes.imageFull]: isFullPost })}
      src={`${import.meta.env.VITE_API_URI}/uploads/${imageUrl}`}
      alt={title}
    />
  );
};
