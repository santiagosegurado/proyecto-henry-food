import fetch from "node-fetch";
import "dotenv/config";
import Recipe from "../models/Recipe.js";
import { Op } from "sequelize";
import Diet from "../models/Diet.js";

// Get query / All
const getRecipes = async (req, res) => {
  // Peticion a la api Spoonacular
  const resp = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&addRecipeInformation=true&number=100`
  );
  const { results } = await resp.json();

  const newResults = results?.map((r) => ({
    id: r.id,
    name: r.title,
    resume: r.summary,
    diets: r.diets,
    healthScore: r.healthScore,
    img: r.image,
    steps: r.analyzedInstructions[0]?.steps,
  }));

  const allRecipeDB = await Recipe.findAll({
    include: [Diet]
  });

  try {
    // Si req.query existe
    if (req.query.name) {
      // Filtrar Api spoonacular
      let recipeFilter = newResults.filter((r) =>
        r.name.includes(req.query.name)
      );

      // Filtrar DB
      let recipeFilterDB = await Recipe.findAll({
        where: {
          name: {
            [Op.like]: `%${req.query.name}%`,
          },
        }, include: [Diet]
      });

      // No hizo match
      if (!recipeFilter.length && !recipeFilterDB) {
        return res.status(201).send("No Match Found");
      }

      // Combinar DB y Api
      return res.json(recipeFilter.concat(recipeFilterDB));
    } else {
      return res.status(201).send(newResults.concat(allRecipeDB));
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

// Get id
const getRecipeById = async (req, res) => {
  const recipeId = req.params.idRecipe;

  try {
    if (recipeId) {
      
      
      
      if (recipeId.length < 30) {
        
        const resp = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.API_KEY}`);
        const result = await resp.json();
        const newResults = {
          id: result.id,
          name: result.title,
          resume: result.summary,
          diets: result.diets,
          healthScore: result.healthScore,
          img: result.image,
          steps: result.analyzedInstructions[0]?.steps,
        }
        
        return res.status(200).send(newResults);
      
      }else {
        
        var recipeById = await Recipe.findOne({
          where: {
            id: recipeId,
          
          }, include: [Diet]
        });
        return res.json(recipeById);
      }
      


    }else {
      return res.status(404).send("No RecipeId recived");
    }

  } catch (error) {
    res.status(404).send({ message: error.message });

  }

};

// Create a new Recipe
const createRecipes = async (req, res) => {
  const { name, resume, healthScore, steps, diet } = req.body;

  try {
    const newRecipe = await Recipe.create(
      {
        name,
        resume,
        healthScore,
        steps,
      },
      {
        include: [Diet],
      }
    );

    let dietas = await Diet.findAll({
      attributes: ["id"],
      where: {
        name: diet,
      },
    });

    await newRecipe.setDiets(dietas);

    res.json(newRecipe);

  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};


export { getRecipes, createRecipes, getRecipeById };
