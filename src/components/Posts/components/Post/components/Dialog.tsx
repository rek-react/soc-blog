import { FC, useEffect, MouseEvent, MouseEventHandler } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useDeletePostMutation } from "../../../../../api/services/postApi";
import { useNavigate, useParams } from "react-router-dom";

interface PostProps extends DialogProps {
  id: string;
}

export const DialogPost: FC<PostProps> = (props) => {
  const handleClose = props.onClose as MouseEventHandler<HTMLButtonElement>;
  const { id } = useParams();
  const navigate = useNavigate();
  const [deletePost, { isLoading, isSuccess }] = useDeletePostMutation();
  useEffect(() => {
    if (isSuccess && id) {
      navigate("/");
    }
  }, [isLoading]);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    deletePost(props.id);
    handleClose(e);
  };
  return (
    <Dialog {...props}>
      <DialogTitle>Вы действительно ходите удалить свой пост?</DialogTitle>
      <DialogActions>
        <Button variant="text" onClick={handleClick}>
          Да
        </Button>
        <Button variant="text" onClick={handleClose}>
          Нет
        </Button>
      </DialogActions>
    </Dialog>
  );
};
