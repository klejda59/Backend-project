import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = ({
  setSearchResults,
  setSearchActive
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, ] = useState('name');
  const [loading, setLoading] = useState(false);

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
      setSearchActive(true); // Tell parent search is active
      const response = await axios.get(url);
      setSearchResults(response.data || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Optional: handle clearing search
  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setSearchActive(false);
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
        <button
          type="button"
          className="clear-search-button"
          onClick={handleClearSearch}
          style={{ marginLeft: '10px' }}
        >
          Clear
        </button>
      </form>
      {loading && <p className="loading-text">Loading...</p>}
    </div>
  );
};

export default SearchBar;
