import React, { useEffect } from "react";
import {
  Button,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "@/store";

import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import { getUser } from "@/store/reducers/user-slice";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { getTransactions } from "@/store/reducers/transactions-slice";
import { AddIcon } from "@chakra-ui/icons";
import Form from "./Form";

const Layout = ({ children }: any) => {
  const storedUser = sessionStorage.getItem("user");
  const loggedUser = storedUser ? JSON.parse(storedUser) : null;
  const dispatch = useAppDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const watchTransactions = (id: string) => {
    const unsub = onSnapshot(
      query(
        collection(db, "transactions"),
        where("userId", "==", loggedUser?.userId)
      ),
      (s) => {
        if (s.empty) return;
        let newData: any = [];
        s.docs.forEach((doc) => {
          const data = doc.data();
          newData.push(data);
        });
        if (newData.length) {
          dispatch(getTransactions(newData));
        }
      }
    );
    return unsub;
  };
  useEffect(() => {
    if (loggedUser?.userId) {
      const unsub = watchTransactions(loggedUser?.userId);

      return () => {
        unsub();
      };
    }
  }, [loggedUser?.userId]);
  return (
    <div className="min-h-screen h-screen max-w-screen overflow-scroll">
      <Grid
        templateAreas={{
          base: `"header"
                 "main"
                 "footer"`,
          md: `"nav header"
               "nav main"
               "nav footer"`,
        }}
        gridTemplateRows={{
          base: "60px 1fr 80px",
          md: "60px 1fr 80px",
        }}
        gridTemplateColumns={{
          base: "1fr",
          md: "250px 1fr",
        }}
        className="min-h-screen max-h-screen"
      >
        <GridItem
          p="2"
          bg="#F5FCF7"
          area={"header"}
          position="fixed"
          width="100vw"
          zIndex={10}
        >
          <Header loggedUser={loggedUser} />
        </GridItem>
        <GridItem
          display={{ base: "none", md: "block" }}
          area={"nav"}
          position="fixed"
          width="250px"
          height="100vh"
          bg="#013220"
          zIndex={20}
        >
          <Nav />
        </GridItem>
        <GridItem
          p="8"
          area={"main"}
          position="relative"
          maxWidth="100vw"
          maxHeight="calc(100vh - 60px)"
        >
          {children}
        </GridItem>
        <GridItem p="5" area={"footer"} bg="#F5FCF7">
          <Footer />
        </GridItem>
      </Grid>
    </div>
  );
};

export default Layout;
