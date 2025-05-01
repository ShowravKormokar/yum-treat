import { useContext } from "react";
import { FoodsContext } from "../../Context/FoodsContext";
import { useCategoryContext } from "../../Context/CategoryContext";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CartButton from "../../components/Cart/CartButton";

const FoodLists = () => {
    const navigate = useNavigate();
    const { foods, loading } = useContext(FoodsContext);
    const { selectedCategory } = useCategoryContext();

    const filteredFoods = selectedCategory
        ? foods.filter(food => food.category.toLowerCase() === selectedCategory.toLowerCase())
        : foods;

    const handleDetails = (foodId) => {
        // console.log('Edit food:', foodId); //for test
        navigate(`/product/${foodId}`);
    };

    if (loading) {
        return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
    }
    // console.log(filteredFoods);
    return (
        <section className="popular py-12 p-5 md:p-20" id="popular">
            <h2 className="text-3xl font-bold mb-2 text-center">
                {selectedCategory ? `${selectedCategory} Items` : "All Foods"}
            </h2>
            <p className="text-lg font-bold mb-10 text-center">
                {filteredFoods.length} Items Available
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                {filteredFoods.filter(food => food.isAvailable).length > 0 ? (
                    filteredFoods
                        .filter(food => food.isAvailable)
                        .map((food) => (
                            <div key={food._id} className="bg-gray-100 p-6 rounded-2xl text-center relative shadow-lg">
                                <div className="mb-4">
                                    <img src={`../src/assets/foods/${food.imageUrl}.png`} alt={food.name} className="h-40 mx-auto" />
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900">{food.name}</h3>

                                <div className="flex justify-center items-center gap-1 text-yellow-500 my-2">
                                    {[...Array(5)].map((_, index) => (
                                        <span key={`${food._id}-star-${index}`}>
                                            {food.rating === 0
                                                ? <FaRegStar />
                                                : (index < Math.floor(food.rating) ? <FaStar /> : <FaStarHalfAlt />)}
                                        </span>
                                    ))}
                                    <span className="text-gray-500 text-sm">({food.reviews || 0})</span>
                                </div>

                                <div className="text-lg font-bold text-gray-900">
                                    ${food.currentPrice || '0'} {!food.pastPrice == 0 && (
                                        <span className="text-gray-500 line-through text-sm ml-2">
                                            ${food.pastPrice}
                                        </span>
                                    )}
                                </div>


                                <CartButton food={food} />
                                {/* <CartButton food={food._id, food.name, food.imageUrl, food.currentPrice, food.isAvailable, food.customOrder} /> */}


                                <button
                                    onClick={() => handleDetails(food._id)}
                                    className="mt-4 bg-[#c34c2e] text-white px-4 py-2 rounded-lg hover:bg-black cursor-pointer"
                                >
                                    Details
                                </button>
                            </div>
                        ))
                ) : (
                    <p className="text-center col-span-full text-xl text-gray-500">No items available.</p>
                )}
            </div>
        </section>
    );
};

export default FoodLists;
