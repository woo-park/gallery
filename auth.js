const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
Account = mongoose.model('Account');    // once again, bringing the model

passport.use(new LocalStrategy(Account.authenticate()));  //middleware


passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
