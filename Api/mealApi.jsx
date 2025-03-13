import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FilterComponent.css';

const FilterComponent = ({ onFilterChange }) => {
  // State management
  const [categories, setCategories] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const catResponse = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
        );
        setCategories(catResponse.data.meals.map(item => item.strCategory));

        // Fetch cuisines (areas)
        const areaResponse = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
        );
        setCuisines(areaResponse.data.meals.map(item => item.strArea));
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchData();
  }, []);

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    const newFilters = {
      category: type === 'category' ? value : selectedCategory,
      cuisine: type === 'cuisine' ? value : selectedCuisine
    };

    if (type === 'category') setSelectedCategory(value);
    if (type === 'cuisine') setSelectedCuisine(value);
    
    onFilterChange(newFilters);
  };

  return (
    <div className="filter-container">
      {/* Category Filter */}
      <div className="filter-group">
        <label htmlFor="category-select">Meal Category:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Cuisine Filter */}
      <div className="filter-group">
        <label htmlFor="cuisine-select">Cuisine Type:</label>
        <select
          id="cuisine-select"
          value={selectedCuisine}
          onChange={(e) => handleFilterChange('cuisine', e.target.value)}
        >
          <option value="">All Cuisines</option>
          {cuisines.map(cuisine => (
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
