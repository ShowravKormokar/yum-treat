const OrderCards = ({ orders = [], handleAcceptOrder, handleReadyForDelivery }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Current Orders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders.length > 0 ? (orders?.map(order => (
                    <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{order.customer}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                                }`}>
                                {order.status}
                            </span>
                        </div>
                        <ul className="list-disc list-inside mb-3 text-sm text-gray-600">
                            {order.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                        <div className="flex justify-between items-center">
                            <p className="font-bold">${order.total.toFixed(2)}</p>
                            <div className="space-x-2">
                                {order.status === 'pending' && (
                                    <button
                                        onClick={() => handleAcceptOrder(order.id)}
                                        className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Accept
                                    </button>
                                )}
                                <button
                                    onClick={() => handleReadyForDelivery(order.id)}
                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                                >
                                    Ready
                                </button>
                            </div>
                        </div>
                    </div>
                ))) : (<div className="col-span-full text-center py-8 text-gray-500">
                    No statistics data available
                </div>)}

            </div>
        </div>
    );
};

export default OrderCards;