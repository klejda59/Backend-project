import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FilterComponent.css';

const FilterComponent = ({ onFilterChange, selectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="filter-component">
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="category-select"
      >
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat.name} value={cat.name}>{cat.name}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterComponent;
