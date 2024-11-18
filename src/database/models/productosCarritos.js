'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productosCarritos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  productosCarritos.init({
    nombre: DataTypes.STRING,
    usuario:DataTypes.STRING,
    categoria: DataTypes.STRING,
    descripcion:DataTypes.STRING,
    precio: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'productosCarritos',
  });
  return productosCarritos;
};