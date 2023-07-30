import {  useState } from "react";
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

export const Comments = () => {
  const { id } = useParams();
  const isAuth = useAuth();
  const [limit, setLimit] = useState(5);
  const {
    data: comments,
    isLoading,
    isError,
  } = useGetCommentsQuery(
    { id },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const changeLimit = () => {
    setLimit(limit + limit);
  };

  if (isError) {
    return (
      <Typography variant="h2" color="red" align="center">
        Ошибка получения комментариев
      </Typography>
    );
  }

  const currentComments = comments?.slice(0, limit);
  
  return (
    <SideBlock title="Комментарии">
      {isAuth && <AddComment />}
      <List>
        {isLoading
          ? [...Array(limit)].map((_, index) => <CommentSkeleton key={index} />)
          : currentComments?.length !== 0 &&
            currentComments?.map((comment) => (
              <Comment
                key={comment._id}
                _id={comment._id}
                createdAt={comment.createdAt}
                comment={comment.comment}
                user={comment.user}
              />
            ))}
      </List>
      {comments?.length! > limit && (
        <MoreComments changeLimit={changeLimit} />
      )}
    </SideBlock>
  );
};
