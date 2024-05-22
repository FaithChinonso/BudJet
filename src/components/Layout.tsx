import React, { useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "@/store";

import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import { getUser } from "@/store/reducers/user-slice";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { getTransactions } from "@/store/reducers/transactions-slice";

const Layout = ({ children }: any) => {
  const storedUser = sessionStorage ? sessionStorage.getItem("user") : null;
  const loggedUser = storedUser ? JSON.parse(storedUser) : null;
  const dispatch = useAppDispatch();

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
    <div className="min-h-screen max-w-screen overflow-hidden">
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
          base: "60px 1fr 100px",
          md: "60px 1fr 100px",
        }}
        gridTemplateColumns={{
          base: "1fr",
          md: "250px 1fr",
        }}
        className="min-h-screen"
      >
        <GridItem p="2" bg="#F5FCF7" area={"header"} maxWidth="100vw">
          <Header loggedUser={loggedUser} />
        </GridItem>
        <GridItem
          display={{ base: "none", md: "block" }}
          area={"nav"}
          bg="#013220"
        >
          <Nav />
        </GridItem>
        <GridItem p="8" area={"main"} className="relative" maxWidth="100vw">
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
