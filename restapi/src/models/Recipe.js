import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import Diet from "./Diet.js";

// Maximo id 1879
const Recipe = sequelize.define("recipe", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resume: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  healthScore: {
    type: DataTypes.INTEGER,
  },
  steps: {
    type: DataTypes.JSON,
  },
});

Recipe.belongsToMany(Diet, { through: 'RecipeDiet' });
Diet.belongsToMany(Recipe, { through: 'RecipeDiet' });

export default Recipe;
