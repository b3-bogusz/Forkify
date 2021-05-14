import * as model from './model.js'
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultsView';
import paginationView from './views/paginationView';

import 'core-js/stable';                //npm package for polyfilling
import 'regenerator-runtime/runtime';
import { getSearchResultsPage } from './model.js';   // npm package for polyfilling async/await

// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
}

const controlSearchResults = async function() {
  try {
    resultView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render results
    resultView.render(model.getSearchResultsPage());

    // Render initial pagination buttons
    paginationView.render(model.state.search);

  } catch(err) {
    console.log(err);
  }
}

const controlPagination = function(goToPage) {
  // Render new results
  resultView.render(model.getSearchResultsPage(goToPage));

  // Render new pagination buttons
  paginationView.render(model.state.search);
}

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.adddHandlerClick(controlPagination);
}
init();