const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  ingredients: { 
    type: [String], 
    required: true 
  },
  instructions: { 
    type: String, 
    required: true 
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'Category',
    required: true
  },
  image: { 
    type: String, 
    required: false
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
