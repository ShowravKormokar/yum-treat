import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCategoryContext } from "../../Context/CategoryContext";

const Category = () => {
    const { categories, loading, setSelectedCategory } = useCategoryContext();
    const navigate = useNavigate();
    const location = useLocation();

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);

        // Navigate to /menu if not already there
        if (location.pathname !== "/menus") {
            navigate(`/menus`);
        }
        // If already on /menu, just update the state (no navigation needed)
    };

    if (loading) return <p className="text-center py-20 text-xl">Loading categories...</p>;

    return (
        <section className="grid grid-cols-2 p-5 md:p-20 sm:grid-cols-3 lg:grid-cols-6 gap-6 pb-20">
            {categories.map((category) => (
                <div
                    key={category._id}
                    onClick={() => handleCategoryClick(category.name)}
                    className="cursor-pointer box p-2 md:p-6 text-center rounded-lg bg-gray-100 hover:bg-[#c34c2e] transition-colors duration-400"
                >
                    <img src={`../src/assets/image/${category.img}.png`} alt={category.name} className="md:h-24 mx-auto" />
                    <h3 className="text-2xl text-gray-900 hover:text-white md:mt-3">{category.name}</h3>
                </div>
            ))}
        </section>
    );
};

export default Category;
