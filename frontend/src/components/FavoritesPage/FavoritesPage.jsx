import React from 'react';

const FavoritesPage = ({ favorites, removeFavorite }) => (
  <div style={{ padding: 24 }}>
    <h2>Your Favorite Recipes</h2>
    {favorites.length === 0 ? (
      <p>No favorites yet.</p>
    ) : (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {favorites.map(recipe => (
          <div
            key={recipe._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: 8,
              padding: 12,
              width: 220,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <img
              src={recipe.recipesThumb}
              alt={recipe.recipes}
              style={{ width: '100%', borderRadius: 4 }}
            />
            <h4>{recipe.recipes}</h4>
            <button onClick={() => removeFavorite(recipe._id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default FavoritesPage;
