import React from "react";
import {
  Box,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { FaEllipsisVertical } from "react-icons/fa6";
const ActionMenu = ({
  setIsEdit,
  setEditId,
  onOpen,
  setData,
  prop,
  onSecondModalOpen,
}: any) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        bg="transparent"
        _active={{ backgroundColor: "#F8FFFC" }}
        _hover={{ backgroundColor: "#F8FFFC" }}
      >
        <FaEllipsisVertical color="#013220" />
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            setIsEdit(true);
            setEditId(prop.id);
            onOpen();
            setData({ ...prop });
          }}
          _hover={{ backgroundColor: "#F8FFFC", color: "#013220" }}
          color="#006400"
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setEditId(prop.id);
            onSecondModalOpen();
          }}
          _hover={{ backgroundColor: "#F8FFFC", color: "#990000" }}
          color="#006400"
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ActionMenu;
