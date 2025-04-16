import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FilterComponent.css';

const FilterComponent = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        setCategories(response.data.meals.map(cat => cat.strCategory));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onFilterChange(category);
  };

  return (
    <div className="filter-component">
      <select 
        value={selectedCategory} 
        onChange={handleCategoryChange}
        className="category-select"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {selectedCategory && (
        <p className="selected-category">Selected Category: {selectedCategory}</p>
      )}
    </div>
  );
};

export default FilterComponent;
