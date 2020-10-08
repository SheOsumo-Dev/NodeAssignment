const express = require('express');
const path = require('path');
const routDir =  require('../util/path');
const router = express.Router();
const userData = require('./user');

router.get('/',(req, res,next) =>{
    // console.log(adminData.products);
    // res.sendFile(path.join(routDir, "views" ,"shop.html"));
    // const products = adminData.products;
    const userPokemon = userData.products;
    res.render('home', {title:"Home", user:userPokemon});
})

module.exports = router;