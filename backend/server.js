const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipeRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/recipesDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

app.get('/', (req, res) => {
  res.json('Welcome to the Recipe API!');
});

app.use('/categories', categoryRoutes);
app.use('/recipes', recipeRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Resource not found' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
