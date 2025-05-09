import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// Create the context
const OrderContext = createContext();

// Provider component
export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [aOrders, setAOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            // if (!token) console.log("Token not found");
            // console.log(token);
            if (!token) return;
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

    const fetchAOrders = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:5000/api/orders/admin");
            setAOrders(res.data);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAOrders();
    }, []);
    // console.log(orders);
    const totalOrders = aOrders.length;

    const totalSales = aOrders.reduce((acc, order) => acc + (parseFloat(order.payed) || 0), 0);

    const currentOrders = aOrders.filter(order => order.isComplete === false).length;

    return (
        <OrderContext.Provider value={{ orders, loading, error, refetchOrders: fetchOrders, totalOrders, totalSales, currentOrders }}>
            {children}
        </OrderContext.Provider>
    );
};

// Custom hook for easier consumption
export const useOrderContext = () => useContext(OrderContext);
