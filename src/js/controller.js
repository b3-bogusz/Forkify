import * as model from './model.js'
import recipeView from './views/recipeView';

import 'core-js/stable';                //npm package for polyfilling
import 'regenerator-runtime/runtime';   // npm package for polyfilling async/await

const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    alert(err)
  }
}

// ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));
window.addEventListener('hashchange', controlRecipes);
window.addEventListener('load', controlRecipes);