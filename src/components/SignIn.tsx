// src/components/SignIn.js
import React from "react";

import { signInWithGoogle } from "@/services/Auth";
import { useAppDispatch } from "@/store";
import { useRouter } from "next/router";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const login = async () => {
    const res = await signInWithGoogle(dispatch, router);
    console.log(res, "res");
  };
  return (
    <div>
      <button
        className="hover:border-white  hover:border p-3 rounded-lg mb-6 hover:bg-tertiary01"
        onClick={login}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
