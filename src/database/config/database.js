// database.js
const { Sequelize } = require('sequelize');
const config = require('./config');  // Asegúrate de usar la ruta correcta

// Escoge el entorno, en este caso "development"
const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: config.development.dialect,
        port: config.development.port,
    }
);

module.exports = sequelize;
