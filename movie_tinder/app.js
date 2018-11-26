const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

const app = express();
// const csrfProtection = csrf();

const User = require('./models/userModel');

const MONGODB_URI =
    'mongodb+srv://kosoniu:admin@testcluster-dfhlg.gcp.mongodb.net/movietinder?retryWrites=true';

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const movieRouter = require('./routes/movieRouter');
const userRouter = require('./routes/userRouter');

// app.use(bodyParser.urlencoded({
//     extended: false
// }));
app.use(bodyParser.json());

app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

app.use((req, res, next) => {
  User.findById('5bfc6b35d6d97c3e5481c4e0')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});


// app.use(csrfProtection);
// app.use((req, res, next) => {
//     res.locals.csrfToken = req.csrfToken();
//     next();
// });

app.use(movieRouter);
app.use(userRouter);

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true
    })
    .then(result => {
        User.findOne()
        .then(user => {
            if (!user) {
                const user = new User({
                    name: 'Karol',
                    email: 'test@test.com'
                });
                user.save();
            }
        });
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
