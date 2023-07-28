const{
    sequelize,
    Sequelize,
    DataTypes,
    QueryTypes,
  } = require("../dataBase/bd.js");

  const { Laboratorio } = require("./Laboratorio");

  exports.Vacuna = sequelize.define(
  "Vacuna",
  {
    idVacuna: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idLaboratorio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipoVacuna: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nombreComercial: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    paisOrigen: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "vacuna", 
    timestamps: false, 
  }
);

exports.Vacuna.belongsTo(Laboratorio, { foreignKey: "idLaboratorio" });

