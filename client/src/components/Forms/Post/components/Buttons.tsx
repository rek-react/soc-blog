import { FC } from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  buttons: {
    display: "flex",
    marginTop: "20px",
  },
}));

interface ButtonsAddPostProps {
  isDisabled: boolean;
  handleReset: React.MouseEventHandler<HTMLButtonElement>;
}

export const ButtonsAddPost: FC<ButtonsAddPostProps> = ({
  isDisabled,
  handleReset,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.buttons}>
      <Button
        disabled={isDisabled}
        style={{ marginRight: "15px" }}
        type="submit"
        size="large"
        variant="contained"
      >
        Опубликовать
      </Button>
      <Button size="large" disabled={isDisabled} onClick={handleReset}>
        Отмена
      </Button>
    </div>
  );
};
