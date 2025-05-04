import React from "react";

const ReviewCard = ({ reviews }) => {
    if (!reviews.length) return <p>No reviews yet.</p>;

    return (
        <ul className="bg-white p-4 rounded-lg shadow-md mt-3">
            {reviews.map((review, index) => (
                <li key={index} className="border-b py-2">
                    {review.productID} - {review.rating} Stars - {review.feedback}
                </li>
            ))}
        </ul>
    );
};

export default ReviewCard;
