import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context
const OrderContext = createContext();

// Provider component
export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            if (!token) console.log("Token not found");
            console.log(token);
            const response = await fetch("http://localhost:5000/api/orders/my-orders", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setOrders(data);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
            setError(err.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <OrderContext.Provider value={{ orders, loading, error, refetchOrders: fetchOrders }}>
            {children}
        </OrderContext.Provider>
    );
};

// Custom hook for easier consumption
export const useOrderContext = () => useContext(OrderContext);
