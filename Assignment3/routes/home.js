const express = require('express');
const path = require('path');
const routDir =  require('../util/path');
const router = express.Router();

router.get('/',(req, res,next) =>{
    res.sendFile(path.join(routDir, "views" ,"home.html"));
})

module.exports = router;