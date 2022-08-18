import app from "./app.js";
import sequelize from "./src/database/db.js";

const main = async () => {
  await sequelize.sync({ alter: true });
  app.listen(process.env.PORT || 3004);
  console.log("DB conectada");
};

try {
  main();
} catch (error) {
  console.log(error);
}
