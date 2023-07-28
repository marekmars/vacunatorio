const{
    sequelize,
    Sequelize,
    DataTypes,
    QueryTypes,
  } = require("../dataBase/bd.js");


 exports.Laboratorio = sequelize.define('Laboratorio', {
  idLaboratorio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  pais: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
},{
    tableName: "laboratorio", 
    timestamps: false, 
  });

