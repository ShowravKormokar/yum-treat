import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [aOrders, setAOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch orders for the logged-in user
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            if (!token) return;

            const response = await axios.get("http://localhost:5000/api/orders/my-orders", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setOrders(response.data);
        } catch (err) {
            console.error("Failed to fetch user orders:", err);
            setError(err.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // Fetch all orders (admin use)
    const fetchAOrders = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:5000/api/orders/admin");
            setAOrders(res.data);
        } catch (err) {
            console.error("Failed to fetch admin orders:", err);
            setError(err.response?.data?.error || "Failed to load admin orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        fetchAOrders();
    }, []);

    const totalOrders = aOrders.length;

    const totalSales = aOrders.reduce((acc, order) => {
        if (order.isComplete && order.status !== "cancel") {
            return acc + (parseFloat(order.payed) || 0);
        }
        return acc;
    }, 0);

    const totalCanceled = aOrders.reduce((acc, order) => {
        return order.status === "cancel" ? acc + 1 : acc;
    }, 0);

    const totalCompleted = aOrders.reduce((acc, order) => {
        return (order.isComplete && order.status !== "cancel") ? acc + 1 : acc;
    }, 0);


    const currentOrders = aOrders.filter(order => !order.isComplete).length;

    return (
        <OrderContext.Provider
            value={{
                orders,
                aOrders,
                loading,
                error,
                refetchOrders: fetchOrders,
                refetchAOrders: fetchAOrders,
                totalOrders,
                totalSales,
                totalCompleted,
                totalCanceled,
                currentOrders
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};

export const useOrderContext = () => useContext(OrderContext);