import React, { useState, createContext, useContext } from "react";
import { Button, Flex } from "antd";
import { useCreateInvoice } from "../service/InvoiceApi"; // Ubah impor
import Navbar from "../components/navbar";

// Buat context untuk keranjang belanja
const CartContext = createContext();

function CartPage() {
  const shoppingItems = [
    {
      id: 1,
      name: " Butter Roll",
      price: 5000,
      image:
        "https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2022/11/18/2437202932.jpg",
    },
    {
      id: 2,
      name: "Original Bread",
      price: 3000,
      image:
        "https://e7.pngegg.com/pngimages/504/96/png-clipart-bread-bread.png",
    },
    {
      id: 3,
      name: "Indian Bread",
      price: 7000,
      image:
        "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-kulcha-naan-vegetarian-cuisine-roti-indian-cuisine-png-image_10264070.png",
    },
    {
      id: 4,
      name: "Soft Bread",
      price: 10000,
      image:
        "https://resepkoki.id/wp-content/uploads/2018/01/Resep-Soft-Killer-Bread.jpg",
    },
  ];

  // Gunakan useState untuk menyimpan state keranjang belanja
  const [cartItems, setCartItems] = useState([]);
  const { createInvoice } = useCreateInvoice(); // Panggil custom hook di sini

  //   fungsi untuk menambahkan item
  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  //   fungsi untuk menghilangkan item
  const removeFromCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const isCartEmpty = cartItems.length === 0;
  //   fungsi untuk menghitung total
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = async () => {
    // Buat invoice dengan menggunakan data dari cartItems
    try {
      const successUrl = "http://localhost:5173/success"; // Ganti dengan URL halaman lokal Anda
      const failureUrl = "http://localhost:5173/failure";
      const response = await createInvoice(
        // Panggil fungsi createInvoice di sini
        cartItems,
        "kusumadewantara3@gmail.com",
        "+6281338019641",
        successUrl,
        failureUrl
      );
      console.log("Invoice created:", response);
      window.open(response.invoice_url, "_blank");
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, getTotalPrice }}
    >
      <Navbar />
      <Flex
        style={{
          paddingTop: "5rem",
          paddingInline: "5rem",
          minHeight: "100vh",
        }}
        wrap="wrap"
      >
        <Flex
          vertical
          flex={1.5}
          style={{
            border: "1px  solid gray",
            borderBottom: "none",
            borderRight: "none",
            padding: "1rem",
          }}
        >
          <h1>
            Simulasi Belanja <span style={{ color: "blue" }}>Xendit</span>
          </h1>
          <p>
            Simulasi ini dilakukan untuk integrasi API xendit pada bagian
            checkoutnya.{" "}
            <span style={{ color: "orangered" }}>
              Silahkan pilih item yang ingin kamu beli!.
            </span>
          </p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {shoppingItems.map((item) => (
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid gray",
                  boxShadow: "12px 17px 48px -21px rgba(0,0,0,0.3)",
                  WebkitBoxShadow: "12px 17px 48px -21px rgba(0,0,0,0.3)",
                  MozBoxShadow: "12px 17px 48px -21px rgba(0,0,0,0.3)",
                  padding: "0.3rem",
                  borderRadius: "10px",
                  margin: "0.3rem",
                  cursor: "pointer",
                  // Tambahkan cursor: pointer untuk menunjukkan item dapat diklik
                }}
                key={item.id}
                onClick={() => addToCart(item)} // Tambahkan event handler onClick
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                <span>{item.name}</span> - <span>{item.price} IDR</span>
              </li>
            ))}
          </ul>
        </Flex>

        <Flex
          flex={2}
          style={{
            border: "1px  solid gray",
            borderBottom: "none",
            padding: "1rem",
          }}
          vertical
        >
          <h2 style={{ margin: "0" }}>Cart</h2>
          <p style={{ margin: "0" }}>Order Summary</p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {cartItems.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "0.3rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                  <span>{item.name}</span>
                </div>
                <div>
                  <span>
                    {item.price} IDR x {item.quantity} ={" "}
                    {item.price * item.quantity} IDR
                  </span>
                  <Button onClick={() => removeFromCart(item)}>-</Button>{" "}
                  <Button onClick={() => addToCart(item)}>+</Button>
                </div>
              </li>
            ))}
          </ul>
          <Flex justify="space-between" align="center">
            <p>Total Price:</p>
            <p style={{ fontSize: "1.4rem" }}>IDR {getTotalPrice()} </p>
          </Flex>
          <Button
            size="large"
            style={{
              backgroundColor: isCartEmpty ? "lightgrey" : "orange",
              color: "white",
            }}
            disabled={isCartEmpty}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Flex>
      </Flex>
    </CartContext.Provider>
  );
}

export default CartPage;
