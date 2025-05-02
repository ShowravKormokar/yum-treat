import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderedItem from '../../components/OrderedItem';

const OrderInfo = () => {
    const [orders, setOrders] = useState([]);  // Correct way to use useState
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:5000/api/orders/admin");
            setOrders(res.data);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.patch(
                `http://localhost:5000/api/orders/update-status/${orderId}`,
                { status: newStatus },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            fetchOrders(); // Re-fetch to update UI
        } catch (err) {
            console.error("Error updating status:", err);
            alert("Failed to update order status.");
        }
    };

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Customer Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="space-y-4">
                    {orders.map(order => (
                        <div key={order._id} className="border p-4 rounded-lg shadow">
                            <p><strong>Customer:</strong> {order.user_id?.email}</p>
                            <div><strong>Product:</strong> <OrderedItem productID={order.
                                product_id} /></div>
                            <p><strong>Address:</strong> {order.address}, {order.city} - {order.postalCode}</p>
                            <p><strong>Phone:</strong> {order.phone}</p>
                            <p><strong>Note:</strong> {order.note || "N/A"}</p>
                            <p><strong>Payment:</strong> {order.paymentMethod}</p>
                            <p><strong>Status:</strong> <span className="capitalize">{order.status}</span></p>

                            <div className="mt-2 flex gap-2 flex-wrap">
                                {["preparing", "ready", "delivered", "cancel"].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => handleStatusChange(order._id, status)}
                                        className={`px-3 py-1 rounded text-white ${order.status === status
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-blue-500 hover:bg-blue-600"
                                            }`}
                                        disabled={order.status === status}
                                    >
                                        Set {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderInfo;
