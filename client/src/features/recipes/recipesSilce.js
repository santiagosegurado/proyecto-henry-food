import { createSlice } from "@reduxjs/toolkit";

// [
//     {
//         id: 0,
//         name: '',
//         resume: '',
//         healthScore: 0,
//         diets:[],
//         steps:[],
//         img: ''
//     }
// ]

export const recipeSlice = createSlice({
    name: "recipes",
    initialState:[],
    reducers: {
        showAllRecipes: (state, action)=>{
            return {
                ...state,
                allRecipes: action.payload
            }
        }
    }
})


export const { showAllRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;