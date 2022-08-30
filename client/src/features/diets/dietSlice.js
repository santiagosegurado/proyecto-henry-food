import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getDiet = createAsyncThunk('getDiet', async () => {
  const resp = await fetch('https://api-food-henry.herokuapp.com/diet');
  const data = resp.json();

  return data;
})

export const dietSlice = createSlice({
  name: "diet",
  initialState: {
    status: 'loading',
    diets:[]
  },
  reducers: {
  },
  extraReducers: {
    [getDiet.pending]: (state, action) => {
      state.status = "loading";
    },
    [getDiet.fulfilled]: (state, { payload }) => {
      state.diets = payload;
      state.status = "success";
    },
    [getDiet.rejected]: (state, action) => {
      state.status = "failed";
    },
  }
});



export const {showDiets} = dietSlice.actions;
export default dietSlice.reducer;
