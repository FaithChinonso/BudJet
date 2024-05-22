import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { authProvider, provider } from "../../firebase";

import { getUser } from "@/store/reducers/user-slice";
export const signInWithGoogle = async (dispatch: any, router: any) => {
  try {
    const result: any = await signInWithPopup(authProvider, provider);
    console.log(result.user);
    const data = {
      accessToken: result.user?.accessToken,
      displayName: result.user?.displayName || "",
      email: result.user?.email || "",
      creationTime: result.user?.metadata?.creationTime || "",
      lastLogin: result.user?.metadata?.lastSignInTime || "",
      photoUrl: result.user?.photoURL || "",
      phoneNumber: result.user?.phoneNumber || "",
      userId: result.user?.uid,
    };
    if (result.user) {
      dispatch(getUser(data));
      router.push("dashboard");
    } else {
      dispatch(getUser(null));
    }
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
