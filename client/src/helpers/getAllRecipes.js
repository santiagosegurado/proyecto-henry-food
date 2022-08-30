export const getAllRecipes = async () => {
  let resp = await fetch(`https://api-food-henry.herokuapp.com/recipes`);
  const data = resp.json();

  return data;
};
