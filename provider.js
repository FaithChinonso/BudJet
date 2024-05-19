"use client";
import React from "react";

import { ChakraProvider } from "@chakra-ui/react";

export function UiProviders({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
