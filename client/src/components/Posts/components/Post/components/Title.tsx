import { FC } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontSize: "28px",
    margin: 0,
  },
  titleFull: {
    fontSize: "42px",
    fontWeight: 900,
    [theme.breakpoints.down("sm")]: {
      fontSize: "30px",
    },
  },
  link: {
    textDecoration: "none",
    color: "#000",
    "&:hover": {
      color: "#4361ee",
    },
  },
}));
interface TitlePostProps {
  isFullPost?: boolean;
  title: string;
  id: string;
}
export const TitlePost: FC<TitlePostProps> = ({ isFullPost, title, id }) => {
  const classes = useStyles();
  return (
    <h2 className={clsx(classes.title, { [classes.titleFull]: isFullPost })}>
      {isFullPost ? (
        title
      ) : (
        <Link className={classes.link} to={`/posts/${id}`}>
          {title}
        </Link>
      )}
    </h2>
  );
};
