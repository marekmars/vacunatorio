
const { sequelize,DataTypes } = require('../dataBase/bd.js');
const { Localidad } = require('../models/Localidad');

exports.CentroVacunacion = sequelize.define(
  'Centrovacunacion',
  {
    idCentro: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    idLocalidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: 'centrovacunacion',
    timestamps: false,
  }
);

exports.CentroVacunacion.belongsTo(Localidad, { foreignKey: 'idLocalidad' });
