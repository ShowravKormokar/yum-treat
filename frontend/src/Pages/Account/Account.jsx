import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from '../../Context/AuthContext';
import { useOrderContext } from "../../Context/OrderContext";
import Loader from "../../components/Loader/Loader";
import CancelOrders from "../../components/AccountComp/CancelOrders";
import CurrentOrder from "../../components/AccountComp/CurrentOrder";
import OrderHistory from "../../components/AccountComp/OrderHistory";
import { API_BASE_URL } from "../../lib/api";
import apiF from "../../lib/api";

const Account = () => {
    const { orders, refetchOrders } = useOrderContext();
    const { user } = useAuthContext();
    const [activeTab, setActiveTab] = useState("current");


    const [deliveredOrders, setDeliveredOrders] = useState([]);
    const [confirmedOrders, setConfirmedOrders] = useState([]);  // Stores confirmed orders

    useEffect(() => {
        if (orders.length > 0) {
            setDeliveredOrders(orders.filter(order => order.status === "delivered"));
        }
    }, [orders]);

    //Order Cancel
    const cancelOrder = async (orderId) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/orders/cancel/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")}`
                }
            });
            const data = await res.json();
            if (res.ok) alert('Order cancelled successfully!');
            else alert(data.message || 'Failed to cancel');
        } catch (err) {
            console.error(err);
            alert('Error cancelling order');
        }
    };


    const markAsComplete = async (orderId) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/orders/complete/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")}`
                }
            });

            if (res.ok) {
                refetchOrders(); // Refetch orders to update the state
                setConfirmedOrders((prev) => [...prev, orderId]); // Add the completed order to confirmedOrders
            } else {
                const data = await res.json();
                alert(`Failed to mark as complete: ${data.error}`);
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Something went wrong while marking the order as complete.");
        }
    };

    if (!user || !orders) return <Loader />;

    return (
        <div className="max-w-4xl mx-auto py-10 mt-10 p-5">
            <h1 className="text-3xl font-bold text-center">User Account</h1>
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                {user ? (
                    <div>
                        <p><strong>User ID:</strong> {user._id}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>
                ) : (
                    <p>Loading user info...</p>
                )}
                <NavLink
                    to="/sign_out"
                    className="mt-4 px-4 py-2 bg-[#c34c2e] text-white rounded-lg block text-center"
                >
                    Sign Out
                </NavLink>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <div className="flex justify-between">
                    <button
                        onClick={() => setActiveTab("current")}
                        className={`mt-4 px-4 py-2 rounded-lg block text-center ${activeTab === "current"
                            ? "bg-[#a83b1f] text-white"
                            : "bg-[#c34c2e] text-white"
                            }`}
                    >
                        Current Orders
                    </button>

                    <button
                        onClick={() => setActiveTab("cancel")}
                        className={`mt-4 px-4 py-2 rounded-lg block text-center ${activeTab === "cancel"
                            ? "bg-[#a83b1f] text-white"
                            : "bg-[#c34c2e] text-white"
                            }`}
                    >
                        Cancel Orders
                    </button>

                    <button
                        onClick={() => setActiveTab("history")}
                        className={`mt-4 px-4 py-2 rounded-lg block text-center ${activeTab === "history"
                            ? "bg-[#a83b1f] text-white"
                            : "bg-[#c34c2e] text-white"
                            }`}
                    >
                        Order History
                    </button>
                </div>

                <div className="mt-6">
                    {activeTab === "current" && <CurrentOrder />}
                    {activeTab === "cancel" && <CancelOrders />}
                    {activeTab === "history" && <OrderHistory />}
                </div>
            </div>

        </div>
    );
};

export default Account;
