import Box from "@mui/material/Box";
import { UserInfo } from "../../../UserInfo";
import { Link } from "react-router-dom";
import { FC, PropsWithChildren, useState } from "react";
import { IPost } from "../../../../models/post";
import { DialogPost } from "./components/Dialog";
import { TagsPost } from "./components/Tags";
import { DetailsPost } from "./components/Details";
import { ImagePost } from "./components/Image";
import { ButtonsPost } from "./components/Buttons";
import { TitlePost } from "./components/Title";
import { TextPost } from "./components/Text";
import { WrapperPost } from "./components/Wrapper";

interface IPostProps extends IPost {
  commentsCount: number;
  isFullPost?: boolean;
  isEditable: boolean;
}

export const Post: FC<PropsWithChildren<IPostProps>> = ({
  _id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  text,
  isFullPost,
  isEditable,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const onClickRemove = () => {
    setOpenDialog(true);
  };
  
  return (
    <WrapperPost isFullPost={isFullPost}>
      {isEditable && <ButtonsPost id={_id} onClickRemove={onClickRemove} />}
      {imageUrl &&
        (isFullPost ? (
          <ImagePost title={title} isFullPost imageUrl={imageUrl} />
        ) : (
          <Link to={`/posts/${_id}`}>
            <ImagePost title={title} imageUrl={imageUrl} />
          </Link>
        ))}
      <Box
        sx={{
          p: {
            sm: "10px 20px 20px",
            xs: "10px",
          },
        }}
      >
        <UserInfo {...user} additionalText={createdAt} />
        <Box
          sx={{
            mt: "10px",
          }}
        >
          <TitlePost id={_id} title={title} isFullPost={isFullPost} />
          <TagsPost tags={tags} />
          {text && <TextPost text={text} />}
          <DetailsPost viewsCount={viewsCount} commentsCount={commentsCount} />
        </Box>
      </Box>
      <DialogPost
        open={openDialog}
        id={_id}
        onClose={() => setOpenDialog(false)}
      />
    </WrapperPost>
  );
};
