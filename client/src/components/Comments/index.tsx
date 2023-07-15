import { FC, useState } from "react";
import Typography from "@mui/material/Typography";
import { SideBlock } from "../SideBlock";
import List from "@mui/material/List";
import { useParams } from "react-router-dom";
import { Comment } from "./components/Comment";
import { CommentSkeleton } from "./components/Comment/Skeleton";
import { AddComment } from "./components/AddComment";
import { useGetCommentsQuery } from "../../api/services/commentApi";
import { MoreComments } from "./components/MoreComments";
import { useAuth } from "../../hooks/useAuth";

export const Comments: FC<{ commentsCount: number }> = ({ commentsCount }) => {
  const { id } = useParams();
  const isAuth = useAuth();
  const [limit, setLimit] = useState(7);
  const [newCommentsCount, setCommentsCount] = useState(commentsCount);
  const {
    data: comments,
    isLoading,
    isError,
  } = useGetCommentsQuery(
    { id, limit },

    {
      refetchOnMountOrArgChange: true,
    }
  );
  if (isError) {
    return (
      <Typography variant="h2" color="red" align="center">
        Ошибка получения комментариев
      </Typography>
    );
  }
  return (
    <SideBlock title="Комментарии">
      {isAuth && <AddComment setCommentsCount={setCommentsCount} />}
      <List>
        {isLoading
          ? [...Array(limit)].map((_, index) => <CommentSkeleton key={index} />)
          : comments?.length !== 0 &&
            comments?.map((comment) => (
              <Comment
                key={comment._id}
                _id={comment._id}
                createdAt={comment.createdAt}
                comment={comment.comment}
                user={comment.user}
              />
            ))}
      </List>
      {newCommentsCount > limit && <MoreComments  setLimit={setLimit} />}
    </SideBlock>
  );
};
