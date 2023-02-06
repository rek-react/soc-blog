import { FC } from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: any) => ({
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
      src={`${process.env.REACT_APP_API_URI}/tmp/${imageUrl}`}
      alt={title}
    />
  );
};
