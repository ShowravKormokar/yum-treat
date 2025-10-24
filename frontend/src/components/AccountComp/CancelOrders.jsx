import { useMemo } from 'react';
import { useAuthContext } from '../../Context/AuthContext';
import { useOrderContext } from "../../Context/OrderContext";
import OrderedItem from "../../components/Orders/OrderedItem";
import OrderBillTime from "../../components/Orders/OrderBillTime";

const CancelOrders = () => {
    const { orders } = useOrderContext();
    const { user } = useAuthContext();

    // Memoized filtered and sorted orders
    const filteredOrders = useMemo(() => {
        return [...orders]
            .filter(order => !order.isComplete && order.status === "cancel")
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [orders]);

    // Early return for better readability
    if (!user) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md mt-3 text-center">
                <p className="text-gray-500">Please log in to view your orders</p>
            </div>
        );
    }

    if (filteredOrders.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md mt-3 text-center">
                <p className="text-gray-500">No cancelled orders found</p>
            </div>
        );
    }

    return (
        <ul className="bg-white p-2 rounded-lg shadow-md mt-3" role="list">
            {filteredOrders.map(order => (
                <li
                    key={order._id}
                    className="p-4 mb-3 border-2 rounded-lg border-red-300 bg-red-50"
                    data-testid="cancelled-order-item"
                >
                    <OrderBillTime
                        orderTime={order.createdAt}
                        payed={order.payed}
                        orderID={order._id}
                    />

                    <div className="mt-3">
                        {order.products.map((product, index) => (
                            <OrderedItem
                                key={`${order._id}-${product.product_id}-${index}`}
                                productID={product.product_id}
                                quantity={product.quantity}
                            />
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3 p-3 bg-white rounded border">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">Status:</span>
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">
                                {order.status}
                            </span>
                        </div>
                        {order.note && (
                            <div className="flex items-start gap-2">
                                <span className="font-semibold whitespace-nowrap">Note:</span>
                                <p className="text-gray-600 text-sm">{order.note}</p>
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default CancelOrders;