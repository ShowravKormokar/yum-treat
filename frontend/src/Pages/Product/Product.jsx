import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink, Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import CartButton from "../../components/Cart/CartButton";
import ReviewStar from "../../components/Reviews/ReviewStar";
import { useReviewContext } from "../../Context/ReviewContext";
import { useAuthContext } from "../../Context/AuthContext";
import ProductReviewCard from "../../components/Reviews/ProductReviewCard";

const Product = () => {
    const { id } = useParams();
    const { reviews, loading, fetchReviewsByProduct } = useReviewContext();
    const { user } = useAuthContext();

    const [foodData, setFoodData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        rating: 0,
        numberOfReviews: 0,
        currentPrice: 0,
        pastPrice: 0,
        category: '',
        tags: [],
        customOrder: false,
        isAvailable: true
    });

    // Fetch food details
    useEffect(() => {
        const fetchFood = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/foods/${id}`);
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                const data = await res.json();
                setFoodData(data);
                fetchReviewsByProduct(data._id);
            } catch (error) {
                console.error('Error fetching food:', error);
            }
        };
        fetchFood();
    }, [id]);

    if (!foodData || !foodData.name) {
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

    // console.log(reviews);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 md:mt-20 mt-10">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Side: Product Image */}
                <div>
                    <img src={new URL(`../../assets/foods/${foodData.imageUrl}.png`, import.meta.url).href} alt={foodData.name} className="w-[80%] h-auto object-cover " />
                </div>

                {/* Right Side: Product Details */}
                <div className="space-y-4">
                    <h2 className="text-4xl font-bold text-gray-800">{foodData.name}</h2>
                    <div className="flex items-center space-x-1"><ReviewStar rating={foodData.rating} /></div>
                    <p className="text-sm text-gray-500">Tags: {foodData.tags.join(", ")}</p>
                    <p className="text-gray-700">{foodData.description}</p>
                    <p className="text-2xl font-semibold text-orange-500">${foodData.currentPrice || '0'} {!foodData.pastPrice == 0 && (
                        <span className="text-gray-500 line-through text-sm ml-2">
                            ${foodData.pastPrice}
                        </span>
                    )}</p>
                    <div className="flex flex-col text-center">
                        <CartButton
                            food={foodData}
                        />
                        <Link
                            to="/checkout"
                            className=" w-full bg-black text-white mt-4 px-4 py-2 rounded-lg hover:bg-white hover:text-black border-2"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>

                </div>

            </div>

            {/* Product Reviews */}
            <ProductReviewCard reviews={reviews} />
        </div>
    );
};

export default Product;
