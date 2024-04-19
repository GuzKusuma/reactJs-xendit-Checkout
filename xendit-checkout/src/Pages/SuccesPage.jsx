import React from "react";
import { Link } from "react-router-dom";
import { Button, Flex } from "antd";

const SuccessPage = () => {
  return (
    <Flex justify="center" align="center">
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1 style={{ color: "#52c41a" }}>Payment Successful!</h1>
        <p style={{ fontSize: "18px", marginBottom: "30px" }}>
          Your payment has been successfully processed.
        </p>
        <Link to="/">
          <Button type="primary">Back to Home</Button>
        </Link>
      </div>
    </Flex>
  );
};

export default SuccessPage;
