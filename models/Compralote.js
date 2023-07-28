const { sequelize, DataTypes } = require("../dataBase/bd.js");
const { Loteprovedor } = require("./Loteprovedor.js");

exports.Compralote = sequelize.define(
  "Compralote",
  {
    idCompra: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idLote: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaCompra: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cantVacunas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "compralote",
    timestamps: false,
  }
);

exports.Compralote.belongsTo(Loteprovedor, { foreignKey: "idLote" });