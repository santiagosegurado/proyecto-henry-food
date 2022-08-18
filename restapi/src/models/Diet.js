import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";


const Diet = sequelize.define("diet", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

export default Diet;
