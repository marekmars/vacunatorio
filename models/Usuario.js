const{
    sequelize,
    Sequelize,
    DataTypes,
    QueryTypes,
  } = require("../dataBase/bd.js");
  
  exports.Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'usuario', // Especifica el nombre exacto de la tabla en la base de datos
  });