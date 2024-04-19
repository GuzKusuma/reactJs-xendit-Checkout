import React, { useEffect, useState } from "react";
import { Flex } from "antd";
import Navbar from "../components/navbar";

function ListInvoicePage() {
  return (
    <>
      <Navbar />

      <Flex
        style={{ padding: "50px", marginTop: "30px" }}
        justify="center"
        align="center"
      >
        <h1>List Invoice </h1>
      </Flex>
    </>
  );
}

export default ListInvoicePage;
