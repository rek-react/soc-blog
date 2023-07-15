import { api } from "..";
import { IUserData } from "../../models/user";
import { RootState } from "../../store/rootReducer";
import { setUser } from "../../store/slices/user";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<IUserData, null>({
      query: () => "/user/me",
      async onQueryStarted(_arg, { queryFulfilled, dispatch, getState }) {
        try {
          const { data: userData } = await queryFulfilled;
          const accessToken = (getState() as RootState).user.accessToken;
          dispatch(setUser({ userData, accessToken }));
        } catch (e) {}
      },
    }),
    getUser: builder.query<IUserData, string>({
      query: (id) => `/user/${id}`,
    }),
    updateMe: builder.mutation<IUserData, FormData>({
      query: (body) => {
        return {
          url: "/user/update",
          method: "PATCH",
          body,
        };
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch, getState }) {
        try {
          const { data: userData } = await queryFulfilled;
          const accessToken = (getState() as RootState).user.accessToken;
          dispatch(setUser({ userData, accessToken }));
        } catch (e) {}
      },
    }),
  }),
});
export const { useGetMeQuery, useUpdateMeMutation, useGetUserQuery } = authApi;
