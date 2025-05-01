const express = require("express");
const {
    placeOrder,
    getAllOrders,
    getUserOrders,
    updateOrderStatus
} = require("../controllers/orderController");
const jwtAuthMiddleware = require("../middlewares/jwtAuthMiddlewares");

const router = express.Router();

// Place an order (Authenticated user)
router.post("/place", jwtAuthMiddleware, placeOrder);

// Get all orders (Assuming admin-check is inside controller or another middleware)
router.get("/admin", jwtAuthMiddleware, getAllOrders);

// Get orders of the logged-in user
router.get("/my-orders", jwtAuthMiddleware, getUserOrders);

// Update status of an order (Admin only — should be validated inside controller or separate middleware)
router.patch("/update-status/:id", jwtAuthMiddleware, updateOrderStatus);

module.exports = router;