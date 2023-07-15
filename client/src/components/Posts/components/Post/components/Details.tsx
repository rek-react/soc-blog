import { FC } from "react";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  details: {
    listStyle: "none",
    padding: 0,
    margin: "20px 0 0 0",
  },
  item: {
    display: "inline-flex",
    alignIitems: "center",
    fontSize: "14px",
    marginRight: "20px",
    opacity: 0.5,
  },
  svg: {
    marginRight: "5px",
  },
}));

interface DetailsPostProps {
  viewsCount: number;
  commentsCount: number;
}
export const DetailsPost: FC<DetailsPostProps> = ({
  viewsCount,
  commentsCount,
}) => {
  const classes = useStyles();
  return (
    <ul className={classes.details}>
      <li className={classes.item}>
        <EyeIcon className={classes.svg} />
        <span>{viewsCount}</span>
      </li>
      <li className={classes.item}>
        <CommentIcon className={classes.svg} />
        <span>{commentsCount}</span>
      </li>
    </ul>
  );
};
