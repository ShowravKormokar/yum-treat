const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    orderID: {
        type: String,
        trim: true,
        required: true
    },
    userID: {
        type: String,
        trim: true,
        required: true
    },
    productID: {
        type: String,
        trim: true,
        required: true
    },
    rating: {
        type: String,
        required: true,
        min: 1,
        max: 5
    },
    feedback: {
        type: String,
        required: true,
        trim: true
    },
    orderCompleteDate: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;