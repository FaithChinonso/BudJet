import React from "react";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { convertToDateFormat } from "@/helpers";
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
        zIndex={40}
        bg="transparent"
        _active={{ backgroundColor: "#F8FFFC" }}
        _hover={{ backgroundColor: "#F8FFFC" }}
      >
        <FaEllipsisVertical color="#013220" />
      </MenuButton>
      <MenuList zIndex={50}>
        <MenuItem
          onClick={() => {
            setIsEdit(true);
            setEditId(prop.id);
            onOpen();
            setData({ ...prop, date: convertToDateFormat(prop.date) });
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
