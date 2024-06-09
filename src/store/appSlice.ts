import IUser from "@/app/utils/models/User";
import { createSlice, current } from "@reduxjs/toolkit";
import { addToCart } from "./cartSlice";
import { ProductTypes } from "@/app/utils/api/ProductApi";

export interface IAppState {
    isCartNotificationOpen: boolean;
    isAlreadyBoughtNotificationOpen: boolean;
}

const initialState: IAppState = {
    isCartNotificationOpen: true,
    isAlreadyBoughtNotificationOpen: false
};

export const appSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openCloseAlreadyBoughtNotification: (state) => {
        state.isAlreadyBoughtNotificationOpen = !state.isAlreadyBoughtNotificationOpen
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.type, (state, action) => {
    })
  }
});

export const { openCloseAlreadyBoughtNotification } = appSlice.actions;
export const appReducer = appSlice.reducer;