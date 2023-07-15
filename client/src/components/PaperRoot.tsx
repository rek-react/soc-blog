import { FC, PropsWithChildren } from "react";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: "400px",
    padding: "50px",
    border: "1px solid #dedede",
    [theme.breakpoints.down("sm")]: {
      padding: "25px",
    },
    margin: "50px auto",
  },
  rootProfile: {
    width: "auto",
    padding: "10px 30px 30px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px 15px 15px",
    },
    margin: "auto",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "30px !important",
  },
}));

interface PaperRootProps {
  title: string;
  isProifle?: boolean;
}

export const PaperRoot: FC<PropsWithChildren<PaperRootProps>> = ({
  title,
  children,
  isProifle,
}) => {
  const classes = useStyles();
  return (
    <Paper
      className={clsx(classes.root, {
        [classes.rootProfile]: isProifle,
      })}
    >
      <Typography className={classes.title} variant="h5">
        {title}
      </Typography>
      {children}
    </Paper>
  );
};
