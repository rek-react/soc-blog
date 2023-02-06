import { useEffect, FC, MouseEvent } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useLogoutMutation } from "../../../api/services/authApi";
import { makeStyles } from "@mui/styles";

interface ButtonsHeaderProps {
  toggleDrawer: (
    open: boolean
  ) => (e: MouseEvent<HTMLButtonElement | SVGSVGElement>) => void;
}

const useStyles = makeStyles((theme: any) => ({
  button: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export const ButtonsHeader: FC<ButtonsHeaderProps> = ({ toggleDrawer }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const isAuth = useAuth();
  const [logoutUser, { isLoading, isSuccess }] = useLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isLoading]);
  const onClickLogout = (e: MouseEvent<HTMLButtonElement>) => {
    toggleDrawer(false)(e);
    logoutUser();
  };
  return (
    <>
      <Button
        onClick={toggleDrawer(false)}
        className={classes.button}
        variant="contained"
      >
        <Link to="/">Посты</Link>
      </Button>
      {isAuth ? (
        <>
          <Button
            onClick={toggleDrawer(false)}
            className={classes.button}
            variant="contained"
          >
            <Link to="/posts/user/me">Мои посты</Link>
          </Button>

          <Button
            onClick={toggleDrawer(false)}
            className={classes.button}
            variant="contained"
          >
            <Link to="/add-post">Написать статью</Link>
          </Button>
          <Button
            onClick={onClickLogout}
            className={classes.button}
            variant="contained"
            color="error"
          >
            Выйти
          </Button>
        </>
      ) : (
        <>
          <Button
            className={classes.button}
            onClick={toggleDrawer(false)}
            variant="contained"
          >
            <Link to="/login">Войти</Link>
          </Button>
          <Button
            className={classes.button}
            onClick={toggleDrawer(false)}
            variant="contained"
          >
            <Link to="/register">Регистрация</Link>
          </Button>
        </>
      )}
    </>
  );
};
