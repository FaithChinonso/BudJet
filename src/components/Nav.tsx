import React from "react";
import { Box, StackDivider } from "@chakra-ui/react";

import { useAppDispatch } from "@/store";
import { signOutUser } from "@/services/Auth";
import { VStack } from "@chakra-ui/react";

import { useRouter } from "next/router";
import { removeUser } from "@/store/reducers/user-slice";
import { nav } from "@/utils";

const Nav = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <div className="pt-[50px] relative items-center  h-full">
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
    </div>
  );
};

export default Nav;
