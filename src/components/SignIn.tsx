// src/components/SignIn.js
import React from "react";

import { signInWithGoogle } from "@/services/Auth";
import { useAppDispatch } from "@/store";
import { useRouter } from "next/router";
import { getUser, setUserId } from "@/store/reducers/user-slice";

const SignIn = () => {
  const login = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error, "res");
    }
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
