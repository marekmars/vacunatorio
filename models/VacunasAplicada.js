const { sequelize,DataTypes } = require('../dataBase/bd');
const { Paciente } = require("./Paciente");
const { Enfermero } = require("./Enfermero");
const { Loteprovedor } = require("./Loteprovedor");
const { CentroVacunacion } = require("./CentroVacunacion");
const {CentroVacunacionStock}=require("./CentroVacunacionStock")

module.exports.VacunasAplicadas = sequelize.define(
  "VacunasAplicadas",
  {
    idAplicacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fechaAplicacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    idPaciente: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    idEnfermero: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    idLote: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    idLoteCentro: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idCentro: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
  },
  {
    tableName: "vacunasaplicadas",
    timestamps: false,
  }
);


exports.VacunasAplicadas.belongsTo(Paciente, { foreignKey: "idPaciente" });
exports.VacunasAplicadas.belongsTo(Enfermero, { foreignKey: "idEnfermero" });
exports.VacunasAplicadas.belongsTo(Loteprovedor, { foreignKey: "idLote" });
exports.VacunasAplicadas.belongsTo(CentroVacunacion, { foreignKey: "idCentro" });
exports.VacunasAplicadas.belongsTo(CentroVacunacionStock, { foreignKey: "idLoteCentro" });