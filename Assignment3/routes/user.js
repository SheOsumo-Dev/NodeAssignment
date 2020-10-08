const express = require('express');
const path = require('path');
const router = express.Router();
const routDir =  require('../util/path');
router.get('/user',(req, res,next) =>{
    res.sendFile(path.join(routDir, "views" ,"user.html"));
})

router.post('/user',(req, res,next) =>{
    console.log(req.body);
    res.redirect('/');
})



module.exports = router;