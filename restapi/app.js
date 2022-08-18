import express  from "express";
import dietRouter from "./src/routes/diets.routes.js";
import routerRecipe from "./src/routes/recipes.routes.js";

const app = express();

// Middleware
app.use(express.json());

//Rutas
app.use(routerRecipe);
app.use(dietRouter)

export default app;
