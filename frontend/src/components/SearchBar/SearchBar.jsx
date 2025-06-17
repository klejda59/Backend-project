import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = ({ favorites = [], toggleFavorite }) => {
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
          placeholder="Search"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p className="loading-text">Loading...</p>}

      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((recipe) => {
            const isFavorite = favorites.some(r => r._id === recipe._id);
            return (
              <div key={recipe._id} className="recipes-item improved-recipe-card">
                <button 
                  onClick={() => handlerecipesClick(recipe._id)}
                  className="recipe-main-btn"
                  aria-label={`View details for ${recipe.recipes}`}
                >
                  <img src={recipe.recipesThumb} alt={recipe.recipes} className="recipes-image" />
                  <h3 className="recipes-title">{recipe.recipes}</h3>
                </button>
                <button
                  onClick={() => toggleFavorite(recipe)}
                  className="favorite-heart-btn"
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFavorite ? '❤️' : '🤍'}
                </button>
              </div>
            );
          })
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
