import React, { useEffect, useState } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import "./App.css";
import Recipe from "./Recipe";
import ChatApp from "./ChatApp";

//import "./styles/style.scss";
import "./App.css";

// await is used for some data that does not come back instantly (promise)

const App = () => {
  const APP_ID = "a2bfd5bd";
  const APP_KEY = "536cbcdd573cf03b36048c979011364c";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      <HashRouter>
        <div>
          <Route exact path="/" component={ChatApp} />
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
