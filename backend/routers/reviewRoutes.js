import express from "express";
import { createReview, getUserReviews } from "../controllers/reviewController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/reviews/
router.post("/", verifyToken, createReview);

// GET /api/reviews/user/:userID
router.get("/user/:userID", verifyToken, getUserReviews);

export default router;
