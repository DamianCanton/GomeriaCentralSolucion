import { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("workshop_orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("workshop_orders", JSON.stringify(orders));
    // REMOVED manual dispatch to prevent infinite loop.
    // Typescript/React state changes handle local update.
    // Native 'storage' event handles cross-tab update.
  }, [orders]);

  // Sync across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      // Only react if the specific key changed
      if (e.key === "workshop_orders") {
        const saved = localStorage.getItem("workshop_orders");
        if (saved) {
          // Basic check to avoid re-renders if data is same could be done here,
          // but 'storage' event only fires on other tabs usually.
          setOrders(JSON.parse(saved));
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addOrder = (orderData) => {
    const newOrder = {
      id: crypto.randomUUID(),
      displayId: Math.floor(Math.random() * 9000 + 1000).toString(), // Random 4-digit ID
      status: "pending",
      createdAt: new Date().toISOString(),
      ...orderData,
      // orderData should now contain { model, plate, clientName, job, services: [], notes: '' }
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrder = (id, updates) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, ...updates } : order))
    );
  };

  const deleteOrder = (id) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  const completeOrder = (id) => {
    updateOrder(id, { status: "completed" });
  };

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, updateOrder, deleteOrder, completeOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};
