const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
}, {
    collection: "food_categories"
});

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;