import express  from "express";
import routerRecipe from "./src/routes/recipes.routes.js";

const app = express();

// Middleware
app.use(express.json());

//Rutas
app.use(routerRecipe);

export default app;
