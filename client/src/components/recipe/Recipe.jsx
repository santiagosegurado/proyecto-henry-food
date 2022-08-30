import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../../helpers/getRecipeById";
import styles from "./recipe.module.scss";

export const Recipe = () => {
  // Hooks
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  var arraySteps = [];

  if (recipe.steps?.step1) {
    for (let clave in recipe.steps) {
      arraySteps.push(recipe.steps[clave]);
    }
  }

  useEffect(() => {
    getRecipeById(id).then(setRecipe);
  }, [id]);

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
          <span>steps { recipe.steps?.step1 ? arraySteps.length : recipe.steps?.length}</span>
        </div>
        <div className="steps_body">
          {recipe?.steps?.step1 ? (
            arraySteps.map((step, i) => (
              <div className={styles.step} key={i}>
                <h2>Step {i+1}</h2>
                <span>{step}</span>
              </div>
            ))
          ) : (
            recipe.steps?.map((step) => (
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
            ))
          )}
        </div>
      </div>
    </>
  );
};
