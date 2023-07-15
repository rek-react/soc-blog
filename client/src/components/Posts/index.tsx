import { FC } from "react";
import { Post } from "./components/Post";
import {
  useGetPostsQuery,
  useGetMyPostsQuery,
} from "../../api/services/postApi";
import { SkeletonPost } from "./components/Post/Skeleton";
import { Typography } from "@mui/material";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface PostsProps {
  isMyPosts?: boolean;
}

export const Posts: FC<PostsProps> = ({ isMyPosts }) => {
  const { data, isFetching, isError } = useGetPostsQuery(null, {
    skip: isMyPosts,
    refetchOnMountOrArgChange: true,
  });
  
  const {
    data: myPosts,
    isFetching: isGetMyFetching,
    isError: isGetMyError,
  } = useGetMyPostsQuery(null, {
    skip: !isMyPosts,
    refetchOnMountOrArgChange: true,
  });
  const { userData } = useTypedSelector((state) => state.user);
  if (isError || isGetMyError) {
    return (
      <Typography variant="h2" color="red" align="center">
        Ошибка получения постов
      </Typography>
    );
  }
  if (isFetching || isGetMyFetching) {
    return (
      <>
        {[...Array(3)].map((_, index) => (
          <SkeletonPost key={index} />
        ))}
      </>
    );
  }
  const posts = data || myPosts;
  return (
    <>
      {posts?.length !== 0 ? (
        posts?.map((post) => (
          <Post
            _id={post._id}
            title={post.title}
            imageUrl={post.imageUrl}
            user={post.user}
            createdAt={post.createdAt}
            viewsCount={post.viewsCount}
            commentsCount={post.commentsCount}
            key={post._id}
            tags={post.tags}
            isEditable={userData ? userData._id === post.user._id : false}
            text={post.text}
          />
        ))
      ) : (
        <Typography variant="h2" align="center">
          На данный момент постов нет
        </Typography>
      )}
    </>
  );
};
