// const mongodb = require('mongodb');

// const getDB = require('../util/database').getDB;

// class User {
//     constructor( username, email, cart, id) {
//         this.name = username;
//         this.email = email;
//         this.cart = cart;
//         this._id = id;
//     }

//     save() {
//         const db = getDB();

//         return db.collection('users')
//         .insertOne(this)
//         .then( () => console.log("User inserted") )
//         .catch( error => console.log( error ));
//     }

//     addToCart( product ) {
//         const cartProductIndex = this.cart.items.findIndex( cp => {
//             return cp.productId.toString() === product._id.toString();
//         });

//         let newQuantity = 1;
//         const updatedCartItems = [...this.cart.items];

//         if (cartProductIndex >= 0) {
//             newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//             updatedCartItems[cartProductIndex].quantity = newQuantity;
//         } else {
//             updatedCartItems.push({
//                 productId: new mongodb.ObjectId(product._id),
//                 quantity: 1
//             })
//         }


//         const updatedCart = {
//             items: updatedCartItems
//         };

//         const db = getDB();
//         return db.collection('users').updateOne(
//             { _id: new mongodb.ObjectID(this._id) },
//             { $set: { cart: updatedCart } }
//         );
//     }

//     getCart() {
//         const db = getDB();
//         const productIds = this.cart.items.map(i => {
//             return i.productId;
//         });
//         return db.collection('products')
//         .find( { _id: { $in: productIds } } )
//         .toArray()
//         .then( products => {
//             return products.map( i => {
//                 return {...i,
//                     quantity: this.cart.items.find(item => {
//                         return item.productId.toString() === i._id.toString();
//                     }).quantity
//                 };
//             });
//         })
//         .catch( error => console.log( error ));
//     }

//     deleteCart(productID) {

//         const updatedCartItems = this.cart.items.filter( item => {
//             return item.productId.toString() !== productID.toString();
//         });


//         const db = getDB();
//         return db
//         .collection('users')
//         .updateOne(
//             { _id: new mongodb.ObjectID(this._id) },
//             { $set: { cart: { items: updatedCartItems } } }
//         );
//     }

//     addOrder() {
//         const db = getDB();
//         return this.getCart()
//         .then(products => {
//             const order = {
//                 items: products,
//                 user: {
//                     _id: new mongodb.ObjectID(this._id),
//                     name: this.name
//                 }
//             }

//             return db.collection('orders').insertOne(order);
//         })
//         .then( result => {
//             this.cart = {
//                 items: []
//             }

//             return db
//             .collection('users')
//             .updateOne(
//                 { _id: new mongodb.ObjectID(this._id) },
//                 { $set: { cart: { items: [] } } }
//             );
//         })
//         .catch( error => console.log(error));
//     }

//     getOrders(){
//         const db = getDB();
//         return db
//         .collection('order')
//         .find({'user._id': new mongodb.ObjectID(this._id)})
//         .toArray();
//     }


//     static findById(userID) {
//         const db = getDB();

//         return db.collection('users')
//         .findOne( {_id: mongodb.ObjectId(userID)} )
//         .then( user => {
//             return user
//         })
//         .catch( error => console.log( error ));
//     }


// }

// module.exports = User;


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [{
      productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }]
  }
});


UserSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex( cp => {
      return cp.productId.toString() === product._id.toString();
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
      updatedCartItems.push({
          productId: product._id,
          quantity: newQuantity
      })
  }

  const updatedCart = {
      items: updatedCartItems
  };

  this.cart = updatedCart;
  return this.save();
}

UserSchema.methods.removeFromCart = function(productId) {
  const updatedCartItems = this.cart.items.filter( item => {
      return item.productId.toString() !== productId.toString();
  });

  this.cart.items = updatedCartItems;
  return this.save();
}

UserSchema.methods.addOrder = function() {
  const updatedCartItems = this.cart.items.filter( item => {
      return item.productId.toString() !== productId.toString();
  });

  this.cart.items = updatedCartItems;
  return this.save();
}

UserSchema.methods.clearCart = function () {
  this.cart = {
    items: []
  }

  return this.save();
}

module.exports = mongoose.model('User', UserSchema);
