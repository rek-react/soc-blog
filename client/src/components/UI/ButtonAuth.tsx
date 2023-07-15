import { FC, PropsWithChildren } from "react";
import Button from "@mui/material/Button";
export const ButtonAuth: FC<PropsWithChildren<{ isLoading: boolean }>> = ({
  isLoading,
  children,
}) => {
  return (
    <Button
      style={{ marginTop: 10 }}
      disabled={isLoading}
      type="submit"
      size="large"
      variant="contained"
      fullWidth
    >
      {children}
    </Button>
  );
};
