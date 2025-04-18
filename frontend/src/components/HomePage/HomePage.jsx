import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../RecipeCard/RecipeCard';
import FilterComponent from '../Filter/FilterComponent';
import SearchBar from '../SearchBar/SearchBar';
import './HomePage.css';

const HomePage = ({ favorites, toggleFavorite }) => { // Accept as props
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3000/recipes');
        setRecipes(response.data.recipes || []);
      } catch (err) {
        setError('Failed to fetch recipes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = selectedCategory ? recipe.category === selectedCategory : true;
    const matchesSearch = searchTerm
      ? recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="home-page">
      <SearchBar 
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        favorites={favorites}                // Pass favorites
        toggleFavorite={toggleFavorite}      // Pass toggleFavorite
      />
      <FilterComponent 
        onFilterChange={handleFilterChange} 
        selectedCategory={selectedCategory}
      />
      {selectedCategory && (
        <h2 className="selected-category-title">
          Recipes in {selectedCategory} Category
        </h2>
      )}
      <div className="recipe-grid">
        {filteredRecipes.map(recipe => (
          <RecipeCard
            key={recipe.idrecipes}
            recipe={recipe}
            favorites={favorites}            // Pass favorites
            toggleFavorite={toggleFavorite}  // Pass toggleFavorite
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
