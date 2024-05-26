import {
  Avatar,
  Drawer,
  DrawerContent,
  IconButton,
  useDisclosure,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

import Image from "next/image";
import React from "react";
import ResponsiveNav from "./ResponsiveNav";
import { FiMenu } from "react-icons/fi";
import moment from "moment";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store";
import { signOutUser } from "@/services/Auth";
import { removeUser } from "@/store/reducers/user-slice";
import { removeTransactions } from "@/store/reducers/transactions-slice";

const Header = ({ loggedUser }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex items-center px-8    md:justify-center gap-4 md:pl-[250px] ">
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <ResponsiveNav onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <a className=" flex-1" href="" target="_blank" rel="noopener noreferrer">
        <Image
          src="/logo.png"
          alt="logo"
          width={60}
          height={50}
          priority
          className=""
        />
      </a>
      <Menu>
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          <Avatar
            name={loggedUser?.displayName}
            src={loggedUser?.photoUrl}
            className="w-4 h-4 bg-secondary"
            bg="#013220"
            textColor="white"
            size="xs"
          />
        </MenuButton>
        <MenuList bg="#F8FFFC">
          <MenuItem color="#013220" fontSize="10px">
            {loggedUser?.displayName}
          </MenuItem>
          <MenuItem color="#013220" fontSize="10px">
            {loggedUser?.phoneNumber.length
              ? loggedUser?.phoneNumber
              : "No Phone Number"}
          </MenuItem>

          <MenuItem color="#013220" fontSize="10px">
            {loggedUser?.email}
          </MenuItem>
          <MenuItem color="#013220" fontSize="10px">
            Date Joined: {moment(loggedUser?.creationTime).format("lll")}
          </MenuItem>
          <MenuItem
            bg="#013220"
            color="#F8FFFC"
            textAlign="left"
            _hover={{
              textAlign: "center",
              backgroundColor: "#F8FFFC",
              color: "#013220",
            }}
            fontSize="10px"
            onClick={async () => {
              await signOutUser();
              router.push("./");
              dispatch(removeUser());
              dispatch(removeTransactions());
            }}
          >
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default Header;
