import { useState, FormEvent, ChangeEvent, FC, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useCreateCommentMutation } from "../../../api/services/commentApi";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { makeStyles } from "@mui/styles";
import { Avatar } from "../../UI/Avatar";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    marginTop: "10px",
    paddingBottom: "20px",
    marginRight: "20px",
    marginLeft: "17px",
  },
}));

interface AddCommentProps {
  setCommentsCount: React.Dispatch<React.SetStateAction<number>>;
}

export const AddComment: FC<AddCommentProps> = ({ setCommentsCount }) => {
  const classes = useStyles();
  const [comment, setComment] = useState<string>("");
  const { id } = useParams();
  const { userData } = useTypedSelector((state) => state.user);
  const [createComment, { isLoading, isSuccess }] = useCreateCommentMutation();
  useEffect(() => {
    if (isSuccess) {
      setCommentsCount((prev) => prev + 1);
      setComment("");
    }
  }, [isSuccess, setCommentsCount]);
  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createComment({ id, body: { comment: comment.trimEnd() } });
  };

  return (
    <div className={classes.root}>
      <Avatar avatarUrl={userData?.avatarUrl} fullName={userData?.fullName} />
      <form style={{ width: "100%" }} onSubmit={handleOnSubmit}>
        <TextField
          label="Написать комментарий"
          variant="outlined"
          value={comment}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setComment(e.target.value)
          }
          maxRows={10}
          multiline
          fullWidth
        />
        <Button
          disabled={isLoading || !comment || !!comment.match(/^\s+$/)}
          variant="contained"
          style={{ marginTop: "10px" }}
          type="submit"
        >
          Отправить
        </Button>
      </form>
    </div>
  );
};
