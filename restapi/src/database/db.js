import Sequelize from "sequelize";
import 'dotenv/config';

const { DB_USER, DB_PASSWORD, DB_HOST, API_KEY } = process.env;

const sequelize = new Sequelize("food", DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
});

export default sequelize;
