const { sequelize,DataTypes } = require('../dataBase/bd');

module.exports.Enfermero = sequelize.define('Enfermero', {
    idEnfermero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idCentro: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false, 
    tableName: 'enfermero', 
  });
  
