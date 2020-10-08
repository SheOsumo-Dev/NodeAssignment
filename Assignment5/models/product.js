// // const fs = require('fs');
// // const path = require('path');
// // const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
// const Cart = require('./cart');
// const db = require('../util/database');
// // const getProductsFromFile = cb =>{
// //     fs.readFile(p, (err,fileContent) =>{
// //         if(err){
// //             return cb([]);
// //         }
// //         else{
// //             cb(JSON.parse(fileContent));
// //         }
// //     });
// // };

// module.exports = class Product{
//     constructor(id,t, imageUrl, price, description){
//         this.id = id;
//         this.title = t;
//         this.imageUrl = imageUrl;
//         this.price = price;
//         this.description = description;
//     }

//     save(){
//         return db.execute('INSERT INTO products (title, price, imageUrl,description) VALUES (?, ?, ?, ?)',
//         [this.title,this.price,this.imageUrl,this.description]
//         );
//         // products.push(this);
//         // getProductsFromFile(products =>{
//         //     //console.log(this.id);
//         //     if(this.id){
//         //         const existingProductIndex = products.findIndex(prod => prod.id === this.id);
//         //         const updatedProducts = [...products];
//         //         updatedProducts[existingProductIndex] = this;
//         //         fs.writeFile(p, JSON.stringify(updatedProducts), err =>{
//         //             //console.log(err);

//         //         });
//         //     } else {
//         //             this.id = Math.random().toString;
//         //             products.push(this);
//         //             fs.writeFile(p, JSON.stringify(products), err =>{
//         //             //console.log(err);
//         //         });
//         //     }
//         // });


//         // // const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
//         // // fs.readFile(p, (err,fileContent) =>{
//         //     // let products = [];
//         //     // if (!err){
//         //     //     products = JSON.parse(fileContent);
//         //     // }
//         //     // products.push(this);
//         //     // fs.writeFile(p, JSON.stringify(products), (err) =>{
//         //     //     console.log(err);
//         //     // });
//         // // })
//     }


//     static deleteById(id){
//         // getProductsFromFile(products =>{
//         //     const product = products.find(prod => prod.id === id);
//         //     console.log(product);
//         //     const updatedProducts = products.filter(prod => prod.id !== id);
//         //     fs.writeFile(p, JSON.stringify(updatedProducts), err =>{
//         //         if(!err){
//         //             Cart.deleteProduct(id,product.price);
//         //         }
//         //     })
//         // });
//     }
//     static fetchAll(cb){
//         // getProductsFromFile(cb);
//         return db.execute('SELECT * FROM products');
//     //     .then(result =>{
//     //                 console.log(result);
//     //             })
//     //             .catch(err => {
//     //                 console.log(err);
//     //             });
//     // }
//     }

//     static findById(id, cb){
//     //     getProductsFromFile(products =>{
//     //         const product = products.find(p => p.id === id);
//     //         cb(product);
//     //     });
//     return db.execute('SELECT * FROM products where products.id = ?',[id]);

//     }
// }

// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Product{
    constructor(title,price,description,imageUrl,id, userId)
    {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id =  id ? new ongodb.ObjectId(id): null;
        this.userId = userId;
    }

    save(){
        const db = getDb();
        let dbOp;
        if(this._id){
            console.log("Edited");
            dbOp = db
            .collection('products')
            .updateOne({ _id: this._id}, {$set: this});
        } else {
            dbOp = db
            .collection('products')
            .insertOne(this)
        }
        return dbOp
        .then(result =>{
            //console.log(result);
        })
        .catch(err => console.log(err));
    }

    static fetchAll(){
        const db = getDb();
        return db.collection('products')
        .find()
        .toArray()
        .then(products =>{
            return products;
        })
        .catch(err =>{
            console.log(err);
        })
    }

    static findyById(prodId){
        const db = getDb();
        return db.collection('products')
        .find({ _id: mongodb.ObjectId(prodId)})
        .next()
        .then(product =>{
            return product;
        })
        .catch(err =>{
            console.log(err);
        })
    }

    static deleteById(prodId){
        const db = getDb();
        return db
        .collection('products')
        .deleteOne({ _id: new mongodb.ObjectId(prodId)})
        .then(result =>{
            console.log('Deleted');
        })
        .catch(err =>{
            console.log(err);
        })
    }
}
// const Product = sequelize.define('product',{
//     id:{
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     title:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     price:{
//         type: Sequelize.DOUBLE,
//         allowNull: false
//     },
//     imageUrl:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// });

module.exports = Product;