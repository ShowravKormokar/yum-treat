const { addReview,
    getReviewsByUser,
    getReviewsByProduct,
    getAllReviews } = require('../controller/reviewController.js');
const verifyToken = require("../middlewares/jwtAuthMiddlewares.js");

const express = require("express");
const router = express.Router();

// POST /api/reviews/
router.post("/", verifyToken, addReview);

// GET /api/reviews/user/:userID
router.get("/user/:userID", verifyToken, getReviewsByUser);

// Get reviews by product id
router.get("/product/:productID", verifyToken, getReviewsByProduct);

//Get all reviews (For Admin)
router.get("/", verifyToken, getAllReviews);

module.exports = router;
