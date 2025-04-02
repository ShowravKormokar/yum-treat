import React from "react";
import { Link } from "react-router-dom";
import cat1 from "../../assets/image/cat-1.png";
import cat2 from "../../assets/image/cat-2.png";
import cat3 from "../../assets/image/cat-3.png";
import cat4 from "../../assets/image/cat-4.png";
import cat5 from "../../assets/image/cat-5.png";
import cat6 from "../../assets/image/cat-6.png";

const categories = [
    { id: 1, name: "Combo", img: cat1 },
    { id: 2, name: "Pizza", img: cat2 },
    { id: 3, name: "Burger", img: cat3 },
    { id: 4, name: "Chicken", img: cat4 },
    { id: 5, name: "Dinner", img: cat5 },
    { id: 6, name: "Coffee", img: cat6 },
];

const Category = () => {
    return (
        <section className="grid grid-cols-2 p-5 md:p-20 sm:grid-cols-3 lg:grid-cols-6 gap-6 pb-20">
            {categories.map((category) => (
                <Link
                    to="#"
                    key={category.id}
                    className="box p-2 md:p-6 text-center rounded-lg bg-gray-100 hover:bg-[#c34c2e] transition-colors duration-400"
                >
                    <img src={category.img} alt={category.name} className="md:h-24 mx-auto" />
                    <h3 className="text-2xl text-gray-900 hover:text-white md:mt-3">{category.name}</h3>
                </Link>

            ))}
        </section>
    );
};

export default Category;
