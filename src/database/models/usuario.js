'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Usuario.init({
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    password: DataTypes.STRING,
    token:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuario;
};