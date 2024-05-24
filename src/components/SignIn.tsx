// src/components/SignIn.js
import React from "react";

import { signInWithGoogle } from "@/services/Auth";
import { useAppDispatch } from "@/store";
import { useRouter } from "next/router";
import { getUser, setUserId } from "@/store/reducers/user-slice";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const login = async () => {
    const res = await signInWithGoogle(dispatch, router);

    if (res) {
      const data = {
        accessToken: res?.accessToken,
        displayName: res?.displayName || "",
        email: res?.email || "",
        creationTime: res?.metadata?.creationTime || "",
        lastLogin: res?.metadata?.lastSignInTime || "",
        photoUrl: res?.photoURL || "",
        phoneNumber: res?.phoneNumber || "",
        userId: res?.uid,
      };
      dispatch(getUser(data));
      dispatch(setUserId(res?.uid));
      if (res.accessToken) {
        router.push("dashboard");
      }
    } else {
      dispatch(getUser(null));
      dispatch(setUserId(null));
    }
    console.log(res, "res");
  };
  return (
    <div>
      <button
        className="hover:border-white bg-secondary text-light-green hover:text-secondary  hover:border p-3 rounded-lg mb-6 hover:bg-tertiary01"
        onClick={() => login()}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
