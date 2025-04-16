import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false); 

  const handlerecipesClick = (recipesId) => {
    window.location.href = `/recipes/${recipesId}`;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

   let url = 'http://localhost:3000/recipes';
   switch (searchType) {
    case 'name':
      url += `?name=${encodeURIComponent(searchTerm)}`;
      break;
    case 'ingredient':
      url += `?ingredient=${encodeURIComponent(searchTerm)}`;
      break;
    case 'firstLetter':
      url += `?firstLetter=${encodeURIComponent(searchTerm.charAt(0))}`;
      break;
    default:
      url += `?name=${encodeURIComponent(searchTerm)}`;
  }


    try {
      setLoading(true);
      setSearchPerformed(true); 
      const response = await axios.get(url);
      setSearchResults(response.data.recipes || response.data || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-bar">
      <h2 className="title">Find Your Favorite recipes</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type a recipes name, ingredient, or letter..."
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
          searchResults.map((recipes) => (
            <div 
              key={recipes.idrecipes} 
              className="recipes-item" 
              onClick={() => handlerecipesClick(recipes.idrecipes)}
              style={{ cursor: 'pointer' }}
            >
              <img src={recipes.strrecipesThumb} alt={recipes.strrecipes} className="recipes-image" />
              <h3 className="recipes-title">{recipes.strrecipes}</h3>
            </div>
          ))
        ) : (
          !loading && searchPerformed && ( 
            <p className="no-results">No results found. Try a different search.</p>
          )
        )}
      </div>
    </div>
  );
};

export default SearchBar;