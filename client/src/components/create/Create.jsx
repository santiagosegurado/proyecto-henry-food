import React, { useEffect, useState } from "react";
import styles from "./create.module.scss";
import imgCreateFood from "../../assets/img/7627.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from 'react-router-dom';
import { getDiet } from "../../features/diets/dietSlice";

export const Create = () => {
  //Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { diets } = useSelector((state) => state.diets);

  const [name, setName] = useState({name: '', valid: false});
  const [resume, setResume] = useState('');
  const [healthScore, setHealthScore] = useState({healthScore:0, valid: false});
  const [dieta, setDieta] = useState({dietas: [], valid: false});
  const [stepsForm, setStepsForm] = useState([]);
  const [img, setImg] = useState({img: '', valid: false});
  
  const [pasos, setPasos] = useState([1]);

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
  
  const handleInputChange = (e) => {
    if (e.target.name === "name") {
      
      setName( {...name, name: e.target.value});
    }

    if (e.target.name === "resume") {
      setResume( e.target.value);
    }
    
    if (e.target.name === "healthScore") {
      setHealthScore({...healthScore, healthScore: e.target.value});
    }


    if (e.target.name === "diet") {
      setDieta({...dieta,  dietas:[...dieta.dietas, e.target.value]})
    }

    if (e.target.name.includes("step")) {
      setStepsForm({ ...stepsForm, [e.target.name]: e.target.value});
    }
    
    if (e.target.name === "img") {
      setImg({...img, img: e.target.value});
    }


  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    await createRecipe({name: name.name, resume: resume, healthScore: healthScore.healthScore, steps: stepsForm, diet: dieta.dietas, img: img.img})

    navigate('/home')

  };

  useEffect(() => {
    dispatch(getDiet())
  }, [dispatch])
  

  return (
    <div className={styles.main_container}>
      <h1>Add Recipe</h1>
      <div className={styles.img_container}>
        <img src={imgCreateFood} alt="createFood" />
      </div>

      <div className={styles.form_container}>
        <form onSubmit={handleSubmit}>
          {
            !name.valid && <p>Add Name</p>
          }
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Recipe Name"
            value={name.name}
            onChange={handleInputChange}
            required
            autoComplete = 'off'
          />
          <textarea
            name="resume"
            id="resume"
            cols="30"
            rows="10"
            placeholder="Recipe Resume"
            value={resume.resume}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="healthScore"
            placeholder="Health Score ej.: 78"
            min='1' 
            max='100'
            onChange={handleInputChange}
            value={healthScore.healthScore}
            required
          />
          <div className={styles.container_filter}>
            <h4>Selected Diets: </h4>
            <div className={styles.selected_diets}>
              {dieta.length ? (
                dieta.map((d) => <p key={d}> {d} </p>)
              ) : (
                <span className={ styles.no_selected_diets} >No Diets Select</span>
              )}
            </div>
            {diets?.map((d) => (
              <input
                type="radio"
                id={d.name}
                name="diet"
                value={d.name}
                key={d.id}
                onChange={handleInputChange}
              />
            ))}

            <ol className={styles.filters}>
              {diets?.map((d) => (
                <li key={d.id}  >
                  <label htmlFor={d.name} onChange={handleInputChange}>
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
                <input type="text" name={`step${step}`} placeholder="Step" onChange={handleInputChange}/>
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
          <input type="url" name="img" id="" placeholder="Img Url ej.: https://website/pizza.jpg" onChange={ handleInputChange} required/>
          <input type="submit" className={styles.btn_submit}  value="Send"/>
        </form>
      </div>
    </div>
  );
};
