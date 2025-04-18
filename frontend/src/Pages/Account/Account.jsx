import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";

const Account = ({ user }) => {
    const [orders, setOrders] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState({ rating: 0, feedback: "" });
    const [deliveredOrders, setDeliveredOrders] = useState([]);

    useEffect(() => {
        // Fetch user orders and reviews from an API or state
        fetchUserOrders();
        fetchUserReviews();
    }, []);

    const fetchUserOrders = () => {
        // Dummy orders data (Replace with API call)
        const dummyOrders = [
            { id: 1, product: "Steak", status: "Delivered" },
            { id: 2, product: "Cold Coffee", status: "Pending" },
        ];
        setOrders(dummyOrders);
        setDeliveredOrders(dummyOrders.filter(order => order.status === "Delivered"));
    };

    const fetchUserReviews = () => {
        // Dummy reviews data (Replace with API call)
        setReviews([{ product: "Steak", rating: 5, feedback: "Delicious!" }]);
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        setReviews([...reviews, { ...review }]);
        setReview({ rating: 0, feedback: "" });
    };

    return (
        <div className="max-w-4xl mx-auto py-10 mt-10 p-5">
            <h1 className="text-3xl font-bold text-center">User Account</h1>
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-2xl font-semibold">Email: abc@xyz.com </h2>
                {/* <h2 className="text-2xl font-semibold">Email: {user.email}</h2> */}
                <NavLink
                    to="/sign_out"
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg block text-center"
                >
                    Sign Out
                </NavLink>

            </div>

            <div className="mt-6">
                <h2 className="text-2xl font-semibold">Order History</h2>
                <ul className="bg-white p-4 rounded-lg shadow-md mt-3">
                    {orders.length ? orders.map(order => (
                        <li key={order.id} className="border-b py-2">{order.product} - {order.status}</li>
                    )) : <p>No orders found.</p>}
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
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg" type="submit">Submit Review</button>
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
