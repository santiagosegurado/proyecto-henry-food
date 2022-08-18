import express  from "express";
import dietRouter from "./src/routes/diets.routes.js";
import routerRecipe from "./src/routes/recipes.routes.js";
import cors from 'cors';
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//Rutas
app.use(routerRecipe);
app.use(dietRouter);

export default app;
