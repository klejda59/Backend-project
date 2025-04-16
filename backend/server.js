const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipeRoutes');
const RecipeModel = require('./models/Recipe');

const app = express();
app.use(express.json()); 

app.use(cors());
app.use('/recipes', recipeRoutes) ;
app.use('/recipes', require('./routes/recipeRoutes'))

mongoose.connect('mongodb://localhost:27017/recipesDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Define the root route
app.get('/', (req, res) => {
  res.json('Welcome to the Recipe API!');
});
 
app.get('/categories', (req, res) => {
  const categories = [
    "Beef",
    "Vegetarian",
    "Dessert",
    "Pancakes",
    // Add more categories
  ];
  res.json(categories); 
});

app.post("/recipes", (req, res) => {
    let recipe = new RecipeModel(req.body);

    recipe.save((err, result) => { 
        if (err) {
            res.status(500).send({ 
                message: "Something went wrong",
                error: err,
            });
        } else {
            res.status(201).json(result); 
        }
    });
});


// Catch-all for undefined routes (404 handler)
app.use((req, res) => {
    res.status(404).json({ error: 'Resource not found' });
  });
  
// Mount recipe routes at /recipes
app.use('/recipes', recipeRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
