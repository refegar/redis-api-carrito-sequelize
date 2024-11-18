
/**
 * 
 recordar codigo para crear la estructura es npx sequelize-cli model:generate --name Usuario 
 --attributes nombre:string,correo:string,edad:integer,password:string
 * pero tine que tener previo tener instalado la carpeta migrations para no te de error
 * 
 * y ya al final ya cuando haya generado la migracion este codigo npx sequelize-cli db:migrate

 */

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      correo: {
        type: Sequelize.STRING
      },
      edad: {
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.STRING
      },
      password: {
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
    await queryInterface.dropTable('Usuarios');
  }
};