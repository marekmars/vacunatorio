const { sequelize,DataTypes } = require('../dataBase/bd');
const { Localidad } = require('./Localidad');

exports.DepositoProvincia = sequelize.define(
  'DepositoProvincia',
  {
    idDepoProv: {
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
    tableName: 'depositoprovincia',
    timestamps: false,
  }
);

exports.DepositoProvincia.belongsTo(Localidad, { foreignKey: 'idLocalidad' });


