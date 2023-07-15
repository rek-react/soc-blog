import  { FC } from "react";
import Atatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
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
        avatarUrl ? `${import.meta.env.VITE_API_URI}/uploads/${avatarUrl}` : ""
      }
      alt={fullName}
    />
  );
};
