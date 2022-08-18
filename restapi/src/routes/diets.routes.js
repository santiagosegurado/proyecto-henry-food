import { Router } from "express";
import { getDiets } from "../controllers/diets.controller.js";



const dietRouter = Router();


dietRouter.get('/diet', getDiets)


export default dietRouter;