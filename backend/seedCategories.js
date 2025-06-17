const mongoose = require('mongoose');
const Category = require('./models/Category');

mongoose.connect('mongodb://localhost:27017/recipesDB')
  .then(async () => {
    const categories = [
      { name: "Vegetarian" },
      { name: "Beef" },
      { name: "Dessert" },
      { name: "Pancakes" }
    ];
    await Category.insertMany(categories);
    console.log('Categories seeded!');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
