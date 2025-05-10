import React from 'react';
import { useOrderContext } from '../../Context/OrderContext';

const CurrentOrders = ({ limit = 5 }) => {
    const { aOrders } = useOrderContext();

    // Filter orders that are not completed and not canceled
    const pendingOrders = Array.isArray(aOrders)
        ? aOrders.filter(order =>
            order.isComplete === false &&
            order.status !== "cancel"
        )
        : [];

    if (pendingOrders.length === 0) {
        return (
            <div className="text-center py-4 text-gray-500">
                No pending orders available
            </div>
        );
    }

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {pendingOrders.slice(0, limit).map((order) => (
                    <tr key={order._id || Math.random()}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{order._id ? order._id.toString().slice(-6) : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.fullName || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${order.payed || '0'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                {order.status || 'Pending'}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CurrentOrders;