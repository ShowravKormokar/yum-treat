import { useContext } from "react";
import { FoodsContext } from "../../Context/FoodsContext";
import CartButton from "../Cart/CartButton";
import ReviewStar from "../Reviews/ReviewStar";


const Popular = () => {

    const { foods, loading } = useContext(FoodsContext);

    if (loading) {
        return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
    }


    return (
        <section className="popular py-12 p-5 md:p-20" id="popular">
            <div className="text-center mb-8">
                <span className="text-lg text-[#c34c2e] uppercase font-[cursive]">Popular Food</span>
                <h3 className="text-3xl font-bold text-gray-800">Our Special Dishes</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                {foods
                    .filter(food => food.isAvailable && food.isPopular)
                    .map((food) => (
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
                    )
                    )}
            </div>
        </section>
    );
};

export default Popular;