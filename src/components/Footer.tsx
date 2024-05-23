import React from "react";
import Image from "next/image";
import { Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <div className="flex justify-end items-center">
      <Text fontSize={"sm"} color="#013220">
        © 2022 Bud^JET. All rights reserved
      </Text>

      <a href="" target="_blank" rel="noopener noreferrer">
        <Image
          src="/logo.png"
          alt="logo"
          width={60}
          height={50}
          priority
          className=""
        />
      </a>
    </div>
  );
};

export default Footer;
