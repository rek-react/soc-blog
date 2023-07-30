import { FC } from "react";
import Button from "@mui/material/Button";

interface MoreCommentsProps {
  changeLimit: () => void;
}

export const MoreComments: FC<MoreCommentsProps> = ({ changeLimit }) => {
  return (
    <Button
      style={{ margin: "8px 0 8px 16px" }}
      variant="outlined"
      onClick={()=> changeLimit()}
    >
      Еще
    </Button>
  );
};
