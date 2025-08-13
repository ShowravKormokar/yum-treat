import { useAuthContext } from '../../Context/AuthContext';
import { useOrderContext } from "../../Context/OrderContext";
import OrderedItem from "../../components/Orders/OrderedItem";
import OrderBillTime from "../../components/Orders/OrderBillTime";

const CancelOrders = () => {
    const { orders, refetchOrders } = useOrderContext();
    const { user } = useAuthContext();

    return (
        <ul className="bg-white p-2 rounded-lg shadow-md mt-3">
            {[...orders]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .filter((order) => !order.isComplete && (order.status === "cancel"))
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
                            <OrderedItem
                                productID={product.product_id}
                                quantity={product.quantity}
                            />
                        ))}

                        <div className="flex items-center justify-evenly gap-8">
                            <h3>Status: {order.status}</h3>
                            <p>Note: {order.note}</p>
                        </div>


                    </li>
                ))}
        </ul>
    )
}

export default CancelOrders;