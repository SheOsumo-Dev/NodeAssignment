// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: 'sheosumo28'
// });

// module.exports = pool.promise();


// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete', 'root', 'sheosumo28', {
//     dialect: 'mysql', host: 'localhost'
// });

// module.exports = sequelize;

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://She:sheosumo28@cluster0.bj9ku.mongodb.net/<dbname>?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected');
        _db = client.db();
        callback(client);
    })
    .catch(err => {
        console.log(err)
        throw err;
    });
};

const getDb = () =>{
    if(_db){
        return _db;
    }
    throw 'No database found!'
};

// module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;