"use client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
const initialState: { user: any; userId: any; token: any } = {
  user: null,
  userId: null,
  token: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.user = action.payload;
      state.token = action.payload?.accessToken;
      sessionStorage.setItem("user", JSON.stringify(action?.payload));
      sessionStorage.setItem("token", action.payload?.accessToken);

      const fireStoreData = { ...action?.payload };

      const actionn = async () => {
        await setDoc(doc(db, "users", action?.payload?.userId), fireStoreData);
      };
      if (action?.payload?.userId) {
        actionn();
      }
    },
    setUserId: (state, action: PayloadAction<any>) => {
      state.userId = action.payload;
      sessionStorage.setItem("userId", JSON.stringify(action?.payload));
    },
    removeUser: (state) => {
      state.user = null;
      state.userId = null;
      state.token = null;
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userId");
    },
  },
});
export const { getUser, removeUser, setUserId } = userSlice.actions;

export default userSlice.reducer;
