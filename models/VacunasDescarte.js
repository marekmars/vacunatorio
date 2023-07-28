const { sequelize,DataTypes } = require('../dataBase/bd');
const { Loteprovedor } = require("./Loteprovedor");
const { Usuario } = require('./usuario');

module.exports.VacunaDescarte = sequelize.define(
    'VacunaDescarte',
    {
      idDescarte: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idLote: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      motivo: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      fechaDescarte: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      personaACargo: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      tipoLote: {
        type: DataTypes.ENUM("LoteNacion", "LoteProvincia", "LoteCentro"),
        allowNull: false,
      },
      cantVacunas: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'vacunasdescarte',
      timestamps: false,
    }
  );

  exports.VacunaDescarte.belongsTo(Loteprovedor, { foreignKey: 'idLote' });
  exports.VacunaDescarte.belongsTo(Usuario, { foreignKey: 'personaACargo' });
