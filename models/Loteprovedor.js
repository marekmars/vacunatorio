const { sequelize,DataTypes } = require('../dataBase/bd');
const { Vacuna } = require("./Vacuna");
const { DepositoNacion } = require("./DepositoNacion.js");

exports.Loteprovedor = sequelize.define(
  "Loteprovedor",
  {
    idLote: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idVacuna: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaFabricacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechaVencimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("compra", "enStock", "sinStock", "descartado"),
      allowNull: false,
    },
    cantVacunas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaAdquisicion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    idDepoNacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    vencida: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "loteprovedor",
    timestamps: false,
  }
);

exports.Loteprovedor.belongsTo(Vacuna, { foreignKey: "idVacuna" });
exports.Loteprovedor.belongsTo(DepositoNacion, { foreignKey: "idDepoNacion", as: "Deposito" });


