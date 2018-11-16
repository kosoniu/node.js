const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendGrid = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const { validationResult } = require('express-validator/check');


const User = require('../models/user');

const transporter = nodemailer.createTransport(sendGrid({
  auth: {
    api_key: 'SG.U-aE9F9WQReB9z_BBqSHCA.sANcqAAcvLqrHAq0HTC2qZLNxYExHWN9-pxrbbL_rWA'
  }
}));

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: req.flash('error')
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup'
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          req.flash('error', 'Invalid email or password.');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log(errors.array());
    return res.status(422).render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: errors.array()
    });
  }

  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          return transporter.sendMail({
            to: email,
            from: 'shop@node-complete.com',
            subject: 'Signup succeeded!',
            html: '<h1>You sucessfully signed up!</h1>'
          });
        })
        .then( send => {
          // console.log(send)
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};


exports.getReset = (req, res, next) => {
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset password',
    errorMessage: req.flash('error')
  });
};


exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (error, buffer) => {
    if(error){
      console.log(error);
      return res.redirect('/reset');
    }else{
      const token = buffer.toString('hex');
      User.findOne({ email: req.body.email })
      .then( user => {
        if(!user){
          req.flash('error', 'No account with that email found.');
          return res.redirect('/reset');
        }else{
          user.resetToken = token;
          user.resetTokenExpiration = Date.now() + 3600000;
          return user.save();
        }
      })
      .then( result => {
        res.redirect('/');
        transporter.sendMail({
          to: req.body.email,
          from: 'shop@node-complete.com',
          subject: 'Reset password!',
          html: `
          <p>You requested a password reset<p>
          <p>Click this <a href="http://localhost:3000/reset/${ token }">link</a> to set a new password<p>
          `
        });
      })
      .catch( error => {
        console.log(error);
      });
    }
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ 
    resetToken: token,
    resetTokenExpiration: {$gt: Date.now()}
   })
  .then( user => {
    res.render('auth/new-password', {
      path: '/new-password',
      pageTitle: 'New password',
      errorMessage: req.flash('error'),
      userId: user._id.toString(),
      passwordToken: token
    });
  })
  .catch( error => console.log(error));
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: {$gt: Date.now()},
    _id: userId
  })
  .then( user => {
    resetUser = user;
    return bcrypt.hash(newPassword, 12);
  })
  .then( hashedPassword => {
    console.log(resetUser);
    resetUser.password = hashedPassword;
    resetUser.resetToken = undefined;
    resetUser.resetTokenExpiration = undefined;
    return resetUser.save();
  })
  .then( result => {
    res.redirect('/login');
  })
  .catch(error => console.log(error));
};