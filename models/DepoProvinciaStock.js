const { sequelize,DataTypes } = require('../dataBase/bd');
const { DepositoProvincia } = require('./DepositoProv');
const { Loteprovedor } = require('./Loteprovedor');

exports.DepoProvinciaStock = sequelize.define(
  'DepoProvinciaStock',
  {
    idDepoProv: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idLote: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantVacunas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("enViaje", "enStock", "sinStock", "descartado"),
      allowNull: false,
      defaultValue:"enViaje"
    },
    fechaRecepcion: {
      type: DataTypes.DATE,
      allowNull: true,
      
    },
  },
  {
    tableName: 'depoprovinciastock',
    timestamps: false,
    primaryKey: false,
  }
);

exports.DepoProvinciaStock.belongsTo(DepositoProvincia, { foreignKey: 'idDepoProv' });
exports.DepoProvinciaStock.belongsTo(Loteprovedor, { foreignKey: 'idLote' });

