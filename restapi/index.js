import app from "./app.js";
import sequelize from "./src/database/db.js";


const main = async () => {
  await sequelize.sync({ alter: true });
  app.listen(3000);
  console.log("DB conectada");
};

try {
  main();
} catch (error) {
  console.log(error);
}
