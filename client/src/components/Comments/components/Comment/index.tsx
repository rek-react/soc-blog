import { FC } from "react";
import { IComment } from "../../../../models/comment";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { UserInfo } from "../../../UserInfo";

export const Comment: FC<IComment> = ({ comment, user, createdAt }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <div>
          <UserInfo additionalText={createdAt} {...user} />
          <Box
            sx={{
              pl: {
                xs: "50px",
                sm: "55px",
              },
            }}
          >
            <ListItemText primary={comment} style={{ minHeight: "24px" }} />
          </Box>
        </div>
      </ListItem>
      <Divider />
    </>
  );
};
