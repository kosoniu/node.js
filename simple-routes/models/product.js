// SEQUELIZE
// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

// module.exports = Product;

const getDB = require('../util/database').getDB;

class Product {
  constructor(title, price, description, imageUrl) {
    this.description = description;
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  save() {
  }
}

module.exports = Product;