import axios from "axios";
import { useState } from "react";

const secretKey =
  "xnd_development_InaGUSY8VJF4y4UfqEtT8XTZdPurbjZN2BqURhf0NVHU6k2tkHRYduTX8E9Mf8l";
const endpoint = "https://api.xendit.co/v2/invoices";
const basicAuthHeader = `Basic ${btoa(secretKey + ":")}`;

export function useCreateInvoice() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);

  const createInvoice = async (
    shoppingItems,
    customerEmail,
    customerPhoneNumber,
    successRedirectUrl,
    failureRedirectUrl
  ) => {
    setLoading(true);
    setError(null);

    try {
      const items = shoppingItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const totalAmount = shoppingItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const payload = {
        external_id: "xendit_test_id_1",
        amount: totalAmount,
        currency: "IDR",
        customer: {
          email: customerEmail,
          mobile_number: customerPhoneNumber,
        },
        customer_notification_preference: {
          invoice_paid: ["email", "whatsapp"],
        },
        success_redirect_url: successRedirectUrl,
        failure_redirect_url: failureRedirectUrl,
        items: items,
      };

      const { data, status } = await axios.post(endpoint, payload, {
        headers: {
          Authorization: basicAuthHeader,
          "Content-Type": "application/json",
        },
      });

      console.log("Invoice created:", data);
      setInvoiceData(data);

      return data;
    } catch (error) {
      console.error("Error creating invoice:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getInvoice = async (invoiceId) => {
    try {
      const response = await axios.get(
        `https://api.xendit.co/v2/invoices/${invoiceId}`,
        {
          headers: {
            Authorization: basicAuthHeader,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Invoice details:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching invoice:", error);
      throw error;
    }
  };
  const getAllInvoices = async () => {
    try {
      const response = await axios.get(
        `${endpoint}?limit=10&statuses=["SETTLED","EXPIRED"]&client_types=["DASHBOARD","API_GATEWAY"]`,
        {
          headers: {
            Authorization: basicAuthHeader,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("All invoices:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching all invoices:", error);
      throw error;
    }
  };

  return {
    createInvoice,
    loading,
    error,
    invoiceData,
    getInvoice,
    getAllInvoices,
  };
}
