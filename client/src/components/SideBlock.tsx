import { FC, PropsWithChildren } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: "20px",
    paddingBottom: "10px",
  },
  title: {
    padding: "15px 15px 0 15px",
  },
}));

interface SideBlockProps {
  title: string;
}

export const SideBlock: FC<PropsWithChildren<SideBlockProps>> = ({
  title,
  children,
}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};
