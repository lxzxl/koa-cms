'use strict';
const passport = require('koa-passport');
const User = require('../services/models/User');

User.findOne({username: 'test'}, function (err, testUser) {
    if (!testUser) {
        console.log('test user did not exist; creating test user...');
        testUser = new User({
            username: 'test',
            password: 'test'
        });
        testUser.save();
    }
});

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, done);
});

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({username: username, password: password}, done);
}));

// const FacebookStrategy = require('passport-facebook').Strategy
// passport.use(new FacebookStrategy({
//     clientID: 'your-client-id',
//     clientSecret: 'your-secret',
//     callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/facebook/callback'
//   },
//   function(token, tokenSecret, profile, done) {
//     // retrieve user
//     User.findOne({ facebook_id: profile.id }, done);
//   }
// ))

// const TwitterStrategy = require('passport-twitter').Strategy
// passport.use(new TwitterStrategy({
//     consumerKey: 'your-consumer-key',
//     consumerSecret: 'your-secret',
//     callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/twitter/callback'
//   },
//   function(token, tokenSecret, profile, done) {
//     // retrieve user
//     User.findOne({ twitter_id: profile.id }, done);
//   }
// ))

// const GoogleStrategy = require('passport-google-auth').Strategy
// passport.use(new GoogleStrategy({
//     clientId: 'your-client-id',
//     clientSecret: 'your-secret',
//     callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback'
//   },
//   function(token, tokenSecret, profile, done) {
//     // retrieve user
//     User.findOne({ google_id: profile.id }, done);
//   }
// ))

module.exports = passport;