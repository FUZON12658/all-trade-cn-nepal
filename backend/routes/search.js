const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const productMain = require('../models/productMain');
const productSub = require('../models/productSub');
const fetchadmin = require('../middleware/fetchadmin');
const fuzzy = require('fuzzysearch');

router.get('/', async (req, res) => {
  const searchQuery = req.query.search;

  if (!searchQuery || searchQuery.trim() === "") {
    return res.status(400).json({ error: "Please provide a search query" });
  }

  try {
    const productMains = await productMain.find();
    const lowercaseSearchQuery = searchQuery.toLowerCase();

    const searchResults = productMains.filter(product =>
      fuzzy(lowercaseSearchQuery, product.productName.toLowerCase())
    );
    if (searchResults.length === 0) {
      return res.json({ message: "No matching products found" });
    }

    res.json(searchResults);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;