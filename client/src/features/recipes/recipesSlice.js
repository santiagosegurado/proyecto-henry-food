import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

export const getRecipes = createAsyncThunk("recipes/getRecipes", async (name = '') => {
  const resp = await fetch(`http://localhost:3004/recipes${name}`);
  const data = await resp.json();

  return data;
});

export const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    status:'loading',
    recipes:[],
  },
  reducers: {
    showAllRecipes: (state, action) => {
      return {
        ...state,
        recipes: action.payload,
      };
    },
  },
  extraReducers: {
    [getRecipes.pending]: (state, action) => {
      state.status = "loading";
    },
    [getRecipes.fulfilled]: (state, { payload }) => {
      state.recipes = payload;
      state.status = "success";
    },
    [getRecipes.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { showAllRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;
