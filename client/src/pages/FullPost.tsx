import { Post } from "../components/Posts/components/Post";
import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../api/services/postApi";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { SkeletonPost } from "../components/Posts/components/Post/Skeleton";
import { Comments } from "../components/Comments";

const FullPost = () => {
  const { id } = useParams();
  const { userData } = useTypedSelector((state) => state.user);
  const { data: post, isFetching } = useGetPostQuery(
    { id, isEdit: false },
    { refetchOnMountOrArgChange: true }
  );
  if (isFetching) {
    return <SkeletonPost isFullPost />;
  }
  return (
    <>
      {post && (
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
          isFullPost
          isEditable={userData ? userData._id === post.user._id : false}
          text={post.text}
        />
      )}
      <Comments commentsCount={post?.commentsCount || 0} />
    </>
  );
};
export default FullPost;
