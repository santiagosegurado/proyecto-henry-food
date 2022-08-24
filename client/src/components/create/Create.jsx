import React, { useEffect } from "react";

export const Create = () => {


  const createRecipe = async () => {
    const resp = await fetch("https://api-food-henry.herokuapp.com/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "New Recipe",
        resume: "Muy rico",
        healthScore: 70,
        steps: [
          { number: 1, step: "Poner Verduras" },
          { number: 2, step: "Comerlas" },
        ],
        diet: ["vegan"]
      }),
    });

    const data = await resp.json();

    return data;
  };

  useEffect(() => {

  }, []);

  return <div>Create</div>;
};
