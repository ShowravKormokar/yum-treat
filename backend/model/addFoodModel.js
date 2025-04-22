const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Food name is required'],
        trim: true,
        maxlength: [100, 'Food name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],
        validate: {
            validator: function (v) {
                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot be more than 5']
    },
    numberOfReviews: {
        type: Number,
        default: 0,
        min: [0, 'Review count cannot be negative']
    },
    currentPrice: {
        type: Number,
        required: [true, 'Current price is required'],
        min: [0, 'Price cannot be negative']
    },
    pastPrice: {
        type: Number,
        min: [0, 'Price cannot be negative'],
        validate: {
            validator: function (v) {
                return v <= this.currentPrice;
            },
            message: 'Past price must be less than or equal to current price'
        }
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    tags: {
        type: [String],
        enum: {
            values: ['spicy', 'chicken', 'roast', 'vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free', 'seafood', 'cheesy'],
            message: '{VALUE} is not a valid tag'
        },
        default: []
    },
    customOrder: {
        type: Boolean,
        default: false
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    preparationTime: {
        type: Number, // in minutes
        min: [0, 'Preparation time cannot be negative'],
        default: 20
    },
    featured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
foodSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Text index for search functionality
foodSchema.index({
    name: 'text',
    description: 'text',
    tags: 'text'
});

module.exports = mongoose.model('Food', foodSchema);