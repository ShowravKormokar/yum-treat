import React, { useState } from 'react';
import ReviewForm from './ReviewForm';
import UserReviewCard from './UserReviewCard';

const Review = ({ orderID, userID, productID, orderCompleteDate, isComplete }) => {
    const [showForm, setShowForm] = useState(false);

    if (orderID && userID) {
        return (
            <div className="mt-4">
                <UserReviewCard userID={userID}/>
            </div>
        );
    }

    return (
        <div className="mt-4">
            {isComplete && !showForm && (
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => setShowForm(true)}
                >
                    Post Review
                </button>
            )}

            {isComplete && showForm && (
                <ReviewForm
                    orderID={orderID}
                    userID={userID}
                    productID={productID}
                    orderCompleteDate={orderCompleteDate}
                />
            )}
        </div>
    );
};

export default Review;
