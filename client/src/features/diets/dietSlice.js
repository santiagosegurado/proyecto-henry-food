import { createSlice } from "@reduxjs/toolkit";

export const dietSlice = createSlice({
  name: "diet",
  initialState: [],
  reducers: {
    showDiets: (state, action) => {
        return {
            ...state,
            diets: action.payload
        }
    }
  },
});



export const {showDiets} = dietSlice.actions;
export default dietSlice.reducer;
