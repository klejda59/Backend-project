import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FilterComponent.css';

const FilterComponent = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    categories: [],
    cuisines: [],
    loading: true,
    error: null
  });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');

  // Fetch categories and cuisines on mount
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [catResponse, areaResponse] = await Promise.all([
          axios.get('http://localhost:3000/recipes'),
          
        ]);

        setFilters({
          categories: catResponse.data.recipe.map(item => item.Category),
          cuisines: areaResponse.data.recipe.map(item => item.Area),
          loading: false,
          error: null
        });
      } catch (err) {
        setFilters(prev => ({ ...prev, error: err.message, loading: false }));
        console.error('Filter data fetch failed:', err);
      }
    };

    fetchFilters();
  }, []);

  // Handle filter selection changes
  const handleSelectionChange = (type, value) => {
    if (type === 'category') {
      setSelectedCategory(value);
      setSelectedCuisine(''); 
    } else {
      setSelectedCuisine(value);
      setSelectedCategory(''); 
    }

    onFilterChange({ [type]: value });
  };

  if (filters.loading) return <p>Loading filters...</p>;
  if (filters.error) return <p>Error: {filters.error}</p>;

  return (
    <div className="filter-container">
    
      <div className="filter-group">
        <label htmlFor="category-select">Recipe Category:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => handleSelectionChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          {filters.categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

   
      <div className="filter-group">
        <label htmlFor="cuisine-select">Cuisine Type:</label>
        <select
          id="cuisine-select"
          value={selectedCuisine}
          onChange={(e) => handleSelectionChange('cuisine', e.target.value)}
        >
          <option value="">All Cuisines</option>
          {filters.cuisines.map(cuisine => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterComponent;