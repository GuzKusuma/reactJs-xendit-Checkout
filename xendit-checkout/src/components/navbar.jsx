import React, { useEffect, useState } from "react";
import { Avatar, Button, Flex } from "antd";
import { Link, useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <Flex
        className={scrollY > 0 ? "scrolled" : ""}
        align="center"
        justify="space-between"
        style={{
          paddingBlock: "1rem",
          paddingInline: "3rem",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          transition: "background-color 0.5s ease",
          backgroundColor: scrollY > 0 ? "rgba(0, 0, 0, 0.1)" : "transparent",
          backdropFilter: scrollY > 0 ? "blur(10px)" : "none",
          WebkitBackdropFilter: scrollY > 0 ? "blur(10px)" : "none",
        }}
      >
        <Flex gap={20}>
          <img
            src="https://www.svgrepo.com/show/411761/toast.svg"
            alt=""
            style={{ width: "2rem" }}
          />
          <h2 style={{ marginBottom: "0" }}>Toasty</h2>
        </Flex>
        <Flex
          style={{
            display: "flex",

            listStyleType: "none",
            padding: 0,
            margin: 0,
            gap: 20,
          }}
        >
          <Link
            to="/"
            style={{ color: location.pathname === "/" ? "orange" : "black" }}
          >
            Product
          </Link>

          <Link
            to="/cart"
            style={{
              color: location.pathname === "/cart" ? "orange" : "black",
            }}
          >
            Simulation
          </Link>
          <Link
            to="/invoice"
            style={{
              color: location.pathname === "/invoice" ? "orange" : "black",
            }}
          >
            Invoice
          </Link>
        </Flex>
        <Flex justify="center" align="center" gap={20}>
          <Flex>
            <Avatar icon={<UserOutlined />} />
          </Flex>
          <Flex vertical>
            <h4 style={{ margin: 0 }}>
              Manik <br />{" "}
            </h4>
            <sub style={{ marginTop: -4 }}>
              Admin <br />{" "}
            </sub>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Navbar;
