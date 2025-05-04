import React, { useEffect } from "react";
import { useReviewContext } from "../../Context/ReviewContext";

const UserReviewCard = ({ userID}) => {
    const { reviews, loading, fetchReviewsByUser } = useReviewContext();

    useEffect(() => {
        if (userID) {
            fetchReviewsByUser(userID);
        }
    }, [userID]);

    if (loading) return <p>Loading reviews...</p>;
    if (!reviews.length) return <p>No reviews yet.</p>;

    return (
        <ul className="bg-white p-4 rounded-lg shadow-md mt-3">
            {reviews.map((review, index) => (
                <li key={index} className="border-b py-2">
                    Product: {review.productID} — {review.rating} Stars — "{review.feedback}"
                </li>
            ))}
        </ul>
    );
};

export default UserReviewCard;
