import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./recipe.module.scss";

export const Recipe = () => {
  // Hooks
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

  // Metodos
  const getRecipeById = async (id) => {
    const resp = await fetch(
      `https://api-food-henry.herokuapp.com/recipes/${id}`
    );
    const data = await resp.json();

    return data;
  };

  useEffect(() => {
    getRecipeById(id).then(setRecipe);
  }, []);

  console.log(recipe);

  return (
    <div className={styles.main_container}>
      <div className={styles.img_container}>
        <img src={recipe.img} alt={recipe.name} />
      </div>
      <div className={styles.header_container}>
        <h1>{recipe.name}</h1>
        <div className={styles.diet_container}>
          <ul>
            {recipe.diets?.map((d) =>
              d.name ? (
                <li key={d.id}><span>{d.name}</span></li>
              ) : (
                <li key={d}><span> {d}</span> </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className={styles.body_container}>
        <h2>Resume</h2>
        <span dangerouslySetInnerHTML={{ __html: `${recipe.resume}` }}></span>
      </div>
      
      <div className="steps_container">
        <h2>Recipe Steps</h2>
        <span>steps {recipe.steps?.length}</span>
      </div>
    </div>
  );
};
