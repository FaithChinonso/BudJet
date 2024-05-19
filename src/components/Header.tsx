import { Avatar } from "@chakra-ui/react";
import React from "react";

const Header = ({ loggedUser }: any) => {
  return (
    <div className="flex items-center px-8 py-4  justify-center">
      {" "}
      <a
        className="pointer-events-none flex place-items-center gap-2  lg:pointer-events-auto lg:p-0 flex-1"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        By{" "}
        <p>
          bud<span>^JET</span>
        </p>
      </a>
      <Avatar
        name={loggedUser?.user?.displayName}
        src={loggedUser?.user?.photoUrl}
        className="w-4 h-4 bg-secondary"
        bg="#013220"
        textColor="white"
        size="xs"
      />
    </div>
  );
};

export default Header;
