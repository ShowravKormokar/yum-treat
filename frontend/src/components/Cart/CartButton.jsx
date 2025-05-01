import React from "react";
import { useAuthContext } from "../../Context/AuthContext";

const CartButton = ({ food }) => {
    const { isLoggedIn } = useAuthContext();

    const handleAddToCart = () => {
        if (!isLoggedIn || !food || !food._id) return;

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        // const cart = "";

        // ✅ Check if item already exists
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
        console.log(updatedCart);
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={!isLoggedIn}
            className={`mt-4 mr-2 px-4 py-2 rounded-lg text-white ${isLoggedIn ? 'bg-[#c34c2e] hover:bg-black' : 'bg-gray-400 cursor-not-allowed'
                }`}
        >
            Add to Cart
        </button>
    );
};

export default CartButton;
