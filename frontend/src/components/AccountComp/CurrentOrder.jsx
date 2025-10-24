import React, { useState, useEffect } from "react";
import { useAuthContext } from '../../Context/AuthContext';
import { useOrderContext } from "../../Context/OrderContext";
import OrderedItem from "../../components/Orders/OrderedItem";
import OrderBillTime from "../../components/Orders/OrderBillTime";
import apiF from "../../lib/api";

const CurrentOrder = () => {
    const { orders, refetchOrders } = useOrderContext();
    const { user } = useAuthContext();

    const [deliveredOrders, setDeliveredOrders] = useState([]);
    const [confirmedOrders, setConfirmedOrders] = useState([]);

    useEffect(() => {
        if (orders.length > 0) {
            setDeliveredOrders(orders.filter(order => order.status === "delivered"));
        }
    }, [orders]);

    // Order Cancel - Using apiF.patch
    const cancelOrder = async (orderId) => {
        try {
            const data = await apiF.patch(`/api/orders/cancel/${orderId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")}`
                }
            });

            alert('Order cancelled successfully!');
            refetchOrders(); // Refresh orders after cancellation
        } catch (err) {
            // console.error(err);
            alert('Error cancelling order');
        }
    };

    // Mark as Complete - Using apiF.patch
    const markAsComplete = async (orderId) => {
        try {
            const data = await apiF.patch(`/api/orders/complete/${orderId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")}`
                }
            });

            refetchOrders(); // Refetch orders to update the state
            setConfirmedOrders((prev) => [...prev, orderId]); // Add the completed order to confirmedOrders
        } catch (err) {
            console.error("Error:", err);
            alert(err.message || "Something went wrong while marking the order as complete.");
        }
    };

    if (!user || !orders) return <Loader />;

    return (
        <ul className="bg-white p-2 rounded-lg shadow-md mt-3">
            {[...orders]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .filter((order) => !order.isComplete && (order.status === "preparing" || order.status === "ready" || order.status === "delivered"))
                .map(order => (
                    <li key={order._id} className="p-2 mb-2 border-2 rounded-[4px] border-amber-500">
                        <div>
                            <OrderBillTime
                                orderTime={order.createdAt}
                                payed={order.payed}
                                orderID={order._id}
                            />
                        </div>
                        {user && order.products.map((product, index) => (
                            <React.Fragment key={product.product_id + index}>
                                <OrderedItem
                                    productID={product.product_id}
                                    quantity={product.quantity}
                                />
                            </React.Fragment>
                        ))}

                        <div className="flex items-center justify-evenly gap-8">
                            <h3>Status: {order.status}</h3>
                            <p>Note: {order.note}</p>
                        </div>

                        {order.status === "delivered" && !order.isComplete && (
                            <div className="mt-2 text-center">
                                <p className="mb-2">Have you received this order?</p>
                                <button
                                    onClick={() => markAsComplete(order._id)}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
                                >
                                    Yes, I received it
                                </button>
                            </div>
                        )}
                        {(order.status === 'preparing' || order.status === 'pending') && !order.isComplete && (
                            <button
                                onClick={() => cancelOrder(order._id)}
                                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Cancel Order
                            </button>
                        )}

                        {order.isComplete && order.status !== "cancel" && (
                            <div className=" text-green-700 font-semibold text-center mt-2">
                                <div className="flex items-center justify-evenly">
                                    <p>✅ Order marked as complete</p>
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
                            </div>
                        )}
                    </li>
                ))}
        </ul>
    )
}

export default CurrentOrder;