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
    <h3>{recipe.recipes}</h3>
    <img src={recipe.strrecipesThumb} alt={recipe.strrecipes} style={{ width: '100%', borderRadius: '10px' }} />
    <Link to={`/recipes/${recipe.idrecipes}`} style={{ textDecoration: 'none', color: '#007BFF' }}>View Details</Link>
  </div>
);

export default RecipeCard;
