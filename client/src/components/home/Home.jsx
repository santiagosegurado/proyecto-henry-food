import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

import styles from "./home.module.scss";
import { showAllRecipes } from "../../features/recipes/recipesSilce";
import { showDiets } from "../../features/diets/dietSlice";

export const Home = () => {
  // Hooks
  const dispatch = useDispatch();
  const { allRecipes } = useSelector((state) => state.recipes);
  const { diets } = useSelector((state) => state.diets);

  const [inputRecipe, setInputRecipe] = useState("");
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(9);


  // Metodos
  const nextpage = () => {
    if (12 > pagina) {
      setPagina(pagina + 1);
      return;
    }
  };

  const prevpage = () => {
    if (0 < pagina) {
      setPagina(pagina - 1);
    }
  };

  const getAllRecipes = async (name = null) => {
    let resp;
    name
      ? (resp = await fetch(
          `https://api-food-henry.herokuapp.com/recipes?name=${name}`
        ))
      : (resp = await fetch(`https://api-food-henry.herokuapp.com/recipes`));
    const data = resp.json();

    return data;
  };

  const getDiets = async () => {
    const resp = await fetch(`https://api-food-henry.herokuapp.com/diet`);
    const data = resp.json();

    return data;
  };

  // Handlers
  const handleInputRecipeChange = (e) => {
    setInputRecipe(e.target.value);
  };

  const handleInputRecipeSubmit = async (e) => {
    e.preventDefault();

    if (!inputRecipe) {
      return;
    } else {
      const recipesFilterbyName = await getAllRecipes(inputRecipe);
      dispatch(showAllRecipes(recipesFilterbyName));
      setPagina(1);
    }
  };

  const handleFilterByDiets = async (diet) => {
    
    if (diet !== "All") {

      var recipesFilter = [];
      const recipes = await getAllRecipes();
      dispatch(showAllRecipes(recipes));

      recipesFilter = allRecipes?.filter((r) => r.diets.includes(diet));
      dispatch(showAllRecipes(recipesFilter));

    } else {
      const recipes = await getAllRecipes();
      dispatch(showAllRecipes(recipes));
    }


  };


  useEffect(() => {
    if (inputRecipe === "") {
      getAllRecipes().then((recipes) => dispatch(showAllRecipes(recipes)));
      getDiets().then((diet) => dispatch(showDiets(diet)));
    }
  }, [inputRecipe]);



  return (
    <div className={styles.main_container}>
      {/* Header */}
      <div className={styles.wave}></div>
      <h1>Home</h1>

      {/* Search Form*/}
      <form onSubmit={handleInputRecipeSubmit}>
        <div className={styles.search}>
          <div>
            <input
              type="text"
              name="name"
              onChange={handleInputRecipeChange}
              placeholder="Search . . ."
              required
            />
          </div>
        </div>
      </form>

      {/* Filters */}
      <div className={styles.container_filter}>
        <input
          type="radio"
          id="All"
          name="categories"
          value="All"
        />

        {diets?.map((d) => (
          <input
            type="radio"
            id={d.name}
            name="categories"
            value={d.name}
            key={d.id}
          />
        ))}

        <ol className={styles.filters}>
          <li>
            <label htmlFor="All" onClick={() => handleFilterByDiets("All")}>All</label>
          </li>
          {diets?.map((d) => (
            <li key={d.id}>
              <label
                htmlFor={d.name}
                onClick={() => handleFilterByDiets(d.name)}
              >
                {d.name}
              </label>
            </li>
          ))}
        </ol>
      </div>

      {/* Cards */}
      <div className={styles.page}>
        <GrLinkPrevious className={styles.page_icon} onClick={prevpage} />
        <GrLinkNext className={styles.page_icon} onClick={nextpage} />
      </div>

      <div className={styles.container}>
        {!allRecipes ? (
          <div className={styles.lds_dual_ring}></div>
        ) : (
          allRecipes
            ?.slice(
              (pagina - 1) * porPagina,
              (pagina - 1) * porPagina + porPagina
            )
            .map((r) => (
              <div className={styles.card} key={r.id}>
                <div className={styles.card_header}>
                  <img src={r.img} alt="rover" />
                </div>
                <div className={styles.card_body}>
                  {r.diets?.map((d) => (
                    <span className={styles.tag} key={d.name ? d.name : d}>
                      {d.name ? d.name : d}
                    </span>
                  ))}
                  <h3>{r.name}</h3>
                  <h4>
                    Health Score: <span>{r.healthScore}</span>
                  </h4>
                  <div className={styles.user}>
                    <div className={styles.user_info}>
                      <Link className={styles.link} to={`/recipe/${r.id}`}>
                        Show More <AiOutlineArrowsAlt />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};