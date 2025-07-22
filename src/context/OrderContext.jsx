
import { createContext, useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);
  const [countItems, setCountItems] = useState(0);
  const [total, setTotal] = useState(0);

  const addItemToCart = (item) => {
    setOrder((prevOrder) => {
      const index = prevOrder.findIndex((i) => i._id === item._id);
      if (index !== -1) {
        const updated = [...prevOrder];
        updated[index].quantity += 1;
        return updated;
      } else {
        return [...prevOrder, { ...item, quantity: 1 }];
      }
    });
  };

  const clearCart = () => {
    setOrder([]);
    setCountItems(0);
    setTotal(0);
  };

  const updateTotals = () => {
    const count = order.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = order.reduce((acc, item) => acc + item.quantity * item.price, 0);
    setCountItems(count);
    setTotal(totalPrice);
  };

  const createOrder = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))?._id;
      const response = await axiosInstance.post("/orders", {
        userId,
        items: order,
        total,
        status: "pendiente"
      });
      console.log("Orden creada:", response.data);
      const allOrders = await axiosInstance.get("/orders");
      console.log("Todas las órdenes:", allOrders.data);
      clearCart();
    } catch (err) {
      console.error("Error creando orden:", err);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        addItemToCart,
        clearCart,
        countItems,
        total,
        createOrder,
        updateTotals,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};