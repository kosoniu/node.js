const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById(1)
    .then( user =>{
        req.user = user;
        next();
    })
    .catch( error => console.log(error));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
    // .sync({ force: true })
    .sync()
    .then( result => {
        return User.findById(1);
    })
    .then( user => {
        if( !user){
             return User.create({name: "Karol", email: "test@test.pl"})
        }

        return user;
    })
    .then( user => {
        // console.log(user.dataValues);

        return user.createCart();
    })
    .then( cart => {
        app.listen(3000);
    })
    .catch( error => {
        console.log(error);
    });



