// routes/foodRoutes.js
const express = require('express');
const { createFood, getAllFoods } = require('../controller/foodController');

const router = express.Router();

// Route to create a new food
router.post('/add', createFood);
console.log(router.post('/add', createFood));

// Route to fetch all food (optional)
router.get('/', getAllFoods);

module.exports = router;
