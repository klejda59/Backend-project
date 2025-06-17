const express = require('express');
const Recipe = require('../models/Recipe');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { name, ingredient, firstLetter } = req.query;
    let filter = {};

    if (name) {
      // Case-insensitive search for name
      filter.name = { $regex: new RegExp(name, 'i') };
    }
    if (ingredient) {
      // Search for ingredient in ingredients array
      filter.ingredients = { $elemMatch: { $regex: new RegExp(ingredient, 'i') } };
    }
    if (firstLetter) {
      // Name starts with firstLetter (case-insensitive)
      filter.name = { $regex: new RegExp('^' + firstLetter, 'i') };
    }

    const recipes = await Recipe.find(filter);
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid recipe ID format' });
    }
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (err) {
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
  
  const { key } = req.query;

  if(key != "supersecret") {
    return res.status(500).send("You cannot do that"); 
  }
  
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
