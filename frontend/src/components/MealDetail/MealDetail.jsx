import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './MealDetail.css';


const MealDetail = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch meal details.');
        }
        const data = await response.json();
        setMeal(data.meals[0]);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [id]);

  if (loading) return <p>Loading meal details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '300px', borderRadius: '10px' }} />
      <h2>Ingredients</h2>
      <ul>
        {[...Array(20)].map((_, i) =>
          meal[`strIngredient${i + 1}`] ? (
            <li key={i}>{meal[`strIngredient${i + 1}`]} - {meal[`strMeasure${i + 1}`]}</li>
          ) : null
        )}
      </ul>
      <h2>Instructions</h2>
      <p>{meal.strInstructions}</p>
    </div>
  );
};

export default MealDetail;