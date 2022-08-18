import Router from "express";
import {getRecipes, createRecipes, getRecipeById} from "../controllers/recipes.controllers.js";

const routerRecipe = Router();

// Rutas Get
routerRecipe.get("/recipes", getRecipes);

routerRecipe.get("/recipes/:idRecipe", getRecipeById);

// Rutas Post
routerRecipe.post("/recipes", createRecipes);

export default routerRecipe;
