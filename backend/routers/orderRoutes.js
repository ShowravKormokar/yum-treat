const express = require("express");
const {
    placeOrder,
    getAllOrders,
    getUserOrders,
    updateOrderStatus,
    markOrderAsComplete,
    cancelOrder
} = require("../controller/orderController");
const jwtAuthMiddleware = require("../middlewares/jwtAuthMiddlewares");

const router = express.Router();

// Place an order (Authenticated user)
router.post("/place", jwtAuthMiddleware, placeOrder);

// Get all orders (Assuming admin-check is inside controller or another middleware)
router.get("/admin", getAllOrders);

// Get orders of the logged-in user
router.get("/my-orders", jwtAuthMiddleware, getUserOrders);

// Update status of an order (Admin only — should be validated inside controller or separate middleware)
router.patch("/update-status/:id", updateOrderStatus);

// Cancel order route
router.patch('/cancel/:id', cancelOrder);

// Mark order as complete (Customer confirms delivery)
router.patch("/complete/:id", jwtAuthMiddleware, markOrderAsComplete);

module.exports = router;