import React, { useState } from "react";
import styles from "./create.module.scss";
import imgCreateFood from "../../assets/img/7627.jpg";
import { useSelector } from "react-redux";
import {Navigate, useNavigate} from 'react-router-dom';

export const Create = () => {
  //Hooks
  const navigate = useNavigate();
  const { diets } = useSelector((state) => state.diets);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    resume: "",
    healthScore: 0,
    diet: [],
    steps: [],
    img: ""
  });

  
  const [dieta, setDieta] = useState([]);
  const [pasos, setPasos] = useState([1]);
  const [stepsForm, setStepsForm] = useState([])

  // Metodos
  const createRecipe = async (recipe) => {
    const resp = await fetch("https://api-food-henry.herokuapp.com/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    const data = await resp.json();

    return data;
  };


  const handleDietChange = (e) => {
    setDieta((d)=>[...d, e.target.value]);
  }

  const handleStepsChange = (e) => {
    
    setStepsForm( [...stepsForm, {[e.target.name]: e.target.value}]);

  }

  const handleInputChange = (e) => {

    setNewRecipe({
      ...newRecipe,
      [e.target.name]: e.target.value,
      diet: dieta,
      steps: stepsForm,
    });

  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const recipeDB = await createRecipe(newRecipe)
    navigate("/home")
    console.log(recipeDB)
  };

  return (
    <div className={styles.main_container}>
      <h1>Add Recipe</h1>
      <div className={styles.img_container}>
        <img src={imgCreateFood} alt="Hola" />
      </div>

      <div className={styles.form_container}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Recipe Name"
            onChange={handleInputChange}
          />
          <textarea
            name="resume"
            id="resume"
            cols="30"
            rows="10"
            placeholder="Recipe Resume"
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="healthScore"
            placeholder="Health Score ej.: 78"
            onChange={handleInputChange}
          />
          <div className={styles.container_filter}>
            <h4>Selected Diets: </h4>
            <div className={styles.selected_diets}>
              {dieta.length ? (
                dieta.map((d) => <p> {d} </p>)
              ) : (
                <p>No Diets Select</p>
              )}
            </div>
            {diets?.map((d) => (
              <input
                type="radio"
                id={d.name}
                name="diet"
                value={d.name}
                key={d.id}
                onChange={handleDietChange}
              />
            ))}

            <ol className={styles.filters}>
              {diets?.map((d) => (
                <li key={d.id}  >
                  <label htmlFor={d.name} onChange={handleDietChange}>
                    {d.name}
                  </label>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.steps_container}>
            <h2>Steps</h2>
            {pasos?.map((step) => (
              <div className={styles.step} key={step}>
                <h4>Step {step}</h4>
                <input type="text" name="step" placeholder="Step" onChange={handleStepsChange}/>
                <button 
                  className={styles.button_add_step} 
                  onClick={ (e) =>{
                    e.preventDefault(); 
                    setPasos([...pasos, pasos.length + 1])
                  }}
                >
                  +
                </button>
              </div>
            ))}
          </div>
          <input type="url" name="img" id="" onChange={handleInputChange} placeholder="Img Url ej.: https://website/pizza.jpg" />
          <input type="submit" className={styles.btn_submit}  value="Send"/>
        </form>
      </div>
    </div>
  );
};
