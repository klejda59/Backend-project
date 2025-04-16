import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './RecipeDetail.css';


const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log({ id }); 

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3000/recipes/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe details.');
        }
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  if (loading) return <p>Loading recipe details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recipe) return <p>No recipe found.</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} style={{ width: '300px', borderRadius: '10px' }} />
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetail;
