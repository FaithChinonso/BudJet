// src/components/SignIn.js
import React from "react";

import { signInWithGoogle } from "@/services/Auth";

const SignIn = () => {
  return (
    <div>
      <button
        className="hover:border-white  hover:border p-3 rounded-lg mb-6 hover:bg-tertiary01"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
