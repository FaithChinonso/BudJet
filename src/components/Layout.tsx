import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import { useAppSelector } from "@/store";

import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ children }: any) => {
  const loggedUser = useAppSelector((state) => state.user);
  return (
    <div className="min-h-screen">
      <Grid
        templateAreas={`"nav header"
                    "nav main"
                    "nav footer"`}
        gridTemplateRows={"60px 1fr 100px"}
        gridTemplateColumns={"250px 1fr"}
        className="min-h-screen"
      >
        <GridItem p="2" bg="#F5FCF7" area={"header"}>
          <Header loggedUser={loggedUser} />
        </GridItem>
        <GridItem area={"nav"} bg="#013220">
          <Nav />
        </GridItem>
        <GridItem p="8" area={"main"} className="relative">
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
