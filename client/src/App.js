import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Inicial } from "./components/inicial/Inicial";
import { Home } from "./components/home/Home";
import { Recipe } from "./components/recipe/Recipe";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicial />} />
        <Route path="home" element={<Home />} />
        <Route path="recipe/:id" element={<Recipe/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
