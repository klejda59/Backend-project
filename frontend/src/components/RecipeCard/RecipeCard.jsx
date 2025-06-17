// src/components/RecipeCard/RecipeCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => (
  <div style={{
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '1rem',
    width: '200px',
    textAlign: 'center',
    backgroundColor: '#fff'
  }}>
    <h3>{recipe.recipe}</h3>
    <h5>{recipe.name}</h5>
    <img
      src={recipe.image}
      alt={recipe.name}
      style={{ width: '100%', borderRadius: '10px' }}
    /> 
    <br></br>
        <Link
      to={`/recipes/${recipe._id}`}
      style={{ textDecoration: 'none', color: '#007BFF' }}
    >
      View Details
    </Link>
  </div>
);

export default RecipeCard;
