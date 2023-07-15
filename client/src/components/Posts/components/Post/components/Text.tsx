import { FC } from "react";
import { makeStyles } from "@mui/styles";
import ReactMarkdown from "react-markdown";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  text: {
    margin: "30px 0 50px",
    "& p": {
      fontSize: "22px",
      margin: 0,
      lineHeight: "36px",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "10px 0 ",
    },
  },
}));
interface TextPostProps {
  text: string;
}
export const TextPost: FC<TextPostProps> = ({ text }) => {
  const classes = useStyles();
  return (
    <div className={classes.text}>
      <ReactMarkdown children={text} />
    </div>
  );
};
