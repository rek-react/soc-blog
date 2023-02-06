import React, { FC } from "react";
import Atatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: any) => ({
  avatar: {
    marginRight: "15px",
    [theme.breakpoints.down("sm")]: {
      marginRight: "10px",
    },
  },
}));

interface AvatarProps {
  avatarUrl: string | undefined;
  fullName: string | undefined;
}

export const Avatar: FC<AvatarProps> = ({ avatarUrl, fullName }) => {
  const classes = useStyles();
  return (
    <Atatar
      className={classes.avatar}
      src={
        avatarUrl ? `${process.env.REACT_APP_API_URI}/uploads/${avatarUrl}` : ""
      }
      alt={fullName}
    />
  );
};
