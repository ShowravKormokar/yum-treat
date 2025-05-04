import React, { useState } from "react";

const ReviewForm = ({ orderID, userID, productID, orderCompleteDate, onReviewSubmit }) => {
    const [review, setReview] = useState({ rating: 0, feedback: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReview = {
            orderID,
            userID,
            productID,
            rating: review.rating,
            feedback: review.feedback,
            date: orderCompleteDate,
        };
        onReviewSubmit(newReview);
        setReview({ rating: 0, feedback: "" });
    };
    console.log(review);

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mt-3">
            <input
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Rating (1-5)"
                value={review.rating}
                onChange={(e) => setReview({ ...review, rating: e.target.value })}
                min="1"
                max="5"
                required
            />
            <textarea
                className="w-full p-2 border rounded mt-3"
                placeholder="Short feedback"
                value={review.feedback}
                onChange={(e) => setReview({ ...review, feedback: e.target.value })}
                required
            />
            <button className="mt-4 px-4 py-2 bg-[#c34c2e] text-white rounded-lg" type="submit">
                Submit Review
            </button>
        </form>
    );
};

export default ReviewForm;
