import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import { api } from "../api";

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
