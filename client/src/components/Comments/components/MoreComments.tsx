import { FC } from "react";
import Button from "@mui/material/Button";

interface MoreCommentsProps {
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

export const MoreComments: FC<MoreCommentsProps> = ({ setLimit}) => {
  const handleClick = () => {
    setLimit((prev) => {
      return prev * 2
    });
  };
  return (
    <Button
      style={{ margin: "8px 0 8px 16px" }}
      variant="outlined"
      onClick={handleClick}
    >
      Еще
    </Button>
  );
};
