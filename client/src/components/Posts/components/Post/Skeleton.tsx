import { FC } from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#fff",
    border: "1px solid #dedede",
    borderRadius: "6px",
    overflow: "hidden",
    marginBottom: "15px",
  },
  content: {
    padding: "20px",
  },
  user: {
    display: "flex",
  },
  info: {
    marginLeft: "50px",
  },
  tags: {
    display: "flex",
    "& span": {
      marginRight: "15px",
    },
  },
  userDetails: {
    display: "flex",
    flexDirection: "column",
  },
}));

export const SkeletonPost: FC<{ isFullPost?: boolean }> = ({ isFullPost }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Stack spacing={1}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={isFullPost ? 400 : 300}
        />
        <div className={classes.content}>
          <div className={classes.user}>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              style={{ marginRight: 10 }}
            />
            <div className={classes.userDetails}>
              <Skeleton variant="text" width={60} height={20} />
              <Skeleton variant="text" width={100} height={15} />
            </div>
          </div>
          <div className={classes.info}>
            <Skeleton variant="text" width="80%" height={45} />
            <div className={classes.tags}>
              <Skeleton variant="text" width={40} height={30} />
              <Skeleton variant="text" width={40} height={30} />
              <Skeleton variant="text" width={40} height={30} />
            </div>
          </div>
        </div>
      </Stack>
    </div>
  );
};
