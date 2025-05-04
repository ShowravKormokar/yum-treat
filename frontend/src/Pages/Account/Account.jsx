import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from '../../Context/AuthContext';
import { useOrderContext } from "../../Context/OrderContext";
import OrderedItem from "../../components/Orders/OrderedItem";
import ReviewForm from "../../components/Reviews/ReviewForm";
import ReviewCard from "../../components/Reviews/ReviewCard";

const Account = () => {
    const { orders, fetchOrders } = useOrderContext();
    const { user } = useAuthContext();

    const [reviews, setReviews] = useState([]);
    const [deliveredOrders, setDeliveredOrders] = useState([]);

    useEffect(() => {
        if (orders.length > 0) {
            setDeliveredOrders(orders.filter(order => order.status === "delivered"));
        }

        fetchUserReviews();
    }, [orders]);
    // console.log(deliveredOrders);

    const fetchUserReviews = () => {
        // Dummy static reviews - replace with API call as needed
        setReviews([{ productID: "Steak", rating: 5, feedback: "Delicious!" }]);
    };



    const markAsComplete = async (orderId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/orders/complete/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")}`
                }
            });

            if (res.ok) {
                fetchOrders();
            } else {
                const data = await res.json();
                alert(`Failed to mark as complete: ${data.error}`);
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Something went wrong while marking the order as complete.");
        }
    };

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

            <div className="mt-6">
                <h2 className="text-2xl font-semibold">Order History</h2>
                <ul className="bg-white p-4 rounded-lg shadow-md mt-3">
                    {orders.map(order => (
                        <li key={order._id} className="border-b py-2">
                            <OrderedItem productID={order.product_id} orderTime={order.createdAt} />
                            <div className="flex items-center justify-evenly gap-8">
                                <h3>Status: {order.status}</h3>
                                <p>Note: {order.note}</p>
                            </div>

                            {order.status === "delivered" && !order.isComplete && (
                                <div className="mt-2 text-center">
                                    <p className="mb-2">Have you received this order?</p>
                                    <button
                                        onClick={() => markAsComplete(order._id)}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Yes, I received it
                                    </button>
                                </div>
                            )}

                            {order.isComplete && (
                                <div className="text-green-700 font-semibold text-center mt-2">
                                    ✅ Order marked as complete
                                    <p className="pt-1 text-sm text-gray-500">
                                        {new Date(order.updatedAt).toLocaleString('en-US', {
                                            weekday: 'short',
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {deliveredOrders.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold">Submit a Review</h2>
                    {deliveredOrders.map(order => (
                        <ReviewForm
                            key={order._id}
                            orderID={order._id}
                            userID={user._id}
                            productID={order.product_id}
                            orderCompleteDate={order.updatedAt}
                        />
                    ))}
                </div>
            )}

            <div className="mt-6">
                <h2 className="text-2xl font-semibold">Review History</h2>
                <ReviewCard reviews={reviews} />
            </div>
        </div>
    );
};

export default Account;