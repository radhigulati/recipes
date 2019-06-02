import React from "react";

const Recipe = ({ title, calories, ingredients, image }) => {
  return (
    <div>
      <h1>{title}</h1>
      <ol>
        {ingredients.map((ingredient, i) => (
          <li key={i}>{ingredient.text}</li>
        ))}
      </ol>
      <p>{calories}</p>
      <img src={image} alt="" />
    </div>
  );
};

export default Recipe;
