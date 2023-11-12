import React, { useState } from 'react';
import './App.css'; // Import the CSS file


const App = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const API_ENDPOINT = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  const API_RANDOM_ENDPOINT = `https://www.themealdb.com/api/json/v1/1/random.php`;

  const getRecipes = () => {
    fetch(API_ENDPOINT)
      .then(response => response.json())
      .then(data => {
        setRecipes(data.meals);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const getRandomRecipe = () => {
    fetch(API_RANDOM_ENDPOINT)
      .then(response => response.json())
      .then(data => {
        setRecipes([data.meals[0]]);
      })
      .catch(error => {
        console.error('Error fetching random recipe:', error);
      });
  };

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    getRecipes();
    setQuery('');
  };

  return (
    <div>
      <h1 className="title">Find Recipe</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleChange} placeholder="Please type your recipe" />
        <button type="submit">Search</button>
      </form>
      <button onClick={getRandomRecipe}>Random Recipe</button>
      <div>
        {recipes &&
          recipes.map(recipe => (
            <div className="recipe-card" key={recipe.idMeal}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h3>{recipe.strMeal}</h3>
              <p>{recipe.strInstructions}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
