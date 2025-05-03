import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { useAuthContext } from '../../Context/AuthContext';
import { useOrderContext } from "../../Context/OrderContext";
import OrderedItem from "../../components/Orders/OrderedItem";

const Account = () => {
    const orderContext = useOrderContext();
    const { orders, loading } = orderContext;
    const { fetchOrders } = useOrderContext();


    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState({ rating: 0, feedback: "" });
    const [deliveredOrders, setDeliveredOrders] = useState([]);

    const { user, isLoggedIn } = useAuthContext();

    useEffect(() => {
        // When orders are updated from context, update deliveredOrders
        if (orders.length > 0) {
            setDeliveredOrders(orders.filter(order => order.status === "Delivered"));
        }

        fetchUserReviews();
    }, [orders]); // ⬅️ React to order updates

    const fetchUserReviews = () => {
        // Dummy reviews (replace with API later if needed)
        setReviews([{ product: "Steak", rating: 5, feedback: "Delicious!" }]);
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        setReviews([...reviews, { ...review }]);
        setReview({ rating: 0, feedback: "" });
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
                // Refresh orders after marking as complete
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
                {/* <h2 className="text-2xl font-semibold">Email: abc@xyz.com </h2> */}
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
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {deliveredOrders.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold">Submit a Review</h2>
                    <form onSubmit={handleReviewSubmit} className="bg-white p-4 rounded-lg shadow-md mt-3">
                        <select
                            className="w-full p-2 border rounded"
                            value={review.product}
                            onChange={(e) => setReview({ ...review, product: e.target.value })}
                        >
                            <option value="">Select a product</option>
                            {deliveredOrders.map(order => (
                                <option key={order.id} value={order.product}>{order.product}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            className="w-full p-2 border rounded mt-3"
                            placeholder="Rating (1-5)"
                            value={review.rating}
                            onChange={(e) => setReview({ ...review, rating: e.target.value })}
                            min="1" max="5"
                        />
                        <textarea
                            className="w-full p-2 border rounded mt-3"
                            placeholder="Short feedback"
                            value={review.feedback}
                            onChange={(e) => setReview({ ...review, feedback: e.target.value })}
                        ></textarea>
                        <button className="mt-4 px-4 py-2 bg-[#c34c2e] text-white rounded-lg" type="submit">Submit Review</button>
                    </form>
                </div>
            )}

            <div className="mt-6">
                <h2 className="text-2xl font-semibold">Review History</h2>
                <ul className="bg-white p-4 rounded-lg shadow-md mt-3">
                    {reviews.length ? reviews.map((review, index) => (
                        <li key={index} className="border-b py-2">{review.product} - {review.rating} Stars - {review.feedback}</li>
                    )) : <p>No reviews yet.</p>}
                </ul>
            </div>
        </div>
    );
};

export default Account;
