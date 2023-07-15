import { FC, MouseEvent } from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    flex: "1 1 auto",
  },
  button: {
    backgroundColor: "#000",
    border: 0,
    position: "relative",
    zIndex: 15,
    fontWeight: 700,
    lineHeight: "35px",
    minWidth: "50px",
    letterSpacing: "0.15px",
    borderRadius: "5px",
    padding: "0 10px",
    height: "100%",
    cursor: "pointer",
    display: "inline-block",
  },
}));

interface LogoHeaderProps {
  text: string;
  toggleDrawer: (
    open: boolean
  ) => (e: MouseEvent<HTMLButtonElement | SVGSVGElement>) => void;
}

export const LogoHeader: FC<LogoHeaderProps> = ({ text, toggleDrawer }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link to="/profile/edit">
        <button className={classes.button} onClick={toggleDrawer(false)}>
          {text}
        </button>
      </Link>
    </div>
  );
};
