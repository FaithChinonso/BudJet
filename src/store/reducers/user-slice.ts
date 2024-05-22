"use client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
const initialState: { user: any } = {
  user: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action?.payload));
      localStorage.setItem("token", action.payload?.accessToken);

      const fireStoreData = { ...action?.payload };

      const actionn = async () => {
        await setDoc(doc(db, "users", action?.payload?.userId), fireStoreData);
      };
      if (action?.payload?.userId) {
        actionn();
      }
    },
    removeUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});
export const { getUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
