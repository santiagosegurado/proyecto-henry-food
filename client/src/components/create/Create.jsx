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

  const [name, setName] = useState({name: '', valid: null});
  const [resume, setResume] = useState('');
  const [healthScore, setHealthScore] = useState({healthScore:'', valid: null});
  const [dieta, setDieta] = useState({dietas: [], valid: null});
  const [stepsForm, setStepsForm] = useState([]);
  const [img, setImg] = useState({img: '', valid: null});
  
  const [pasos, setPasos] = useState([1]);

  // Metodos
  const createRecipe = async (recipe) => {
    const resp = await fetch("http://localhost:3004/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    const data = await resp.json();

    return data;
  };

  const validate = () => {
    if (/[a-zA-Z0-9]/.test(name.name) ) {
      setName({...name, valid: true});
    }else {
      setName({...name, valid: false});
    }

    if (healthScore.healthScore > 1 && healthScore.healthScore < 101) {
      setHealthScore({...healthScore, valid: true});
    
    }else{
      setHealthScore({...healthScore, valid: false});
    }

    if (dieta.dietas !== []) {
      setDieta({...dieta, valid: true});
    }else {
      setDieta({...dieta, valid: false});
    }

    if (img.img.includes('https://')) {
      setImg({...img, valid: true});
    }else {
      setImg({...img, valid: false});
    }
  }
  
  // Handlers
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
            name.valid === false &&
            <span className={styles.error} style={{width: '140px'}}>No Name Added</span>
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
            onKeyUp={validate}
            onBlur={validate}
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
          {
            healthScore.valid === false &&
            <span className={styles.error} style={{width: '300px'}}>The number is not between 1 and 100 or does not exist</span>
          }
          <input
            type="number"
            name="healthScore"
            placeholder="Health Score ej.: 78"
            min='1' 
            max='100'
            onChange={handleInputChange}
            value={healthScore.healthScore}
            onKeyUp={validate}
            onBlur={validate}
            required
          />
          <div className={styles.container_filter}>
            <h4>Selected Diets: </h4>
            <div className={styles.selected_diets}>
              {dieta.dietas.length ? (
                dieta.dietas.map((d) => <p key={d}> {d} </p>)
              ) : (
                <span className={ dieta.valid === false ?  styles.error: styles.no_selected_diets} >No Diets Select</span>
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
                onClick={validate}
              />
            ))}

            <ol className={styles.filters}>
              {diets?.map((d) => (
                <li key={d.id}  >
                  <label htmlFor={d.name} onChange={handleInputChange} onClick={validate}>
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
          {
            img.valid === false && 
            <span className={styles.error}>Url not valid ej.:'https://website/pizza.jpg'</span>
          }
          <input 
            type="url" 
            name="img" 
            placeholder="Img Url ej.:'https://website/pizza.jpg'" 
            onChange={ handleInputChange} 
            onKeyUp={validate}
            onBlur={validate}
            required
          />
          {
            name.valid &&
            healthScore.valid &&
            dieta.valid &&
            img.valid ?
            <input type="submit" className={styles.btn_submit}  value="Send" />
            : 
            <input type="submit" className={styles.btn_submit}  value="Send" disabled/>
          }
        </form>
      </div>
    </div>
  );
};
