const mongoose = require('mongoose');

//food schema
const foodSchema = new mongoose.Schema({
    foodID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    foodName: { type: String, required: true },
    category: { type: String, enum: ['chicken', 'mutton', 'rice', 'curry', 'fish', 'noodles', 'juice', 'burgers', 'pizza'], required: true },
    imgUrl: { type: String, required: true },
    tags: { type: [String] },
    description: { type: String },
    price: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);

//user schema
const userSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Should be hashed
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

//order schema
const orderSchema = new mongoose.Schema({
    orderID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    foodItems: [{
        foodID: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
        quantity: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);

//reviews schema
const reviewSchema = new mongoose.Schema({
    reviewID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    foodID: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    feedback: { type: String },
    reviewDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);

//table schema
const tableBookingSchema = new mongoose.Schema({
    tbID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    phnNumber: { type: String, required: true },
    numberOfPerson: { type: Number, required: true },
    tbDate: { type: Date, required: true }
});

module.exports = mongoose.model('TableBooking', tableBookingSchema);
