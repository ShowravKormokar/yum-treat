import Review from "../model/reviewModel";

// Create a review
const createReview = async (req, res) => {
    try {
        const { orderID, userID, productID, rating, feedback, orderCompleteDate } = req.body;

        if (!orderID || !userID || !productID || !rating || !feedback || !orderCompleteDate) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const review = await Review.create({
            orderID,
            userID,
            productID,
            rating,
            feedback,
            orderCompleteDate
        });

        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ error: "Failed to create review" });
    }
};

// Get reviews by user
const getUserReviews = async (req, res) => {
    try {
        const { userID } = req.params;
        const reviews = await Review.find({ userID }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
};

module.exports = { createReview, getUserReviews };