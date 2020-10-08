
const Product = require('../models/product');
// const Cart = require('../models/cart-item');
// const Order = require('../models/order' );
const e = require('express');
const User = require('../models/user');

exports.getProducts = (req, res,next) =>{
    // console.log(adminData.products);
    // res.sendFile(path.join(routDir, "views" ,"shop.html"));
    // const products = adminData.products;
    // const product = Product.fetchAll(products => {
    //     res.render('./shop/product-list', {prods:products, title:"Shop", path: '/products'});
    // });
    Product.fetchAll()
    .then(products => {
        res.render('./shop/product-list', {prods:products, title:"Shop", path: '/products',activeShop: true,isAuthenticated: req.session.isLoggedIn,
        userEmail: req.session.userEmail,
        userPassword: req.session.userPassword})
    })
    .catch(err => console.log(err));
    // Product.fetchAll()
    // .then(([rows, fieldData]) => {
    //     res.render('./shop/product-list', {prods:rows, title:"Shop", path: '/products'});
    // })
    // .catch(err => console.log(err));
};

exports.getProduct = (req, res,next) =>{
    const prodId = req.params.productId;

    // Product.findById(prodId, product=>{
    //     res.render('./shop/product-detail', {product:product,title:"Product Detail", path: '/products'});
    // });
    Product.findyById(prodId)
        .then((product) => {
            res.render('./shop/product-detail', {product:product,title:product.title, path: '/products',isAuthenticated: req.session.isLoggedIn,
            userEmail: req.session.userEmail,
            userPassword: req.session.userPassword});
        })
        .catch(err => console.log(err));
    // Product.findByPk(prodId)
    // .then((product) => {
    //     res.render('./shop/product-detail', {product:product,title:"Product Detail", path: '/products'});
    // })
    // .catch(err => console.log(err));
    // Product.findById(prodId)
    // .then(([product]) => {
    //     res.render('./shop/product-detail', {product:product[0],title:"Product Detail", path: '/products'});
    // })
    // .catch(err => console.log(err));
};

exports.getIndex = (req,res,next) =>{
    Product.fetchAll()
    .then(products => {
        res.render('./shop/index', {prods:products, title:"Shop", path: '/',activeShop: true,isAuthenticated: req.session.isLoggedIn,
        userEmail: req.session.userEmail,
        userPassword: req.session.userPassword})
    })
    .catch(err => console.log(err));
    // Product.fetchAll()
    // .then(([rows, fieldData]) => {
    //     res.render('./shop/index', {prods:rows, title:"Shop", path: '/',activeShop: true});

    // })
    // .catch(err => console.log(err));
    // const product = Product.fetchAll(products => {
    //     res.render('./shop/index', {prods:products, title:"Shop", path: '/', hasProducts: products.length > 0,activeShop: true});
    // });
};

exports.getCart = (req,res,next) =>{
    console.log('Cart');
    req.user
    .getCart()
    .then(products =>{
            res.render('./shop/cart', {products:products, title:"Your Cart", path: '/cart',isAuthenticated: req.session.isLoggedIn,
            userEmail: req.session.userEmail,
            userPassword: req.session.userPassword});
    })
    .catch(err => console.log(err));
    // console.log('Cart');
    // req.user
    // .getCart()
    // .then(cart =>{
    //     return cart
    //     .getProducts()
    //     .then(products => {
    //         res.render('./shop/cart', {products:products, title:"Your Cart", path: '/cart'});
    //     })
    //     .catch(err => console.log(err));
    // })
    // .catch(err => console.log(err));
    // Cart.getCart(cart =>{
    //     Product.fetchAll(products => {
    //         const cartProduct = []
    //         for(product of products){
    //             const cartProductData = cart.products.find(prod => prod.id === product.id);
    //             if(cartProductData){
    //                 cartProduct.push({productData:product,qty: cartProductData.qty});
    //             }
    //         }
    //         res.render('./shop/cart', {products:cartProduct, title:"Your Cart", path: '/cart'});
    //     });
    // });
};

exports.postCart = (req, res,next) =>{
    const postProdId = req.body.productId;
    Product.findyById(postProdId)
    .then(product =>{
        return req.user.addToCart(product);
    })
    .then(result =>{
        res.redirect('/cart');
        console.log(result);
    })
    .catch(err => console.log(err));
    // let fetchedCart;
    // //console.log(postProdId);
    // let newQuantity = 1
    // req.user
    // .getCart()
    // .then(cart =>{
    //     fetchedCart = cart;
    //     return cart.getProducts({  where: { id: postProdId}})
    //     })
    //     .then(products => {
    //         let product;
    //         if(products.length > 0){
    //             product = products[0];
    //             console.log("New Item");
    //         }
    //         if(product){
    //             console.log("Old Item");
    //             const oldQuantity = product.cartItem.quantity;
    //             newQuantity = oldQuantity + 1;
    //             return product;
    //         }
    //         return Product.findByPk(postProdId);
    //     })
    //         .then(product =>{
    //             return fetchedCart.addProduct(product,{
    //                 through: {quantity:newQuantity}
    //             });
    //     })
    //     .then(() =>{
    //         res.redirect('/cart');
    //     })
    //     .catch(err => console.log(err));
    // Product.findById(postProdId, (product)=>{
    //     Cart.addProduct(postProdId, product.price);
    // });
    // res.redirect('./cart');
};

exports.postCartDeleteProduct = (req, res,next) =>{
    const postDeleteProdId = req.body.productId;
    req.user
    .deleteItemFromCart(postDeleteProdId)
    .then(result =>{
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
    // req.user
    // .getCart()
    // .then(cart =>{
    //     return cart.getProducts({ where: {id: postDeleteProdId}});
    // })
    // .then(products =>{
    //     const product = products[0];
    //     return product.cartItem.destroy();
    // })
    // .then(result =>{
    //     res.redirect('/cart');
    // })
    // .catch(err => console.log(err));
    // Product.findById(postDeleteProdId,product =>{
    //     Cart.deleteProduct(postDeleteProdId, product.price);
    //     res.redirect('/cart');
    // })
    //console.log(postProdId);
};

exports.postOrder = (req,res,next) =>{
    req.user
    .addOrder()
    .then(result =>{
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
    // let fetchedCart;
    // req.user
    // .getCart()
    // .then(cart =>{
    //     fetchedCart = cart;
    //     return cart.getProducts()
    // })
    // .then(products =>{
    //     return req.user
    //     .createOrder()
    //     .then(order =>{
    //         return order.addProducts(
    //             products.map(product =>{
    //                 product.orderItem = { quantity: product.cartItem.quantity};
    //                 return product;
    //             })
    //         );
    //     })
    //     .catch(err => console.log(err));
    // })
    // .then(result =>{
    //     return fetchedCart.setProducts(null);
    // })
    // .then(result =>{

    //     res.redirect('/orders');
    // })
    // .catch(err => console.log(err));
};


exports.getOrders = (req,res,next) =>{
    req.user
    .getOrders({include: ['products']})
    .then(orders =>{
        res.render('./shop/orders', {title:"Orders", path: '/orders', orders:orders,isAuthenticated: req.session.isLoggedIn,
        userEmail: req.session.userEmail,
        userPassword: req.session.userPassword});
    })
    .catch(err => console.log(err));
    
    // const product = Product.fetchAll(products => {
    //     res.render('./shop/orders', {prods:products, title:"Orders", path: '/orders'});
    // });
};

exports.getCheckout = (req,res,next) =>{
    const product = Product.fetchAll(products => {
        res.render('./shop/checkout', {prods:products, title:"Checkout", path: '/checkout',isAuthenticated: req.session.isLoggedIn,
        userEmail: req.session.userEmail,
        userPassword: req.session.userPassword});
    });
};