import { FC } from "react";
import Moment from "react-moment";
import { makeStyles } from "@mui/styles";
import { Avatar } from "./UI/Avatar";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: "15px",
    [theme.breakpoints.down("sm")]: {},
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  fullName: {
    fontWeight: 500,
    fontSize: "14px",
  },
  additional: {
    fontSize: "12px",
    opacity: 0.6,
  },
}));

interface UserInfoProps {
  avatarUrl: string;
  fullName: string;
  additionalText: string;
}

export const UserInfo: FC<UserInfoProps> = ({
  avatarUrl,
  fullName,
  additionalText,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar avatarUrl={avatarUrl} fullName={fullName} />

      <div className={classes.details}>
        <span className={classes.fullName}>{fullName}</span>
        <span className={classes.additional}>
          <Moment
            locale="ru"
            date={additionalText}
            format="D MMMM YYYY в HH:mm"
          />
        </span>
      </div>
    </div>
  );
};
