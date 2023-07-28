const { sequelize,DataTypes } = require("../dataBase/bd.js");
const { CentroVacunacion } = require("../models/CentroVacunacion.js");
const { DepoProvinciaStock } = require("./DepoProvinciaStock.js");

exports.CentroVacunacionStock = sequelize.define(
  "CentroVacunacionStock",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    idCentro: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    idSublote: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    cantVacunas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaRecepcion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    estado: {
      type: DataTypes.ENUM("enViaje", "enStock", "sinStock", "descartado"),
      allowNull: false,
      defaultValue:"enViaje"
    },
  },
  {
    tableName: "centrovacunacionstock",
    timestamps: false,
  }
);
exports.CentroVacunacionStock.belongsTo(CentroVacunacion, { foreignKey: "idCentro" });
exports.CentroVacunacionStock.belongsTo(DepoProvinciaStock, { foreignKey: "idSublote" });
