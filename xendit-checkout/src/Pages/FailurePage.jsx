import React from "react";
import { Link } from "react-router-dom";
import { Button, Flex } from "antd";

const FailurePage = () => {
  return (
    <Flex justify="center" align="center">
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1 style={{ color: "#f5222d" }}>Payment Failed!</h1>
        <p style={{ fontSize: "18px", marginBottom: "30px" }}>
          Sorry, your payment was not successful.
        </p>
        <Link to="/">
          <Button type="primary">Back to Home</Button>
        </Link>
      </div>
    </Flex>
  );
};

export default FailurePage;
