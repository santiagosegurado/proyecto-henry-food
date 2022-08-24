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

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.second_container}></div>
        <div className={styles.img_container}>
          <img src={recipe.img} alt={recipe.name} />
        </div>

        <div className={styles.header_container}>
          <h1>{recipe.name}</h1>
          <div className={styles.diet_container}>
            <ul>
              {recipe.diets?.map((d) =>
                d.name ? (
                  <li key={d.id}>
                    <span>{d.name}</span>
                  </li>
                ) : (
                  <li key={d}>
                    <span> {d}</span>{" "}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.body_container}>
        <h2>Resume</h2>
        <span dangerouslySetInnerHTML={{ __html: `${recipe.resume}` }}></span>
      </div>

      <div className={styles.steps_container}>
        <div className={styles.header_steps}>
          <h2>Recipe Steps</h2>
          <span>steps {recipe.steps?.length}</span>
        </div>
        <div className="steps_body">
          {recipe.steps?.map((step) => (
            <div className={styles.step} key={step.number}>
              <h2>Step {step.number}</h2>
              <span>{step.step}</span>
              <h4>Ingredients :</h4>
              <ul>
                {step.ingredients?.map((i) => (
                  <li key={i.name}>{i.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
