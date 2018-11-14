// // SEQUELIZE
// // const Sequelize = require('sequelize');

// // const sequelize = require('../util/database');

// // const Product = sequelize.define('product', {
// //   id: {
// //     type: Sequelize.INTEGER,
// //     autoIncrement: true,
// //     allowNull: false,
// //     primaryKey: true
// //   },
// //   title: Sequelize.STRING,
// //   price: {
// //     type: Sequelize.DOUBLE,
// //     allowNull: false
// //   },
// //   imageUrl: {
// //     type: Sequelize.STRING,
// //     allowNull: false
// //   },
// //   description: {
// //     type: Sequelize.STRING,
// //     allowNull: false
// //   }
// // });

// // module.exports = Product;

// const getDB = require('../util/database').getDB;
// const mongodb = require('mongodb');

// class Product {
//   constructor(title, price, description, imageUrl, id, userID) {
//     this.description = description;
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userID = userID;
//   }

//   save() {
//     const db = getDB();
//     let dbOp;
//     if(this._id) {
//       dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this });
//     }else{
//       dbOp = db.collection('products').insertOne(this);
//     }

//     return dbOp
//     .then(result => console.log(result))
//     .catch(error => console.log(error))
//   }

//   static fetchAll() {
//     const db = getDB();
//     return db.collection('products').find().toArray()
//     .then( products => {
//       return products;
//     })
//     .catch( error => console.log(error));
//   }

//   static findById(id) {
//     const db = getDB();
//     return db.collection('products')
//     .find({_id: mongodb.ObjectId(id)})
//     .next()
//     .then(product => {
//       return product;
//     })
//     .catch(error => console.log(error));
//   }


//   static deleteById(productID) {
//     const db = getDB();

//     return db.collection('products')
//     .deleteOne({_id: new mongodb.ObjectID(productID) })
//     .then( result => {
//       console.log('Deleted Item!');
//     })
//     .catch( error => console.log( error ));
//   }


// }

// module.exports = Product;


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});


module.exports = mongoose.model('Product', productSchema);
