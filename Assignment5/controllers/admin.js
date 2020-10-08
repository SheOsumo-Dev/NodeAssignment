const products = [];
const Product = require('../models/product');
// const User = require('../models/user');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res,next) =>{
    res.render('./admin/edit-product', {pageTitle:"Add Products", path: '/admin/add-product', title: "Add Product",activeAddProduct: true,editing: false,isAuthenticated: req.session.isLoggedIn,
    userEmail: req.session.userEmail,
    userPassword: req.session.userPassword});
    // res.sendFile(path.join(routDir, "views" ,"add-product.html"));
};

exports.postAddProduct = (req, res,next) =>{
    // console.log(req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title,price,description, imageUrl, null, req.user._id);
    product
    .save()
    // req.user.createProduct({
    //     title: title,
    //     price: price,
    //     imageUrl: imageUrl,
    //     description: description
    // })

    .then(result => {
        console.log(result);
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });
    // const product = new Product(null,title,imageUrl,price,description);
    // product
    // .save()
    // .then(() => {
    //     res.redirect('/');
    // })
    // .catch(err =>   console.log(err));
    // Product.create({
    //     title: title,
    //     price: price,
    //     imageUrl: imageUrl,
    //     description: description
    // }).then(result => {
    //     console.log(result);
    //     res.redirect('/admin/products');
    // })
    // .catch(err => {
    //     console.log(err);
    // });
};

exports.getEditProduct = (req, res,next) =>{
    console.log('edit');
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.productId;

    Product.findyById(prodId)
    .then(product =>{
        if(!product){
            return res.redirect('/');
        }
        res.render('./admin/edit-product', {title:"Edit Product", path: '/admin/edit-product',activeAddProduct: true,editing: editMode, product:product,isAuthenticated: req.session.isLoggedIn,
        userEmail: req.session.userEmail,
        userPassword: req.session.userPassword})
    })
    .catch(err =>{
        console.log(err);
    })

    // req.user
    //     .getProducts({where: { id: prodId} })
    //     .then((products) => {
    //         const product = products[0];
    //         if(!product){
    //             return res.redirect('/');
    //         }
    //         res.render('./admin/edit-product', {title:"Edit Product", path: '/admin/edit-product',activeAddProduct: true,editing: editMode, product:product,});
    //     })
    //     .catch(err => console.log(err));
    // Product.findByPk(prodId)
    //     .then((product) => {
    //         if(!product){
    //             return res.redirect('/');
    //         }
    //         res.render('./admin/edit-product', {title:"Edit Product", path: '/admin/edit-product',activeAddProduct: true,editing: editMode, product:product,});
    //     })
    //     .catch(err => console.log(err));

    // Product.findById(prodId, product =>{
    //     if(!product){
    //         return res.redirect('/');
    //     }
    //     res.render('./admin/edit-product', {title:"Edit Product", path: '/admin/edit-product',activeAddProduct: true,editing: editMode, product:product});
    // });
};

exports.postEditProduct = (req, res,next) =>{
    const prodId = req.body.productId;
    const updatedtitle = req.body.title;
    const updatedimageUrl = req.body.imageUrl;
    const updatedprice = req.body.price;
    const updateddescription = req.body.description;
    console.log(updatedtitle);
    // const updatedproduct = new Product(prodId,updatedtitle,updatedimageUrl,updatedprice,updateddescription);
    // updatedproduct.save();
    // res.redirect('/');
    // Product.findyById(prodId)
        // .then((productData) => {
            const product = new Product(updatedtitle,updatedprice,updateddescription,updatedimageUrl, prodId);
            // product.title = updatedtitle;
            // product.price = updatedprice;
            // product.imageUrl = updatedimageUrl;
            // product.description = updateddescription;
            // return product.save();
        // })
        product
        .save()
        .then(result => {
            //console.log(result)
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));

};

exports.getProducts = (req,res,next) =>{
    // req.user
    // .getProducts()
    Product.fetchAll()
    .then(products => {
        res.render('./admin/products', {prods:products, title:"Admin Products", path: '/admin/products',isAuthenticated: req.session.isLoggedIn,
        userEmail: req.session.userEmail,
        userPassword: req.session.userPassword});
    })
    .catch(err => console.log(err));
    // Product.findAll()
    // .then(products => {
    //     res.render('./admin/products', {prods:products, title:"Admin Products", path: '/admin/products'});
    // })
    // .catch(err => console.log(err));
    // // const product = Product.fetchAll(products => {
    //     res.render('./admin/products', {prods:products, title:"Admin Products", path: '/admin/products'});
    // });
}

exports.postDeleteProduct = (req,res,next) =>{
    const prodId = req.body.productId;
    Product.deleteById(prodId)
    .then(result =>{
        console.log(result);
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err))
    // Product.findByPk(prodId)
    // .then(product =>{
    //     return product.destroy();
    // })
    // .then(result =>{
    //     console.log(result);
    //     res.redirect('/admin/products');
    // })
    // .catch(err => console.log(err));
    // Product.deleteById(prodId);
    // res.redirect('/admin/products');
}