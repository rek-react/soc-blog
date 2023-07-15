import { useEffect, FC, MouseEvent } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useLogoutMutation } from "../../../api/services/authApi";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

interface ButtonsHeaderProps {
  toggleDrawer: (
    open: boolean
  ) => (e: MouseEvent<HTMLButtonElement | SVGSVGElement>) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
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
  const [logoutUser, { isSuccess }] = useLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess]);
  const onClickLogout = (e: MouseEvent<HTMLButtonElement>) => {
    toggleDrawer(false)(e);
    logoutUser();
  };
  return (
    <>
      <Link to="/">
        <Button
          onClick={toggleDrawer(false)}
          className={classes.button}
          variant="contained"
        >
          Посты
        </Button>
      </Link>
      {isAuth ? (
        <>
          <Link to="/posts/user/me">
            <Button
              onClick={toggleDrawer(false)}
              className={classes.button}
              variant="contained"
            >
              Мои посты
            </Button>
          </Link>
          <Link to="/add-post">
            <Button
              onClick={toggleDrawer(false)}
              className={classes.button}
              variant="contained"
            >
              Написать статью
            </Button>
          </Link>

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
          <Link to="/login">
            <Button
              className={classes.button}
              onClick={toggleDrawer(false)}
              variant="contained"
            >
              Войти
            </Button>
          </Link>

          <Link to="/register">
            <Button
              className={classes.button}
              onClick={toggleDrawer(false)}
              variant="contained"
            >
              Регистрация
            </Button>
          </Link>
        </>
      )}
    </>
  );
};
