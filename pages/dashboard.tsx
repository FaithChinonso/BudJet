import React from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  StackDivider,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/store";
import { signOutUser } from "@/services/Auth";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
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
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import { Router, useRouter } from "next/router";
import { removeUser } from "@/store/reducers/user-slice";

const Dashboard = () => {
  const loggedUser = useAppSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const nav = [
    { id: 1, name: "Dashboard", route: "/dashboard" },
    { id: 2, name: "Outflow", route: "/outflow" },
    { id: 3, name: "Inflow", route: "/inflow" },
    { id: 4, name: "Budget", route: "/budget" },
  ];
  const dashboardDetails = [
    {
      id: 1,
      name: "Total",
      value: "92000",
      color: "#3F492E",
      textColor: "#fff",
    },
    {
      id: 2,
      name: "Outflow",
      value: "12000",
      color: "rgba(0,100,0,0.1)",
      textColor: "rgba(0,100,0,1)",
    },
    {
      id: 3,
      name: "Inflow",
      value: "80000",
      color: "#4BD3A5",
      textColor: "#fff",
    },
    {
      id: 4,
      name: "Count",
      value: "20000",
      color: "#006400",
      textColor: "#fff",
    },
    {
      id: 5,
      name: "Overdue",
      value: "20000",
      color: "#4F4F4F",
      textColor: "#fff",
    },
  ];
  return (
    <div className="">
      <Grid
        templateAreas={`"header header"
                    "nav main"
                    "nav footer"`}
        gridTemplateRows={"100px 1fr 100px"}
        gridTemplateColumns={"150px 1fr"}
      >
        <GridItem
          pl="2"
          bg="#F5FCF7"
          area={"header"}
          className="flex space-x-3 items-center px-8"
        >
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 flex-1"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <p>
              bud<span>^JET</span>
            </p>
          </a>

          <h1 className="my-4 text-center text-2xl text-secondary ">
            Welcome, {loggedUser?.user?.displayName}
          </h1>
          <Avatar
            name={loggedUser?.user?.displayName}
            src={loggedUser?.user?.photoUrl}
            className="w-4 h-4 bg-secondary"
            bg="#013220"
            textColor="white"
            size="xs"
          />
        </GridItem>
        <GridItem
          area={"nav"}
          bg="#F5FCF7"
          className="pt-[50px] relative items-center"
        >
          <VStack divider={<StackDivider />}>
            {nav.map((item) => (
              <Box key={item.id} className="hover:text-secondary my-4 ">
                {item.name}
              </Box>
            ))}
          </VStack>

          <button
            className="  py-3 rounded-lg mb-6 hover:bg-tertiary01 absolute bottom-4 w-full"
            onClick={() => {
              signOutUser();
              router.push("./");
              dispatch(removeUser());
            }}
          >
            Sign Out
          </button>
        </GridItem>
        <GridItem p="4" area={"main"} className="relative">
          <Button
            bg="#006400"
            borderRadius="50%"
            onClick={onOpen}
            position="absolute"
            className="absolute right-4 bottom-4"
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

          <Wrap spacing="30px" justify="center">
            {dashboardDetails?.map((item) => (
              <WrapItem
                key={item.id}
                bg={item.color}
                flexDirection="column"
                className="border border-tertiary02 shadow-xl shadow-tertiary01 rounded-md items-center justify-center"
                w="200px"
                h="160px"
              >
                <Center textColor={item.textColor} className="text-2xl">
                  {item.name}
                </Center>
                <Center textColor={item.textColor}>{item.value}</Center>
              </WrapItem>
            ))}
          </Wrap>
          <TableContainer marginTop="30px">
            <Table variant="simple">
              <TableCaption>Recent Transactions</TableCaption>
              <Thead>
                <Tr>
                  <Th>S/N</Th>
                  <Th>Date</Th>
                  <Th>Name</Th>
                  <Th isNumeric>Amount</Th>
                  <Th>Type</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>25/03/2024</Td>
                  <Td>Ice Cream</Td>
                  <Td isNumeric>3590</Td>
                  <Td>Debit</Td>
                </Tr>
                <Tr>
                  <Td>2</Td>
                  <Td>25/03/2024</Td>
                  <Td>Light</Td>
                  <Td isNumeric>13000</Td>
                  <Td>Debit</Td>
                </Tr>
                <Tr>
                  <Td>3</Td>
                  <Td>25/03/2024</Td>
                  <Td>Digitpay Salary</Td>
                  <Td isNumeric>280000</Td>
                  <Td>Credit</Td>
                </Tr>
                <Tr>
                  <Td>4</Td>
                  <Td>25/03/2024</Td>
                  <Td>Light</Td>
                  <Td isNumeric>13000</Td>
                  <Td>Debit</Td>
                </Tr>
                <Tr>
                  <Td>5</Td>
                  <Td>25/03/2024</Td>
                  <Td>Digitpay Salary</Td>
                  <Td isNumeric>280000</Td>
                  <Td>Credit</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </GridItem>
        <GridItem p="5" area={"footer"} bg="#F5FCF7">
          <a
            className=" flex w-[100px]  "
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <p>
              bud<span>^JET</span>
            </p>
          </a>
        </GridItem>
      </Grid>
    </div>
  );
};

export default Dashboard;
