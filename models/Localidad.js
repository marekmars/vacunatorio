const { sequelize, Sequelize, DataTypes } = require("../dataBase/bd.js");

exports.Localidad = sequelize.define(
  "Localidad",
  {
    idLocalidad: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    provincia: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ciudad: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "localidad",
    timestamps: false,
  }
);