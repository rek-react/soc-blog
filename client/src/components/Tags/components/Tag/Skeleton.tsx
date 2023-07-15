import Skeleton from "@mui/material/Skeleton";
import ListItem from "@mui/material/ListItem";

export const TagSkeleton = () => {
  return (
    <ListItem disablePadding>
      <Skeleton variant="rectangular" width="100%" height={45} />
    </ListItem>
  );
};
