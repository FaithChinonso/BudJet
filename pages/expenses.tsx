"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
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
import { formatNumberWithCommas } from "@/helpers";

const Expenses = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const { debit } = useAppSelector((state) => state.transactions);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const storedUser = sessionStorage ? sessionStorage.getItem("user") : null;
  const loggedUser = storedUser ? JSON.parse(storedUser) : null;
  const [data, setData] = useState({
    name: "",
    desc: "",
    amount: 0,
    category: "",
    type: "",
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
      };
      console.log(newData);
      await setDoc(doc(db, "transactions", newData.id), newData);
    } else {
      await updateDoc(doc(db, "transactions", editId), {
        ...data,
        userId: loggedUser?.userId,
      });
    }
    await onClose();
    setData({
      name: "",
      desc: "",
      amount: 0,
      category: "",
      type: "",
      date: "",
    });
    setIsEdit(false);
    setEditId("");
  };

  return (
    <Layout>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Form
          onClose={onClose}
          onSubmit={onSubmit}
          data={data}
          setData={(dat: any) => setData(dat)}
          isEdit={isEdit}
        />
      </Modal>
      <h1 className="my-4  text-lg text-secondary">Expenses</h1>
      <div className="mt-8">
        <DataFilterTable
          data={debit}
          setIsEdit={setIsEdit}
          setEditId={setEditId}
          setData={(dat: any) => setData(dat)}
          onOpen={onOpen}
          editId={editId}
          pageSize={5}
          expandableRows
        />
      </div>
    </Layout>
  );
};

export default Expenses;
