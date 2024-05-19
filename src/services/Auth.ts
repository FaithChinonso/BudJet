import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { authProvider, provider } from "../../firebase";
import { Router } from "next/router";
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(authProvider, provider);
    console.log(result.user);
  } catch (error) {
    console.error(error);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(authProvider);

    console.log("User signed out");
  } catch (error) {
    console.error(error);
  }
};
