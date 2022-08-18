import fetch from "node-fetch";
import "dotenv/config";
import Recipe from "../models/Recipe.js";
import { Op } from "sequelize";

const getRecipes = async (req, res) => {
  
  // Peticion a la api Spoonacular
  const resp = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&addRecipeInformation=true`
  );
  const { results } = await resp.json();

  try {
    // Si req.query existe 
    if (req.query.name) {

      // Filtrar Api spoonacular
      let recipeFilter = results.filter((r) =>
        r.title.includes(req.query.name)
      );

      // Filtrar DB
      let recipeFilterDB = await Recipe.findAll({
        where: {
          name:{
            [Op.like]: `%${req.query.name}%`,
          }
        }
      })
      
      
      
      // No hizo match
      if (!recipeFilter.length) {
        return res.status(201).send("No Match Found");
      }
      
      // Combinar DB y Api
      return res.json(recipeFilter.concat(recipeFilterDB));
    }

  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

const createRecipes = async (req, res) => {
  const { name, resume, healthScore, steps } = req.body;

  try {
    const newRecipe = await Recipe.create({ name, resume, healthScore, steps });
    res.json(newRecipe);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export { getRecipes, createRecipes };
