import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        phone: "",
        note: "",
        paymentMethod: "card",
    });

    const navigate = useNavigate();
    const { user, isLoggedIn } = useAuthContext(); 

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
        if (storedCart.length === 0) navigate("/"); // redirect if cart is empty
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        if (!token) {
            console.error("Token not found in localStorage or sessionStorage");
            return;
        }

        try {
            for (const item of cartItems) {
                const response = await fetch("http://localhost:5000/api/orders/place", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        ...formData,
                        user_id: user._id,
                        product_id: item._id,
                        quantity: item.quantity || 1
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    console.error("Failed to place order for", item.name, data.message);
                }
            }

            localStorage.removeItem("cart");
            window.dispatchEvent(new Event("cartUpdated"));
            navigate("/thank-you");

        } catch (error) {
            console.error("Order submission error:", error);
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    const vat = subtotal * 0.02;
    const total = subtotal + vat;

    // Optionally, redirect if not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);
    // console.log(formData);

    return (
        <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8 my-20">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full border rounded px-4 py-2"
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border rounded px-4 py-2"
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border rounded px-4 py-2"
                />
                <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full border rounded px-4 py-2"
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border rounded px-4 py-2"
                />
                <textarea
                    name="note"
                    placeholder="Any query or information or note"
                    value={formData.note}
                    onChange={handleInputChange}
                    className="w-full border rounded px-4 py-2"
                ></textarea>
                <h2 className="text-xl font-semibold mt-6">Payment Method</h2>
                <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full border rounded px-4 py-2"
                >
                    <option value="card">Credit/Debit Card</option>
                    <option value="cash">Cash on Delivery</option>
                    <option value="bkash">Bkash</option>
                </select>
                <button
                    type="submit"
                    className="w-full bg-[#c34c2e] text-white py-3 rounded mt-4 font-semibold hover:bg-[#a93c22] transition"
                >
                    Place Order
                </button>
            </form>

            <div className="bg-gray-100 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                {cartItems.map(item => (
                    <div key={item._id} className="flex justify-between border-b py-2">
                        <span>{item.name} x {item.quantity || 1}</span>
                        <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                    </div>
                ))}
                <div className="mt-4">
                    <div className="flex justify-between font-semibold">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>VAT (2%):</span>
                        <span>${vat.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold mt-2">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
