const Sequelize = require('sequelize');

module.exports = new Sequelize('node-complete', 'root', '', { 
    dialect: 'mysql', 
    host: 'localhost' 
});