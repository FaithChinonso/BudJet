"use client";
import React, { useEffect } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "@/store";
import { authProvider } from "./firebase";
import { getUser, setUserId } from "@/store/reducers/user-slice";
import { useRouter } from "next/router";

export function UiProviders({ children }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authProvider, (currentUser) => {
      console.log(currentUser);
      const res = currentUser;
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
      if (res?.accessToken) {
        router.push("dashboard");
      }
    });

    return () => unsubscribe();
  }, []);
  return <ChakraProvider>{children}</ChakraProvider>;
}
