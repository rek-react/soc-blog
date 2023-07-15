import { FC, PropsWithChildren } from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#fff",
    border: "1px solid #dedede",
    borderRadius: "6px",
    overflow: "hidden",
    marginBottom: "15px",
    position: "relative",
    "&:hover": {
      border: "1px solid #4361ee",
      boxShadow: "0 0 0 1px #4361ee",

      ".makeStyles-buttons-12": {
        opacity: 1,
      },
    },
  },
  rootFull: {
    "&:hover": {
      backgroundColor: "#fff",
      border: "1px solid #dedede",
      boxShadow: "none",
    },
  },
}));

interface WrapperPostProps {
  isFullPost: boolean | undefined;
}

export const WrapperPost: FC<PropsWithChildren<WrapperPostProps>> = ({
  children,
  isFullPost,
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, { [classes.rootFull]: isFullPost })}>
      {children}
    </div>
  );
};
