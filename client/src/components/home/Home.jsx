import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import left from "../../assets/img/arrow-left-solid.svg";
import right from "../../assets/img/arrow-right-solid.svg";
import styles from "./home.module.scss";
import home from "../../assets/img/house-solid.svg";
import { showAllRecipes } from "../../features/recipes/recipesSlice";
import { getDiet } from "../../features/diets/dietSlice";
import { getRecipes } from "../../features/recipes/recipesSlice";
import { getAllRecipes } from "../../helpers/getAllRecipes";

export const Home = () => {
  // Hooks
  const dispatch = useDispatch();
  const { recipes, status } = useSelector((state) => state.recipes);
  const { diets } = useSelector((state) => state.diets);
  var [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [pagina, setPagina] = useState(1);
  const [porPagina] = useState(9);

  var maximo = Math.round(recipes.length / porPagina) +1;

  // Metodos
  const nextpage = () => {
    if (maximo > pagina) {
      setPagina(pagina + 1);
      return;
    }
  };

  const prevpage = () => {
    if (1 < pagina) {
      setPagina(pagina - 1);
    }
  };

  // Handlers
  const handleInputRecipeChange = (e) => {
    setSearchParams({ name: e.target.value });
  };

  const handleInputRecipeSubmit = async (e) => {
    e.preventDefault();

    if (!searchParams) {
      return;
    } else {
      dispatch(getRecipes(location.search));
      setPagina(1);
    }
  };

  const handleFilterByDiets = async (diet) => {
    if (diet !== "All" && diet !== "healthScore" && diet !== "az") {
      const recipe = await getAllRecipes();

      let recipesFilter = await recipe?.filter((r) => r.diets.includes(diet));
      dispatch(showAllRecipes(recipesFilter));

    } else if (diet === "healthScore") {
      let recipeSortByHS = recipes.slice().sort((a, b) => {
        return b.healthScore - a.healthScore;
      });
      dispatch(showAllRecipes(recipeSortByHS));
      
    } else if (diet === "az") {

      let recipeSortByAZ = recipes.slice().sort((a, b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();

        if (nameA < nameB) {
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
      dispatch(showAllRecipes(recipeSortByAZ));
    } else {
      const recipe = await getAllRecipes();
      dispatch(showAllRecipes(recipe));
    }
  };

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiet());
  }, [dispatch]);

  return (
    <div className={styles.main_container}>
      {/* Header */}
      <div className={styles.wave}></div>

      <div className={styles.header_container}>
        <h1>
          Home <img src={home} alt="home" style={{ width: "26px" }} />
        </h1>

        <div className={styles.input_container}>
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

          {/* Add */}
          <Link to="/create" className={styles.input_create}>
            +
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.container_filter}>
        <input type="radio" id="All" name="categories" value="All" />
        <input
          type="radio"
          id="healthScore"
          name="categories"
          value="healthScore"
        />
        <input type="radio" id="az" name="categories" value="az" />

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
            <label htmlFor="All" onClick={() => handleFilterByDiets("All")}>
              All
            </label>
          </li>
          <li>
            <label
              htmlFor="healthScore"
              onClick={() => handleFilterByDiets("healthScore")}
            >
              Health Score
            </label>
          </li>
          <li>
            <label htmlFor="az" onClick={() => handleFilterByDiets("az")}>
              A-Z
            </label>
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

      {/* Paginacion */}
      <div className={styles.page}>
        <span className={styles.page_icon} onClick={prevpage}>
          <img src={left} alt="left" />
        </span>
        <p>
          {pagina} / {maximo}
        </p>
        <span className={styles.page_icon} onClick={nextpage}>
          <img src={right} alt="right" />
        </span>
      </div>

      {/* Cards */}
      <div className={styles.container}>
        {status === "loading" ? (
          <div className={styles.lds_dual_ring}></div>
        ) : (
          recipes
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
                        Show More
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
