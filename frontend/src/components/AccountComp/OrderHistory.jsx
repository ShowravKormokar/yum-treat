import { useAuthContext } from '../../Context/AuthContext';
import { useOrderContext } from "../../Context/OrderContext";
import OrderedItem from "../../components/Orders/OrderedItem";
import Review from "../../components/Reviews/Review";
import OrderBillTime from "../../components/Orders/OrderBillTime";

const OrderHistory = () => {
    const { orders } = useOrderContext();
    const { user } = useAuthContext();

    return (
        <ul className="bg-white p-2 rounded-lg shadow-md mt-3">
            {[...orders]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .filter((order) => order.isComplete)
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
                                {order.isComplete && (
                                    <Review
                                        orderID={order._id}
                                        userID={user._id}
                                        productID={product.product_id}
                                        orderCompleteDate={order.updatedAt}
                                        isComplete={order.isComplete}
                                    />
                                )}
                            </React.Fragment>
                        ))}

                        <div className="flex items-center justify-evenly gap-8">
                            <h3>Status: {order.status}</h3>
                            <p>Note: {order.note}</p>
                        </div>
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

export default OrderHistory