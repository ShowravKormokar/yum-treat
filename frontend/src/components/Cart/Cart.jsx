import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router";

const Cart = ({ cartOpen, setCartOpen }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load cart and initialize quantities
    const loadCart = () => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const filteredCart = storedCart
            .filter(item => item.isAvailable !== false)
            .map(item => ({
                ...item,
                quantity: item.quantity || 1 // default to 1 if undefined
            }));
        setCartItems(filteredCart);
    };

    useEffect(() => {
        loadCart();

        const handleLogout = () => setCartItems([]);
        const handleCartUpdate = () => loadCart();

        window.addEventListener("userLoggedOut", handleLogout);
        window.addEventListener("cartUpdated", handleCartUpdate);

        return () => {
            window.removeEventListener("userLoggedOut", handleLogout);
            window.removeEventListener("cartUpdated", handleCartUpdate);
        };
    }, []);

    const updateQuantity = (id, newQuantity) => {
        const updatedCart = cartItems.map(item =>
            item._id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const removeItem = (id) => {
        const updatedCart = cartItems.filter(item => item._id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    if (!cartOpen) return null;

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const vatRate = 0.02;
    const withVat = total * (1 + vatRate);
    const includeVAT = withVat - total;

    return (
        <section className="fixed top-16 left-0 right-0 bg-white p-6 shadow-md z-40 overflow-auto max-h-[80vh]">
            <h3 className="text-2xl font-bold text-center pb-4 border-b">Your Cart</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
                {cartItems.length > 0 ? cartItems.map((item) => (
                    <div key={item._id} className="flex items-center justify-center bg-gray-100 p-4 rounded-lg relative">
                        <FaTimes
                            className="absolute top-2 right-2 text-lg cursor-pointer text-gray-600 hover:text-[#c34c2e]"
                            onClick={() => removeItem(item._id)}
                        />
                        <img src={`../src/assets/foods/${item.image}.png`} alt={item.name} className="h-auto w-20 object-cover" />
                        <div className="ml-4 w-full">
                            <h3 className="text-xl text-gray-800">{item.name}</h3>
                            <div className="flex items-center justify-between">
                                <p className="text-[#c34c2e] text-lg font-bold">${item.price}</p>
                                <div className="mt-2 flex items-center">
                                    <button
                                        className="px-2 py-1 bg-gray-300 rounded-l"
                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                    >-</button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                                        className="w-12 text-center border border-gray-300"
                                    />
                                    <button
                                        className="px-2 py-1 bg-gray-300 rounded-r"
                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                    >+</button>
                                </div>
                            </div>
                            <p className="text-sm mt-1 text-gray-600">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                )) : <p className="text-center text-gray-500">Your cart is empty</p>}
            </div>
            <div className="text-center py-4 border-t">
                <h3 className="text-xl font-bold">
                    Total + vat 2%: <span className="text-[#c34c2e]">
                        ${total.toFixed(2)} + ${includeVAT.toFixed(2)}
                    </span> = ${withVat.toFixed(2)}
                </h3>
                <NavLink
                    to="/checkout"
                    className="bg-[#c34c2e] text-white px-6 py-2 rounded-md inline-block mt-4"
                    onClick={() => setCartOpen(false)}
                >
                    Proceed to Checkout
                </NavLink>

            </div>
        </section>
    );
};

export default Cart;