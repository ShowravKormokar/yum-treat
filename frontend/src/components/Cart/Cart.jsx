import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const Cart = ({ cartOpen, setCartOpen }) => {
    const [cartItems, setCartItems] = useState([]);

    // Sync cart from localStorage
    const loadCart = () => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const filteredCart = storedCart.filter(item => item.isAvailable);
        setCartItems(filteredCart);
    };

    useEffect(() => {
        const handleLogout = () => {
            setCartItems([]); // Clear cart in UI
        };

        window.addEventListener("userLoggedOut", handleLogout);
        return () => window.removeEventListener("userLoggedOut", handleLogout);
    }, []);
    
    const removeItem = (id) => {
        const updatedCart = cartItems.filter(item => item._id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    if (!cartOpen) return null;

    const total = cartItems.reduce((acc, item) => acc + item.currentPrice, 0);

    return (
        <section className="fixed top-16 left-0 right-0 bg-white p-6 shadow-md z-40 overflow-auto max-h-[80vh]">
            <h3 className="text-2xl font-bold text-center pb-4 border-b">Your Cart</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
                {cartItems.length > 0 ? cartItems.map((item) => (
                    <div key={item._id} className="flex items-center bg-gray-100 p-4 rounded-lg relative">
                        <FaTimes
                            className="absolute top-2 right-2 text-lg cursor-pointer text-gray-600 hover:text-[#c34c2e]"
                            onClick={() => removeItem(item._id)}
                        />
                        <img src={`../src/assets/foods/${item.imageUrl}.png`} alt={item.name} className="h-16 w-16 object-cover" />
                        <div className="ml-4">
                            <h3 className="text-xl text-gray-800">{item.name}</h3>
                            <p className="text-[#c34c2e] text-lg font-bold">${item.currentPrice}.00</p>
                        </div>
                    </div>
                )) : <p className="text-center text-gray-500">Your cart is empty</p>}
            </div>
            <div className="text-center py-4 border-t">
                <h3 className="text-xl">Total: <span className="text-[#c34c2e]">${total.toFixed(2)}</span></h3>
                <a href="#" className="bg-[#c34c2e] text-white px-6 py-2 rounded-md inline-block mt-4">Proceed to Checkout</a>
            </div>
        </section>
    );
};

export default Cart;
