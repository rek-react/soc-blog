import { FC } from "react";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "black",
  },
}));

interface TagProps {
  name: string;
  id: string;
}

export const Tag: FC<TagProps> = ({ name, id }) => {
  const classes = useStyles();
  return (
    <Link className={classes.link} to={`/posts/${id}`}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <TagIcon />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};
