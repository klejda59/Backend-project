const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();
const mongoose = require('mongoose');

// Middleware to log requests
router.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.originalUrl}`);
  next();
});

// Create a recipe
router.post('/', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all unique categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Recipe.distinct('Category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Search recipes
router.get('/search', async (req, res) => {
  try {
    const { name, ingredient, firstLetter } = req.query;
    let query = {};

    if (name) {
      query.name = new RegExp(name, 'i');
    }
    if (ingredient) {
      query.ingredients = new RegExp(ingredient, 'i'); 
    }
    if (firstLetter) {
      query.name = new RegExp(`^${firstLetter}`, 'i');
    }

    const results = await Recipe.find(query);
    res.json({ recipes: results });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed', details: err.message });
  }
});

// Get single recipe by ID
router.get('/recipes/:id', async (req, res) => {
  try {
    const { recipeid } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid recipe ID format' });
    }
    const recipe = await Recipe.findById(id);
  if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (err) {
    console.error('Error fetching recipe:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// Update a recipe
router.put('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid recipe ID format' });
    }
    
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a recipe
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid recipe ID format' });
    }
    
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
