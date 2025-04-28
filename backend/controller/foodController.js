const Food = require('../model/addFoodModel');

// Create a new food item
const createFood = async (req, res) => {
    console.log(req.body);
    try {
        const {
            name, description, imageUrl, rating, numberOfReviews,
            currentPrice, pastPrice, category, tags, customOrder, isAvailable
        } = req.body;

        // Create a new food item with provided data
        const food = new Food({
            name,
            description,
            imageUrl,
            rating,
            numberOfReviews,
            currentPrice: currentPrice || 0,  // Ensure it's a valid number
            pastPrice: pastPrice || 0,  // Default to 0 if missing
            category,
            tags,
            customOrder,
            isAvailable
        });

        // Save the food item to the database
        await food.save();

        res.status(201).json({ message: 'Food added successfully!' });
    } catch (error) {
        console.error('Error adding food:', error);
        res.status(400).json({ error: 'Failed to add food item' });
    }
};

//Get all food items
const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (error) {
        console.error('Error fetching foods:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get a single food item by ID
const getFoodById = async (req, res) => {
    try {
        const { id } = req.params;
        const food = await Food.findById(id);

        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }

        res.json(food);
    } catch (error) {
        console.error('Error fetching food by ID:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update food item
const updateFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!food) return res.status(404).json({ message: 'Food not found' });
        res.json({ message: 'Food updated successfully', food });
    } catch (error) {
        console.error('Error updating food:', error);
        res.status(400).json({ error: 'Failed to update food item' });
    }
};

// Delete food item
const deleteFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);
        if (!food) return res.status(404).json({ message: 'Food not found' });
        res.json({ message: 'Food deleted successfully' });
    } catch (error) {
        console.error('Error deleting food:', error);
        res.status(400).json({ error: 'Failed to delete food item' });
    }
};

module.exports = { createFood, getAllFoods, getFoodById, updateFood, deleteFood };
