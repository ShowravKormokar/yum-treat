import React, { useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";

const CartButton = ({ food }) => {
    const { isLoggedIn } = useAuthContext();
    const [showNotification, setShowNotification] = useState(false);

    const handleAddToCart = () => {
        if (!isLoggedIn || !food || !food._id) return;

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if item already exists
        const alreadyExists = cart.some(item => item._id === food._id);
        if (alreadyExists) return;

        const newItem = {
            _id: food._id,
            name: food.name,
            price: food.currentPrice,
            image: food.imageUrl,
            isAva: food.isAvailable,
            isCus: food.customOrder
        };

        const updatedCart = [...cart, newItem];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));

        // Show notification and set timeout to hide it
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    return (
        <div className="relative">
            <button
                onClick={handleAddToCart}
                disabled={!isLoggedIn}
                className={`mt-4  px-4 py-2 rounded-lg w-full text-white ${isLoggedIn
                    ? 'bg-[#c34c2e] hover:bg-black'
                    : 'bg-gray-400 cursor-not-allowed'
                    }`}
            >
                Add to Cart
            </button>

            {showNotification && (
                <div className="absolute top-[-50px] left-1 ml-2 px-3 py-2 bg-green-500 text-white rounded-lg shadow-lg">
                    Item added
                </div>
            )}
        </div>
    );
};

export default CartButton;