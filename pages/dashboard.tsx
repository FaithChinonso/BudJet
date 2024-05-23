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

const Dashboard = () => {
  const storedUser = sessionStorage.getItem("user");
  const loggedUser = storedUser ? JSON.parse(storedUser) : null;
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const {
    transactions,
    totalCreditAmount,
    totalDebitAmount,
    balance,
    creditCount,
    debitCount,
    highestDebitCategory,
  } = useAppSelector((state) => state.transactions);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const dashboardDetails = [
    {
      id: 2,
      name: "Income",
      value: formatNumberWithCommas(totalCreditAmount),
      color: "#ead1dc",
      textColor: "rgba(0,100,0,1)",
    },
    {
      id: 3,
      name: "Expenses",
      value: formatNumberWithCommas(totalDebitAmount),
      color: "rgba(75,211,165,0.1)",
      textColor: "rgba(0,100,0,1)",
    },
    {
      id: 1,
      name: "Balance",
      value: formatNumberWithCommas(balance),
      color: "#fff2cc",
      textColor: "rgba(0,100,0,1)",
    },

    {
      id: 4,
      name: "Count",
      value: debitCount + creditCount,
      color: "#cfe2f3",
      textColor: "rgba(0,100,0,1)",
    },
    {
      id: 5,
      name: "Highest Category",
      value: highestDebitCategory || "Nil",
      color: "#d9d2e9",
      textColor: "rgba(0,100,0,1)",
    },
  ];
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
        <h1 className="my-4  text-lg text-secondary">
          Welcome{" "}
          <span className="font-light text-xl capitalize">
            {loggedUser?.displayName},
          </span>
        </h1>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <Form
            onClose={() => {
              setIsEdit(false);
              setEditId("");
              onClose();
            }}
            onSubmit={onSubmit}
            data={data}
            setData={(dat: any) => setData(dat)}
            isEdit={isEdit}
          />
        </Modal>
        <SimpleGrid columns={[1, 3, 5]} spacing={10} maxW="100vw">
          {dashboardDetails?.map((item) => (
            <Box
              key={item.id}
              bg={item.color}
              flexDirection="column"
              className="border border-tertiary02 shadow-xl shadow-tertiary01 rounded-md items-center justify-center"
            >
              <Center
                textColor={item.textColor}
                className="text-xl mb-2 font-extralight"
              >
                {item.name}
              </Center>
              <Center
                textColor={item.textColor}
                className="text-sm font-semibold"
              >
                {item.value}
              </Center>
            </Box>
          ))}
        </SimpleGrid>
        <div className="mt-8">
          <DataFilterTable
            data={transactions}
            setIsEdit={setIsEdit}
            setEditId={setEditId}
            setData={(dat: any) => setData(dat)}
            onOpen={onOpen}
            editId={editId}
            pageSize={5}
            expandableRows
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
