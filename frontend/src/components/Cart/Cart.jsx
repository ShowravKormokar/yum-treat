import { FaTimes } from "react-icons/fa";

const Cart = ({ cartOpen, setCartOpen }) => {
    if (!cartOpen) return null;

    return (
        <section className="fixed top-20 left-0 right-0 bg-white p-6 shadow-md z-40 overflow-auto max-h-[80vh]">
            <h3 className="text-2xl font-bold text-center pb-4 border-b">Your Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-center bg-gray-100 p-4 rounded-lg relative">
                        <FaTimes
                            className="absolute top-2 right-2 text-lg cursor-pointer text-gray-600 hover:text-[#c34c2e]"
                            onClick={() => setCartOpen(false)}
                        />
                        <div className="ml-4">
                            <h3 className="text-xl text-gray-800">Delicious Food</h3>
                            <p className="text-gray-600">Quantity: <input type="number" className="border p-1 w-16 text-center" defaultValue={1} /></p>
                            <p className="text-[#c34c2e] text-lg font-bold">$40.00</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center py-4 border-t">
                <h3 className="text-xl">Subtotal: <span className="text-[#c34c2e]">$200</span></h3>
                <h3 className="text-xl">Total: <span className="text-[#c34c2e]">$200</span></h3>
                <a href="#" className="bg-[#c34c2e] text-white px-6 py-2 rounded-md inline-block mt-4">Proceed to Checkout</a>
            </div>
        </section>
    );
};

export default Cart;
