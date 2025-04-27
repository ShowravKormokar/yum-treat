const Food = require('../model/addFoodModel');

// Create a new food item
const createFood = async (req, res) => {
    try {
        const { name, category, price, description, imageUrl } = req.body;

        // Check if important fields are given
        if (!name || !category || !price) {
            return res.status(400).json({ message: 'Name, category, and price are required.' });
        }

        const newFood = new Food({
            name,
            category,
            price,
            description,
            imageUrl,
        });

        await newFood.save();

        res.status(201).json({ message: 'Food created successfully', food: newFood });
    } catch (error) {
        console.error('Error creating food:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// (optional) Get all food items
const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (error) {
        console.error('Error fetching foods:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createFood, getAllFoods };
