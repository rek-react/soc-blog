import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/user";

const initialState: IUser = {
  userData: null,
  accessToken: localStorage.getItem("accessToken"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      { payload: { userData, accessToken } }: PayloadAction<IUser>
    ) => {
      state.userData = userData;
      state.accessToken = accessToken;
    },
    logout: (state) => {
      state.userData = null;
      state.accessToken = null;
    },
  },
});
export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
