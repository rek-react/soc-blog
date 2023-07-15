import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api";
import { authMiddleware } from "./middlewares/auth";
import { rootReducer } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
      authMiddleware,
    ),
});
