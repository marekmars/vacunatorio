const { sequelize, DataTypes } = require("../dataBase/bd");
const { Localidad } = require("./Localidad");

module.exports.Paciente = sequelize.define(
  "Paciente",
  {
    idPaciente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    genero: {
      type: DataTypes.ENUM("Masculino", "Femenino"),
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "paciente",
    timestamps: false,
  }
);

exports.Paciente.belongsTo(Localidad, { foreignKey: "idLocalidad" });
