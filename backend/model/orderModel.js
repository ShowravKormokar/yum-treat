import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userSignUp", // Adjust if your user model name is different
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food", // Adjust based on your food model name
        required: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    postalCode: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    note: {
        type: String,
        default: "",
        trim: true
    },
    paymentMethod: {
        type: String,
        enum: ["card", "cash"],
        default: "card"
    },
    status: {
        type: String,
        enum: ["preparing", "ready"],
        default: "preparing"
    }
}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
