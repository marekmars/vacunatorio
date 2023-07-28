const { sequelize,DataTypes } = require('../dataBase/bd');
const { Localidad } = require('./Localidad');

exports.DepositoNacion = sequelize.define(
  'DepositoNacion',
  {
    idDepoNacion: {
      type: DataTypes.INTEGER,
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
    tableName: 'depositonacion',
    timestamps: false,
  }
);

exports.DepositoNacion.belongsTo(Localidad, { foreignKey: 'idLocalidad' });



