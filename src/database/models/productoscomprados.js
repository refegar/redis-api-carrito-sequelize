'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productosComprados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  productosComprados.init({
    nombre: DataTypes.STRING,
    categoria: DataTypes.STRING,
    precio: DataTypes.STRING,
    cantidad: DataTypes.STRING,
    envio: DataTypes.STRING,
    precioTotal: DataTypes.STRING,
    usuario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'productosComprados',
  });
  return productosComprados;
};