import { api } from "..";
import { IFormLogin } from "../../models/forms/auth/login";
import { IFormRegister } from "../../models/forms/auth/register";
import { IUser } from "../../models/user";
import { logout, setUser } from "../../store/slices/user";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IUser, IFormRegister>({
      query(data) {
        return {
          url: "/auth/register",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (e) {}
      },
    }),
    login: builder.mutation<IUser, IFormLogin>({
      query(data) {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (e) {}
      },
    }),
    logout: builder.mutation<void, void>({
      query() {
        return {
          url: "/auth/logout",
          method: "POST",
        };
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (e) {}
      },
    }),
  }),
});
export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;
