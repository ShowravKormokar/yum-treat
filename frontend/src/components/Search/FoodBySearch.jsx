import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FoodsContext } from '../../Context/FoodsContext';
import ReviewStar from '../Reviews/ReviewStar';
import CartButton from '../Cart/CartButton';

const FoodBySearch = () => {
    const navigate = useNavigate();
    const { productName } = useParams();
    const { foods } = useContext(FoodsContext);

    const matchedFoods = foods.filter(food => {
        const nameMatch = food.name.toLowerCase() === productName.toLowerCase();
        const tagMatch = Array.isArray(food.tags) && food.tags.some(tag =>
            tag.toLowerCase().includes(productName.toLowerCase())
        );
        return nameMatch || tagMatch;
    });

    const handleDetails = (foodId) => {
        navigate(`/product/${foodId}`);
    };

    return (
        <div className="popular py-12 p-5 md:p-20">
            <h2 className="text-3xl font-semibold mb-6">
                Showing results for: <span className="text-[#c34c2e]">"{productName}"</span>
            </h2>

            {matchedFoods.length === 0 ? (
                <p className="text-gray-500">No food items matched your search.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {matchedFoods.map(food => (
                        <div key={food._id} className="bg-gray-100 p-6 rounded-2xl text-center relative shadow-lg">
                            <div className="mb-4">
                                <img src={`../src/assets/foods/${food.imageUrl}.png`} alt={food.name} className="h-40 mx-auto" />
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900">{food.name}</h3>

                            <div className="flex justify-center items-center gap-1 text-yellow-500 my-2">
                                <ReviewStar rating={food.rating} />
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
                            <button
                                onClick={() => handleDetails(food._id)}
                                className="mt-4 bg-[#c34c2e] text-white px-4 py-2 rounded-lg hover:bg-black cursor-pointer"
                            >
                                Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FoodBySearch;
