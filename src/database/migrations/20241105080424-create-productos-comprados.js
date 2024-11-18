/**
 npx sequelize-cli model:generate --name productosComprados --attributes nombre:string,categoria:string,precio:string,cantidad:string,envio:string,precioTotal:string,usuario:string

 */

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('productosComprados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      categoria: {
        type: Sequelize.STRING
      },
      precio: {
        type: Sequelize.STRING
      },
      cantidad: {
        type: Sequelize.STRING
      },
      envio: {
        type: Sequelize.STRING
      },
      precioTotal: {
        type: Sequelize.STRING
      },
      usuario: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('productosComprados');
  }
};