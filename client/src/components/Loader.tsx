import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  loaderContainer: {
    width: " 100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 1,
  },
  spinner: {
    width: "64px",
    height: "64px",
    border: "8px solid",
    borderColor: "#3d5af1 transparent #3d5af1 transparent",
    borderRadius: "50%",
    animation: "$spin-anim 1.2s linear infinite",
  },
  "@keyframes spin-anim": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
}));

export const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.loaderContainer}>
      <div className={classes.spinner}></div>
    </div>
  );
};
