import { FC,  MouseEventHandler, useEffect } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useDeletePostMutation } from "../../../../../api/services/postApi";
import { useNavigate } from "react-router-dom";

interface PostProps extends DialogProps {
  id: string;
}

export const DialogPost: FC<PostProps> = (props) => {
  const handleClose = props.onClose as MouseEventHandler<HTMLButtonElement>;
  const id = props.id;
  const [deletePost,{isSuccess}] = useDeletePostMutation();
  const navigate = useNavigate()
  
  useEffect(()=> {
    if(isSuccess){
      
      navigate("/")
    }
  }, [isSuccess])
  const handleClick = () => {
    deletePost(id);
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
