import {
  Avatar,
  Drawer,
  DrawerContent,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import ResponsiveNav from "./ResponsiveNav";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";

const Header = ({ loggedUser }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex items-center px-8   justify-center gap-4">
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
      <a
        className="pointer-events-none flex place-items-center gap-2  lg:pointer-events-auto lg:p-0 flex-1"
        href=""
        target="_blank"
        rel="noopener noreferrer"
      >
        By{" "}
        <p>
          bud<span>^JET</span>
        </p>
      </a>
      <Avatar
        name={loggedUser?.displayName}
        src={loggedUser?.photoUrl}
        className="w-4 h-4 bg-secondary"
        bg="#013220"
        textColor="white"
        size="xs"
      />
    </div>
  );
};

export default Header;
