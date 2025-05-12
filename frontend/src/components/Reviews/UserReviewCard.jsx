import React, { useEffect } from "react";
import { useReviewContext } from "../../Context/ReviewContext";
import ReviewStar from "./ReviewStar";

const UserReviewCard = ({ userID, productID, orderID }) => {
    const { reviews, loading, fetchReviewsByUser } = useReviewContext();

    useEffect(() => {
        if (userID) {
            fetchReviewsByUser(userID);
        }
    }, [userID]);

    if (loading) return <p>Loading reviews...</p>;
    if (!reviews.length) return <p>No reviews yet.</p>;

    return (
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 mt-3  mx-auto">
            <h3 className="text-[#c34c2e] font-medium text-lg mb-3">Your Reviews</h3>
            <div className="space-y-3">
                {reviews
                    .filter((review) => review.productID === productID && review.orderID===orderID)
                    .map((review, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <ReviewStar rating={review.rating} />
                                <p className="text-gray-600 mt-1 text-sm italic">
                                    "{review.feedback}"
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default UserReviewCard;
