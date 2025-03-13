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
    <h3>{recipe.strMeal}</h3>
    <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: '100%', borderRadius: '10px' }} />
    <Link to={`/meal/${recipe.idMeal}`} style={{ textDecoration: 'none', color: '#007BFF' }}>View Details</Link>
  </div>
);

export default RecipeCard;
