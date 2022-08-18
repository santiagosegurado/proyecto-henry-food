import Router from "express";
import {getRecipes, createRecipes} from "../controllers/recipes.controllers.js";

const routerRecipe = Router();

// Rutas Get
routerRecipe.get("/recipes", getRecipes);

routerRecipe.get("/recipes/:idRecipe", );

// Rutas Post
routerRecipe.post("/recipes", createRecipes);

export default routerRecipe;
