import ListItem from "@mui/material/ListItem";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
export const CommentSkeleton = () => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Skeleton variant="text" height={25} width={120} />
          <Skeleton variant="text" height={18} width={230} />
        </div>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
