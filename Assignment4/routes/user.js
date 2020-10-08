const express = require('express');
const path = require('path');
const router = express.Router();
const routDir =  require('../util/path');
const products = [];
router.get('/user',(req, res,next) =>{
    res.render('user',{title:"User"});
})

router.post('/user',(req, res,next) =>{
    // console.log(req.body);
    products.push({title:req.body.title});
    res.redirect('/');
})



// module.exports = router;
exports.routes = router;
exports.products = products;