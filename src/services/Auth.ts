import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";
import { authProvider, provider } from "../../firebase";

import { getUser } from "@/store/reducers/user-slice";
export const signInWithGoogle = async (dispatch: any, router: any) => {
  try {
    const result: any = await signInWithPopup(authProvider, provider);
    console.log(result.user);
    return result?.user;
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
export function onAuthStateChanged(callback: (authUser: any | null) => void) {
  return _onAuthStateChanged(authProvider, callback);
}
