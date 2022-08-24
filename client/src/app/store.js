import { configureStore } from "@reduxjs/toolkit";
import dietSlice from "../features/diets/dietSlice";
// Exportando el reducer por defecto
import recipeReducer from '../features/recipes/recipesSilce'

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    diets: dietSlice
  }
});
