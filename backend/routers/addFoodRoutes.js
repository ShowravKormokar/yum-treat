// routes/foodRoutes.js
const express = require('express');
const { createFood, getAllFoods, getFoodById, updateFood, deleteFood } = require('../controller/foodController');
const router = express.Router();

// Route to create a new food
router.post('/add', createFood);

// Route to fetch all food (optional)
router.get('/', getAllFoods);

// ⭐ New Route: fetch a single food by ID
router.get('/:id', getFoodById);

// Update food
router.put('/update/:id', updateFood);

// Delete food
router.delete('/delete/:id', deleteFood);

module.exports = router;
