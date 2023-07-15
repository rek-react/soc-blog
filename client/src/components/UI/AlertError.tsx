import { SerializedError } from "@reduxjs/toolkit";
import { FC } from "react";
import { ICustomError } from "../../api";
import { Alert } from "@mui/material";

interface AlertErrorProps {
  error: ICustomError | SerializedError | undefined;
}
export const AlertError: FC<AlertErrorProps> = ({ error }) => {
  return (
    <>
      {error && "data" in error && (
        <Alert severity="error">{error.data.message}</Alert>
      )}
    </>
  );
};
