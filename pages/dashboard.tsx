"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  SimpleGrid,
  useDisclosure,
  Text,
  Select,
  FormControl,
} from "@chakra-ui/react";
import { Modal, ModalOverlay } from "@chakra-ui/react";
import Layout from "@/components/Layout";
import { AddIcon } from "@chakra-ui/icons";
import DataFilterTable from "@/components/Table";
import Form from "@/components/Form";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAppDispatch, useAppSelector } from "@/store";
import { formatNumberWithCommas, generateMonthlyData } from "@/helpers";
import moment from "moment";
import { MonthlyData, Transaction } from "@/utils";
import { getFilteredTransactions } from "@/store/reducers/transactions-slice";
import AreaChartComp from "@/components/AreaChart";
import { PieChart } from "recharts";
import PieChartComp from "@/components/PieChart";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const storedUser = sessionStorage.getItem("user");
  const loggedUser = storedUser ? JSON.parse(storedUser) : null;
  const [isEdit, setIsEdit] = useState(false);
  const [displayData, setDisplayData] = useState<MonthlyData[]>([]);

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
  const [display, setDisplay] = useState<Transaction[]>(transactions);
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
  useEffect(() => {
    const joined = moment(loggedUser?.creationTime).format("ll");
    const newData = generateMonthlyData(joined, transactions);
    console.log(generateMonthlyData(joined, transactions));
    setDisplay(transactions);
    setDisplayData(newData);
  }, [transactions]);
  useEffect(() => {
    dispatch(getFilteredTransactions(display));
  }, [display]);

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
      <div className="relative max-h-[calc(100vh-140px)] h-[calc(100vh-140px)] overflow-scroll">
        <div className="flex flex-col justify-between items-center w-full bg-red md:flex-row mb-8">
          <h1 className="my-4  text-lg text-secondary flex-1">
            Welcome{" "}
            <span className="font-light text-xl capitalize">
              {loggedUser?.displayName},
            </span>
          </h1>
          <FormControl className="max-w-[150px] ">
            <Select
              defaultValue={JSON?.stringify(transactions)}
              placeholder="Filter By Month"
              onChange={(e) => {
                setDisplay(JSON?.parse(e.target.value));
              }}
              size="sm"
              borderColor="#013220"
            >
              <option value={JSON?.stringify(transactions)}>All</option>
              {displayData?.map((item: MonthlyData, i) => (
                <option key={i} value={JSON?.stringify(item.data)}>
                  {item.month}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>

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
            category="all"
          />
        </Modal>
        <SimpleGrid columns={[1, 3, 5]} spacing={10} maxW="100vw">
          {dashboardDetails?.map((item) => (
            <Box
              key={item.id}
              bg={item.color}
              flexDirection="column"
              className="border border-tertiary02 shadow-xl shadow-tertiary01 rounded-md items-center justify-center p-2"
            >
              <Text
                textColor={item.textColor}
                className="text-lg mb-2 font-extralight"
              >
                {item.name}
              </Text>
              <Text
                textColor={item.textColor}
                className="text-sm font-semibold capitalize"
              >
                {item.value}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
        <div className="flex w-full my-8 flex-col md:flex-row items-center gap-6">
          <AreaChartComp transactions={display} />
          <PieChartComp transactions={display} />
        </div>
        <div className="mt-4">
          <DataFilterTable
            data={display}
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
