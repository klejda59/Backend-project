import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import RecipeCard from '../RecipeCard/RecipeCard';
import FilterComponent from '../Filter/FilterComponent';
import './HomePage.css';
import SearchBar from '../SearchBar/SearchBar';


const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    try {
      let url = 'https://localhost:3000/recipes';
      if (selectedCategory) {
        url = `https://localhost:3000/recipes${selectedCategory}`;
      }
      const fetchedRecipes = [];
      const count = selectedCategory ? 1 : 20;
      for (let i = 0; i < count; i++) {
        const response = await axios.get(url);
        fetchedRecipes.push(...response.data.meals);
      }
      setRecipes(fetchedRecipes);
    } catch (err) {
      setError('Failed to fetch recipes.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="home-page">

<SearchBar />
      <FilterComponent 
        onFilterChange={handleFilterChange} 
        selectedCategory={selectedCategory}
      />
      {selectedCategory && (
        <h2 className="selected-category-title">Recipes in {selectedCategory} Category</h2>
      )}
      <div className="recipe-grid">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
