import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { logout, setUser } from "../slices/user";

export const authMiddleware: Middleware<{}, RootState> =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action);
    if (setUser.match(action)) {
      const accessToken = getState().user.accessToken!;
      localStorage.setItem("accessToken", accessToken);
    } else if (logout.match(action)) {
      localStorage.removeItem("accessToken");
    }
    return result;
  };
