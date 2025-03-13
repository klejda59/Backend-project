import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMealClick = (mealId) => {
    window.location.href = `/meal/${mealId}`;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    let url;
    switch (searchType) {
      case 'name':
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
        break;
      case 'ingredient':
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`;
        break;
      case 'firstLetter':
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchTerm.charAt(0)}`;
        break;
      default:
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
    }

    try {
      setLoading(true);
      const response = await axios.get(url);
      setSearchResults(response.data.meals || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-bar">
      <h2 className="title">Find Your Favorite Meal</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type a meal name, ingredient, or letter..."
          className="search-input"
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="search-select"
        >
          <option value="name">By Name</option>
          <option value="ingredient">By Ingredient</option>
          <option value="firstLetter">By First Letter</option>
        </select>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p className="loading-text">Loading...</p>}

      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((meal) => (
            <div 
              key={meal.idMeal} 
              className="meal-item" 
              onClick={() => handleMealClick(meal.idMeal)}
              style={{ cursor: 'pointer' }}
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
              <h3 className="meal-title">{meal.strMeal}</h3>
            </div>
          ))
        ) : (
          !loading && searchTerm && (
            <p className="no-results">No results found. Try a different search.</p>
          )
        )}
      </div>
    </div>
  );
};

export default SearchBar;
