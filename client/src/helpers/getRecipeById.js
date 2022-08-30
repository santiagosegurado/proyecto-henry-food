


export const getRecipeById = async (id) => {
  const resp = await fetch(
    `https://api-food-henry.herokuapp.com/recipes/${id}`
  );
  const data = await resp.json();

  return data;
};
