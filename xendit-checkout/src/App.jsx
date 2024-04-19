import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";

import ProductPages from "./Pages/ProductPages";
import CartPage from "./Pages/cart";
import SuccessPage from "./Pages/SuccesPage";
import FailurePage from "./Pages/FailurePage";
import ListInvoicePage from "./Pages/InvoicePage";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductPages />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/failure" element={<FailurePage />} />
        <Route path="/invoice" element={<ListInvoicePage />} />
      </Routes>
    </>
  );
}

export default App;
