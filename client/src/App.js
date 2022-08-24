import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Inicial } from "./components/inicial/Inicial";
import { Home } from "./components/home/Home";
import { Recipe } from "./components/recipe/Recipe";
import { Create } from "./components/create/Create";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicial />} />
        <Route path="home" element={<Home />} />
        <Route path="recipe/:id" element={<Recipe/>}/>
        <Route path="create" element={<Create />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
