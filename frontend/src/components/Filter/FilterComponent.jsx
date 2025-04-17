import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FilterComponent.css';

const FilterComponent = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categories'); // Categories endpoint
        setCategories(response.data); // Assuming the API returns an array of strings or objects with category names
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
    <div style={{ color: 'red' }}></div>
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
  </div>
);

};

export default FilterComponent;
