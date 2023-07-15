import { FC, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  buttons: {
    position: "absolute",
    right: "15px",
    top: "15px",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: "10px",
    transition: "all 0.15s ease-in-out",
  },
}));

interface ButtonsPostProps {
  onClickRemove: MouseEventHandler<HTMLButtonElement>;
  id: string;
}
export const ButtonsPost: FC<ButtonsPostProps> = ({ onClickRemove, id }) => {
  const classes = useStyles();
  return (
    <div className={classes.buttons}>
      <Link to={`/posts/${id}/edit`}>
        <IconButton color="primary">
          <EditIcon />
        </IconButton>
      </Link>
      <IconButton onClick={onClickRemove} color="secondary">
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
