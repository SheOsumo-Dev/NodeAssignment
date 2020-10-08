const http = require('http');

const express = require('express');

const app = express();

// app.use((req, res,next) =>{
//     console.log("1st Function");
//     next();
// });

// app.use((req, res,next) =>{
//     console.log("2nd Function");
// });


    
app.use('/users', (req, res,next) =>{
    console.log("Users Page");
    res.send('<h1>Users</h1>');
});

app.use('/', (req, res,next) =>{
    console.log("Home Page");
    res.send('<h1>Home Page</h1>');
});



app.listen(3000);
// const server = http.createServer(app);


// server.listen(3000);