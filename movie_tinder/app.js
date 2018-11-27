const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();

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
const authRouter = require('./routes/authRouter');

app.use(bodyParser.urlencoded({
    extended: false
}));
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
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
});


app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        });
});

app.use(movieRouter);
app.use(authRouter);

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true
    })
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
