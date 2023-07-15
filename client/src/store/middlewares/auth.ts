import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { logout, setUser } from "../slices/user";

export const authMiddleware: Middleware<object, RootState> =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action);
    if (setUser.match(action)) {
      const accessToken = getState().user.accessToken;
      accessToken && localStorage.setItem("accessToken", accessToken);
    } else if (logout.match(action)) {
      localStorage.removeItem("accessToken");
    }
    return result;
  };
