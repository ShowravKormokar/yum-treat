
import React, { useState, useEffect } from "react";

import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import food1 from "../../assets/image/food-1.png";
import food2 from "../../assets/image/food-2.png";
import food3 from "../../assets/image/food-3.png";
import food4 from "../../assets/image/food-4.png";
import food5 from "../../assets/image/food-5.png";
import food6 from "../../assets/image/food-6.png";
import food7 from "../../assets/image/food-7.png";
import food8 from "../../assets/image/food-8.png";

const popularFoods = [
    { id: 1, image: food1, name: "Delicious Food", price: 40, oldPrice: 50, rating: 4.5, reviews: 50 },
    { id: 2, image: food2, name: "Delicious Food", price: 40, oldPrice: 50, rating: 4.5, reviews: 50 },
    { id: 3, image: food3, name: "Delicious Food", price: 40, oldPrice: 50, rating: 4.5, reviews: 50 },
    { id: 4, image: food4, name: "Delicious Food", price: 40, oldPrice: 50, rating: 4.5, reviews: 50 },
    { id: 5, image: food5, name: "Delicious Food", price: 40, oldPrice: 50, rating: 5.0, reviews: 50 },
    { id: 6, image: food6, name: "Delicious Food", price: 40, oldPrice: 50, rating: 4.5, reviews: 50 },
    { id: 7, image: food7, name: "Delicious Food", price: 40, oldPrice: 50, rating: 4.5, reviews: 50 },
    { id: 8, image: food8, name: "Delicious Food", price: 40, oldPrice: 50, rating: 4.5, reviews: 50 },
];

const Popular = () => {

    const [cart, setCart] = useState([]);

    const addToCart = async (food) => {
        const updatedCart = [...cart, food];
        setCart(updatedCart);
        await fetch("../Cart/Cart.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCart),
        });
    };


    return (
        <section className="popular py-12 p-5 md:p-20" id="popular">
            <div className="text-center mb-8">
                <span className="text-lg text-[#c34c2e] uppercase font-[cursive]">Popular Food</span>
                <h3 className="text-3xl font-bold text-gray-800">Our Special Dishes</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                {popularFoods.map((food) => (
                    <div key={food.id} className="bg-gray-100 p-6 rounded-2xl text-center relative shadow-lg">

                        <div className="mb-4">
                            <img src={food.image} alt={food.name} className="h-40 mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{food.name}</h3>
                        <div className="flex justify-center items-center gap-1 text-yellow-500 my-2">
                            {[...Array(5)].map((_, index) => (
                                <span key={index}>
                                    {index < Math.floor(food.rating) ? <FaStar /> : <FaStarHalfAlt />}
                                </span>
                            ))}
                            <span className="text-gray-500 text-sm">({food.reviews})</span>
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                            ${food.price}.00 <span className="text-gray-500 line-through text-sm">${food.oldPrice}.00</span>
                        </div>
                        <button
                            className="mt-4 bg-[#c34c2e] text-white px-4 py-2 rounded-lg hover:bg-black cursor-pointer"
                            onClick={() => addToCart(food)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Popular;



// import React, { useState, useEffect } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// import food1 from "../../assets/image/food-1.png";
// import food2 from "../../assets/image/food-2.png";
// import food3 from "../../assets/image/food-3.png";
// import food4 from "../../assets/image/food-4.png";
// import food5 from "../../assets/image/food-5.png";
// import food6 from "../../assets/image/food-6.png";
// import food7 from "../../assets/image/food-7.png";
// import food8 from "../../assets/image/food-8.png";

// const popularFoods = [
//     { id: 1, image: food1, name: "Delicious Food", price: 40, oldPrice: 50, rating: 4.5, reviews: 50 },
//     { id: 2, image: food2, name: "Delicious Food", price: 40, oldPrice: 50, rating: 4.5, reviews: 50 },
//     { id: 3, image: food3, name: "Delicious Food", price: 40, oldPrice: 50, rating: 4.5, reviews: 50 },
//     { id: 4, image: food4, name: "Delicious Food", price: 40, oldPrice: 50, rating: 4.5, reviews: 50 },
//     { id: 5, image: food5, name: "Delicious Food", price: 40, oldPrice: 50, rating: 5.0, reviews: 50 },
//     { id: 6, image: food6, name: "Delicious Food", price: 40, oldPrice: 50, rating: 4.5, reviews: 50 },
//     { id: 7, image: food7, name: "Delicious Food", price: 40, oldPrice: 50, rating: 4.5, reviews: 50 },
//     { id: 8, image: food8, name: "Delicious Food", price: 40, oldPrice: 50, rating: 4.5, reviews: 50 },
// ];

// const Popular = () => {
//     const [cart, setCart] = useState(() => {
//         return JSON.parse(localStorage.getItem("cart")) || [];
//     });

//     const addToCart = (food) => {
//         const updatedCart = [...cart, food];
//         setCart(updatedCart);
//         localStorage.setItem("cart", JSON.stringify(updatedCart));
//     };

//     return (
//         <section className="popular py-12 p-5 md:p-20" id="popular">
//             <div className="text-center mb-8">
//                 <span className="text-lg text-[#c34c2e] uppercase">Popular Food</span>
//                 <h3 className="text-3xl font-bold text-gray-800">Our Special Dishes</h3>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
//                 {popularFoods.map((food) => (
//                     <div key={food.id} className="bg-gray-100 p-6 rounded-2xl text-center relative shadow-lg">
//                         <div className="mb-4">
//                             <img src={food.image} alt={food.name} className="h-40 mx-auto" />
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-900">{food.name}</h3>
//                         <div className="flex justify-center items-center gap-1 text-yellow-500 my-2">
//                             {[...Array(5)].map((_, index) => (
//                                 <span key={index}>
//                                     {index < Math.floor(food.rating) ? <FaStar /> : <FaStarHalfAlt />}
//                                 </span>
//                             ))}
//                             <span className="text-gray-500 text-sm">({food.reviews})</span>
//                         </div>
//                         <div className="text-lg font-bold text-gray-900">
//                             ${food.price}.00 <span className="text-gray-500 line-through text-sm">${food.oldPrice}.00</span>
//                         </div>
//                         <button
//                             className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-black"
//                             onClick={() => addToCart(food)}
//                         >
//                             Add to Cart
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default Popular;



