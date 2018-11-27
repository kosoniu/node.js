const User = require('../models/userModel');

const bcrypt = require('bcrypt');

exports.getLogin = (req, res, next) => {
    if(req.session.user){
        res.redirect('/movies');
    }

    res.render('login', {
        path: '/login',
        pageTitle: 'Login',
        oldInput: {
            email: '',
            password: ''
        },
        errorMessage: null
    });
};


exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
            email: email
        })
        .then(user => {
            if (!user) {
                return res.status(422).render('login', {
                    path: '/login',
                    pageTitle: 'Login',
                    errorMessage: 'Invalid email or password.',
                    oldInput: {
                        email: email,
                        password: password
                    },
                    validationErrors: []
                });
            }

            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        matchedUser = new User(user);
                        matchedUser.resetClickedMovies();
                        // czyszczę zapisane dane, żeby po wylogowaniu i zalogowaniu się
                        // móc jeszcze raz klikać w przyciski. Defalultowo tak nie powinno być
                        // tablica która trzyma kliknięcia powinna być permamentna
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/movies');
                        });
                    }
                    return res.status(422).render('login', {
                        path: '/login',
                        pageTitle: 'Login',
                        errorMessage: 'Invalid email or password.',
                        oldInput: {
                            email: email,
                            password: password
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getSignup = (req, res, next) => {
    res.render('signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: null,
        oldInput: {
            email: '',
            password: '',
            confirmPassword: ''
        }
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (confirmPassword != password || !email ) {
        return res.status(422).render('signup', {
            path: '/signup',
            pageTitle: 'Signup',
            errorMessage: 'Błąd, spróbuj raz jeszcze',
            oldInput: {
                email: email,
                password: password,
                confirmPassword: req.body.confirmPassword
            }
        });
    }

    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword,
                cart: {
                    items: []
                }
            });
            return user.save();
        })
        .then(result => {
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/login');
    });
};