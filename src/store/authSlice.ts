import IUser from "@/app/utils/models/User";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  authState: boolean;
  user: IUser | null;
  jwt: string | null; 
}

const initialState: IAuthState = {
  authState: false,
  user: null,
  jwt: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    loginUser: (state, action) => {
      localStorage.setItem('token', 'Bearer ' + action.payload.data.jwt);
      state.user = {...action.payload.data.user}
      state.authState = true;
      state.jwt = action.payload.data.jwt
    },

    logoutUser: (state) => {
      state.user = null
      state.authState = false;
      state.jwt = null;
      localStorage.clear();
    },

    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.authState = action.payload;
    },
  },
});

export const { setAuthState, loginUser, logoutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;