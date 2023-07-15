import { makeStyles } from "@mui/styles";
import { FC } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  tags: {
    listStyle: "none",
    padding: 0,
    margin: " 5px 0 0 0",
  },
  item: {
    display: "inline-block",
    fontSize: "14px",
    marginRight: "15px",
    opacity: 0.5,
    "&:hover": {
      opacity: 1,
    },
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
}));

interface TagsPostProps {
  tags: string[];
}
export const TagsPost: FC<TagsPostProps> = ({ tags }) => {
  const classes = useStyles();
  return (
    <ul className={classes.tags}>
      {tags.map((name, index) => (
        <li className={classes.item} key={index}>
          <Link className={classes.link} to={`/tag/${name}`}>
            #{name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
