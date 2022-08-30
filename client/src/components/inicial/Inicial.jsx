import styles from "./inicial.module.scss"
import imgFood from "../../assets/img/7878.jpg";
import food from "../../assets/img/bowl-food-solid.svg";
import play from '../../assets/img/play-solid.svg';
import { Link } from "react-router-dom";


export function Inicial() {


  return (
    <div className={styles.inicial}>
      <div className={styles.main_container}>
        <div className={styles.head_container}>
          <h1>Henry Food App <img src={food} alt="food app" style={{width: '30px'}} /></h1>
          <h3> What are we going to eat today? </h3>
          <Link to="home" className={styles.button}>Start <img src={play} alt="play" style={{width: '12px'}}/></Link>
        </div>
        
        <div className={styles.imgFood_container}>
          <img src={imgFood} alt="food app" />
        </div>
      </div>

      <div className={styles.wave}>
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}


