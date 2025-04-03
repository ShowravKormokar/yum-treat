import React from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Product = ({ products }) => {
    const { productId } = useParams();
    const product = products.find((item) => item.id === parseInt(productId));

    if (!product) {
        return <div className="text-center text-red-500 text-2xl mt-10">Product Not Found</div>;
    }

    // Function to generate star rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-yellow-500" />);
            } else if (i - 0.5 === rating) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-gray-400" />);
            }
        }
        return stars;
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Side: Product Image */}
                <div>
                    <img src={product.image} alt={product.title} className="w-full h-96 object-cover rounded-lg shadow-md" />
                </div>

                {/* Right Side: Product Details */}
                <div className="space-y-4">
                    <h2 className="text-4xl font-bold text-gray-800">{product.title}</h2>
                    <div className="flex items-center space-x-1">{renderStars(product.rating)}</div>
                    <p className="text-sm text-gray-500">Tags: {product.tags.join(", ")}</p>
                    <p className="text-gray-700">{product.description}</p>
                    <p className="text-2xl font-semibold text-orange-500">${product.price}</p>
                    <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition">Add to Cart</button>
                </div>
            </div>

            {/* Product Reviews */}
            <div className="mt-10">
                <h3 className="text-3xl font-semibold text-gray-800 mb-5">Customer Reviews</h3>
                {product.reviews.length > 0 ? (
                    product.reviews.map((review, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                            <div className="flex items-center space-x-2">
                                {renderStars(review.rating)}
                                <span className="text-gray-700 font-semibold">{review.user}</span>
                            </div>
                            <p className="text-gray-600 mt-2">{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default Product;
