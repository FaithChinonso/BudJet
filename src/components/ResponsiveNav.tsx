import React from "react";
import {
  Box,
  CloseButton,
  StackDivider,
  useColorModeValue,
  Flex,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";

import { useAppDispatch } from "@/store";
import { signOutUser } from "@/services/Auth";
import { VStack } from "@chakra-ui/react";

import { useRouter } from "next/router";
import { removeUser } from "@/store/reducers/user-slice";
import { nav } from "@/utils";

const ResponsiveNav = ({ onClose }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <Box
      transition="3s ease"
      bg="#013220"
      borderRadius={10}
      w={{ base: "100vw", md: 60 }}
      pos="fixed"
      h="full"
      className="min-h-screen"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image
          src="/white-logo.png"
          alt="logo"
          width={100}
          height={40}
          priority
          className=" p-2 rounded-2xl"
        />
        <CloseButton
          color="#fff"
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
        />
      </Flex>
      <VStack divider={<StackDivider />}>
        {nav.map((item) => (
          <Box
            key={item.id}
            className="hover:text-tertiary02 my-4 text-white"
            onClick={() => router.push(item.route)}
          >
            {item.name}
          </Box>
        ))}
      </VStack>
      <button
        className="  py-3 rounded-lg mb-6 hover:bg-tertiary02 text-white absolute bottom-4 w-full"
        onClick={() => {
          signOutUser();
          router.push("./");
          dispatch(removeUser());
        }}
      >
        Sign Out
      </button>
    </Box>
  );
};

export default ResponsiveNav;
