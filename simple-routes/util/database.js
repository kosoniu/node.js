// SQL
// const Sequelize = require('sequelize');

// module.exports = new Sequelize('node-complete', 'root', '', { 
//     dialect: 'mysql', 
//     host: 'localhost' 
// });


// NoSQL
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = ( callback ) => {
    MongoClient.connect('mongodb+srv://kosoniu:admin@testcluster-dfhlg.gcp.mongodb.net/test?retryWrites=true')
    .then( client => {
        console.log('Connected')
        _db = client.db();
        callback();
    })
    .catch( error => {
        console.log( error )
        throw error;
    })
};

const getDB = () => {
    if(_db){
        return _db;
    }
    throw 'No databse found!';
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;


