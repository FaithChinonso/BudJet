import React from "react";
import {
  Box,
  Button,
  Center,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/store";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { AddIcon } from "@chakra-ui/icons";
import { dashboardDetails, tableData } from "@/utils";
import DataFilterTable from "@/components/Table";
import moment from "moment";

const Dashboard = () => {
  const loggedUser = useAppSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const columnAdmin = [
    {
      name: "S/N",
      selector: (row: { sn: any }) => <div>{row.sn}</div>,
    },

    {
      name: "Title",
      selector: (row: { title: any }) => <div>{row.title}</div>,
    },
    {
      name: "Date",
      selector: (row: { date: any }) => <div>{row.date}</div>,
      maxWidth: "150px",
    },

    {
      name: "Amount",
      selector: (row: { amount: any }) => <div className="">{row.amount}</div>,
      maxWidth: "120px",
    },
    {
      name: "Budget",
      selector: (row: { budget: any }) => <div>{row.budget}</div>,
    },
    {
      name: "Type",
      selector: (row: { type: any }) => <div className="">{row.type}</div>,
    },
  ];

  const formatData = tableData?.slice().map((item: any, index: any) => {
    return {
      sn: index + 1,
      title: `${item?.title} ` || "--",
      budget: `${item?.budget} ` || "--",
      date: moment(item?.created_at).format("ll") || "--",
      amount: item.amount || "--",
      type: item.type || "--",
      desc: item?.desc || "--",
    };
  });
  return (
    <Layout>
      <div>
        <h1 className="my-4  text-lg text-secondary">
          Welcome{" "}
          <span className="font-light text-xl capitalize">
            {loggedUser?.user?.displayName},
          </span>
        </h1>
        <Button
          bg="#006400"
          borderRadius="50%"
          onClick={onOpen}
          position="absolute"
          className="absolute right-4 bottom-2"
        >
          <AddIcon w={4} h={4} color="white" />
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a transaction</ModalHeader>
            <ModalCloseButton />
            <ModalBody className="flex flex-col space-y-4">
              <FormControl isRequired>
                <FormLabel
                  fontWeight="600"
                  fontSize="14"
                  textColor="#013220"
                  className="font-semibold"
                >
                  Name
                </FormLabel>
                <Input type="name" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontWeight="600" fontSize="14" textColor="#013220">
                  Transaction Type
                </FormLabel>
                <Select placeholder="Select type">
                  <option>Debit</option>
                  <option>Credit</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="600" fontSize="14" textColor="#013220">
                  Budget
                </FormLabel>
                <Select placeholder="Select budget type">
                  <option>Food</option>
                  <option>Personal</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontWeight="600" fontSize="14" textColor="#013220">
                  Amount
                </FormLabel>
                <NumberInput max={50} min={10}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontWeight="600" fontSize="14" textColor="#013220">
                  Date
                </FormLabel>
                <Input type="date" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontWeight="600" fontSize="14" textColor="#013220">
                  More Details
                </FormLabel>
                <Textarea
                  value=""
                  onChange={() => {}}
                  placeholder="Type here"
                  size="sm"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Add</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <SimpleGrid columns={[1, 3, 5]} spacing={10}>
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
            data={formatData}
            column={columnAdmin}
            pageSize={5}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
