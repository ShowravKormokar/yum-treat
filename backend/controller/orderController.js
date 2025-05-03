const Order = require('../model/orderModel')

// Place a new order
const placeOrder = async (req, res) => {
    try {
        const {
            user_id,
            product_id,
            fullName,
            address,
            city,
            postalCode,
            phone,
            note,
            paymentMethod,
            isComplete
        } = req.body;

        const newOrder = new Order({
            user_id,
            product_id,
            fullName,
            address,
            city,
            postalCode,
            phone,
            note,
            paymentMethod,
            isComplete
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ error: "Failed to place order" });
    }
};

// Get all orders (Admin)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate({ path: "user_id", select: "email" })
            .populate({ path: "product_id", select: "name" });

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

// Get orders for a specific user
const getUserOrders = async (req, res) => {
    try {
        const user_id = req.user?._id || req.jwtPayload?.userId; // fallback for flexibility

        if (!user_id) {
            return res.status(401).json({ error: "Unauthorized: No user ID found" });
        }

        const orders = await Order.find({ user_id }).populate("product_id");
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ error: "Failed to fetch your orders" });
    }
};


// Update order status (Admin)
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["preparing", "ready", "cancel", "delivered"].includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json({ message: "Order status updated", order: updatedOrder });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ error: "Failed to update order status" });
    }
};

// Confirm order as complete (Customer action)
const markOrderAsComplete = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { isComplete: true },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json({ message: "Order marked as complete", order: updatedOrder });
    } catch (error) {
        console.error("Error marking order as complete:", error);
        res.status(500).json({ error: "Failed to complete order" });
    }
};

module.exports = { placeOrder, getAllOrders, getUserOrders, updateOrderStatus, markOrderAsComplete };