const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        trim: true
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
    products: [
        {
            product_id: {
                type: String,
                required: true,
                trim: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    payed: {
        type: String,
        required: true,
        trim: true
    },
    paymentMethod: {
        type: String,
        enum: ["card", "cash"],
        default: "card"
    },
    status: {
        type: String,
        enum: ["preparing", "ready", "cancel", "delivered"],
        default: "preparing"
    },
    isComplete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);