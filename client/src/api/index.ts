import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/rootReducer";
import { IUser } from "../models/user";
import { logout, setUser } from "../store/slices/user";

export interface ICustomError {
  data: {
    message: string;
    errors: string[];
  };
  status: number;
}

export type BaseQueryFnType = BaseQueryFn<
  string | FetchArgs,
  unknown,
  ICustomError
>;

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URI || '/',
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
}) as BaseQueryFnType;

const baseQueryWithReauth: BaseQueryFnType = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "/user/refresh",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      api.dispatch(setUser(refreshResult.data as IUser));
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery(
        {
          url: "/auth/logout",
          method: "POST",
        },
        api,
        extraOptions
      );
      api.dispatch(logout());
    }
  }
  return result;
};
export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post", "Comment", "User"],
  endpoints: () => ({}),
});
