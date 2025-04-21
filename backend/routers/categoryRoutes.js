const express = require("express");
const CategoryModel = require('../model/categoryModel');

const router = express.Router();

router.get("/categories", async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch categories" });
    }
});

module.exports = router;