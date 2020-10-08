const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express ();
const errorController = require('./controllers/error');
// const db = require('./util/database');
// const sequelize = require('./util/database');
// const Product = require('./models/product');
const User = require('./models/user');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');
const MONGODB_URI = 'mongodb+srv://She:sheosumo28@cluster0.bj9ku.mongodb.net/<dbname>';
const mongoConnect = require('./util/database').mongoConnect;
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
// const expressHbs = require('express-handlebars');

// app.engine('hbs', expressHbs(({layoutsDir: "views/layout", defaultLayout: 'main-layout', extname: 'hbs'})));
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const e = require('express');

// db.execute('SELECT * FROM products')
//     .then(result =>{
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });
// app.use((req, res,next) =>{
//     console.log("In the middleware!");
//     next();
// })

app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static(path.join(__dirname, "public")));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store:store}));

app.use((req,res,next) => {
    User.findById('5f7155a61a6df7242dedf187')
    .then(user =>{ 
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    })
    .catch(err => console.log(err))
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// Product.belongsTo(User,{constraints: true, onDelete: 'CASCADE'});
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User,{constraints: true, onDelete: 'CASCADE'});
// Cart.belongsToMany(Product, {through: CartItem});
// Product.belongsToMany(Cart, {through: CartItem});
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product,{through: OrderItem});

app.use(errorController.error404);
mongoConnect(client =>{
    // console.log(client);

    app.listen(3000);
});
// sequelize
//     // .sync({ force: true})
//     .sync()
//     .then(result =>{
//         // console.log(result);
//         return User.findByPk(1);
//     })
//     .then(user => {
//         if(!user){
//             return User.create({ name: 'She', email:'sherwinosumo@gmail.com'});
//         }
//         return user;
//     })
//     .then(user=> {
//         return user.createCart();
//     })
//     .then(cart =>{
//         app.listen(3000);
//     })
//     .catch(err =>{
//         console.log(err);
//     });
// app.use('/add-product',(req, res,next) =>{
//     res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
// })

// app.post('/product',(req, res,next) =>{
//     console.log(req.body);
//     res.redirect('/');
// })

// app.use('/',(req, res,next) =>{
//     res.send('<h1>Hello</h1>')
// })

// app.listen(3000);
// const server = http.createServer(app);


// server.listen(3000);