const Review = require('../model/reviewModel');
// Add review
const addReview = async (req, res) => {
    try {
        const { userID, productID, orderID, rating, feedback, orderCompletedAt } = req.body;

        const review = new Review({ userID, productID, orderID, rating, feedback, orderCompletedAt });
        const saved = await review.save();

        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ error: "Failed to add review." });
    }
};

// Get reviews by user ID
const getReviewsByUser = async (req, res) => {
    try {
        const reviews = await Review.find({ userID: req.params.userID }).populate("productID");
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user reviews." });
    }
};

// Get reviews by product ID
const getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await Review.find({ productID: req.params.productID }).populate("userID");
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch product reviews." });
    }
};

// Get all reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate("userID").populate("productID");
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch all reviews." });
    }
};

module.exports = { addReview, getReviewsByUser, getReviewsByProduct, getAllReviews };