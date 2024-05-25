"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { Modal, ModalOverlay } from "@chakra-ui/react";
import Layout from "@/components/Layout";
import { AddIcon } from "@chakra-ui/icons";
import DataFilterTable from "@/components/Table";
import Form from "@/components/Form";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAppSelector } from "@/store";
import { customFilter, formatNumberWithCommas } from "@/helpers";
import moment from "moment";

const Income = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [searchText, setSearchText] = useState("");
  const { credit } = useAppSelector((state) => state.transactions);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const storedUser = sessionStorage.getItem("user");
  const loggedUser = storedUser ? JSON.parse(storedUser) : null;
  const [data, setData] = useState({
    name: "",
    desc: "",
    amount: 0,
    category: "",
    type: "credit",
    date: "",
  });
  const onSubmit = async () => {
    if (!isEdit) {
      const idd =
        Math.random() * 9 +
        new Date().getSeconds() +
        data.name +
        Math.random() * 90;
      const newData = {
        ...data,
        id: idd.toString(),
        userId: loggedUser?.userId,
        date: moment(data.date).format("ll"),
      };
      console.log(newData);
      await setDoc(doc(db, "transactions", newData.id), newData);
    } else {
      await updateDoc(doc(db, "transactions", editId), {
        ...data,
        userId: loggedUser?.userId,
        date: moment(data.date).format("ll"),
      });
    }
    await onClose();
    setData({
      name: "",
      desc: "",
      amount: 0,
      category: "",
      type: "credit",
      date: "",
    });
    setIsEdit(false);
    setEditId("");
  };

  return (
    <Layout>
      <Button
        bg="#006400"
        borderRadius="50%"
        onClick={() => onOpen()}
        position="absolute"
        className="absolute right-4 bottom-2 z-10"
      >
        <AddIcon w={4} h={4} color="white" />
      </Button>
      <div className="relative max-h-[calc(100vh-100px)] h-[calc(100vh-60px)] overflow-scroll">
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <Form
            onClose={onClose}
            onSubmit={onSubmit}
            data={data}
            setData={(dat: any) => setData(dat)}
            isEdit={isEdit}
            category="credit"
          />
        </Modal>
        <div className="flex justify-between items-center  md:flex-row flex-col">
          <h1 className="my-4  text-lg text-secondary">Income</h1>
          <FormControl width="250px">
            <Input
              type="name"
              placeholder="Search..."
              value={searchText}
              className="rounded-full p-4"
              onChange={(e) => setSearchText(e.target.value)}
              size="sm"
              borderRadius="100px"
              outline="none"
            />
          </FormControl>
        </div>
        <div className="mt-4">
          <DataFilterTable
            data={customFilter(credit, searchText)}
            setIsEdit={setIsEdit}
            setEditId={setEditId}
            setData={(dat: any) => setData(dat)}
            onOpen={onOpen}
            editId={editId}
            pageSize={10}
            expandableRows
            type="inner"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Income;
