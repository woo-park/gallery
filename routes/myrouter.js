const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

const { ensureAuthenticated } = require('./ensure');

Account = mongoose.model('Account');// bringing our model


// const user1 = new Account({
//   username: 'osaretin',
//   password: 'makai'
// });
//
// user1.save(function(err, db) {
//     if(err) {
//       console.log(err)
//     }
//     console.log('successively pushed')
//     console.log(db)
// });


router.get('/', function(req, res) {

  if(req.session.id){
    console.log('index page session_id is ', req.session.id); // they all share the same id
  }

  res.render('index');
});


router.get('/register', function(req, res) {
  const session_id = req.session.id || '';
  console.log('register session_id is ', req.session.id);

  res.render('register');
});



router.post('/register', function(req, res, next) {
  Account.register(   new Account({username: req.body.username}),
                      req.body.password,
                      function(err, account) {
                        if(err) {
                          res.render('register', {message:'Your registration information is invalid'});
                        } else {
                          passport.authenticate('local')(req, res, function() {
                            res.redirect('/');
                          });
                        }
                    });
});


router.get('/login', function(req, res, next) {

  res.render('login', { user : req.user });
});


// router.post('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user) {
//     if (err) { return next(err) }
//     if (!user) { return res.redirect('/login', {message:'Your login or password is incorrect.'}) }
//     req.logIn(user, function(err) {
//       if(err) {return next(err)}
//       return res.redirect('/');
//     });
//
//     // this was causing err....
//     // if(user) {
//     //   req.logIn(user, function(err) {
//     //     return res.redirect('/');
//     //
//     //   });
//     // }
//     // console.log('in here')
//     // res.render('login', {message:'Your login or password is incorrect.'});
//
//     // works as well but can't send the err message
//     // router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login', failureFlash: false}));
//
//
//   })(req, res, next);
// });

  router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}));


router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

//authenticate()'s function signature is standard Connect middleware, which makes it convenient to use as route middleware

router.get('/gallery', ensureAuthenticated ,function(req, res, next) {

    res.render('gallery');
});



// router.post('/gallery', passport.authenticate('local', { successRedirect: '/gallery', failureRedirect: '/login' }));

// router.get('/gallery', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/gallery');
//     });
//   })(req, res, next);
// });

router.get('/summary', function(req, res, next) {
  res.render('summary')
});

module.exports = router;
