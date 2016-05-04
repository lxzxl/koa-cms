'use strict';

const LocalStrategy = require('passport-local').Strategy;
// const TwitterStrategy = require('passport-twitter').Strategy;
// const GitHubStrategy = require('passport-github').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const TumblrStrategy = require('passport-tumblr').Strategy;

module.exports = function (app, passport) {
    const User = app.db.models.User;
    passport.use(new LocalStrategy(
        function (username, password, done) {
            var conditions = {isActive: true};
            if (username.indexOf('@') === -1) {
                conditions.username = username;
            }
            else {
                conditions.email = username.toLowerCase();
            }
            let _user;
            User.findOne(conditions)
                .then(function (user) {
                        if (!user) {
                            return done(null, false, {message: 'Unknown user'});
                        }
                        _user = user;
                        return User.validatePassword(password, _user.password);
                    }
                )
                .then(function (isValid) {
                    if (!isValid) {
                        return done(null, false, {message: 'Invalid password'});
                    }
                    return done(null, _user);
                }, function (err) {
                    return done(err);
                });
        }
    ));

    // if (app.config.oauth.twitter.key) {
    //     passport.use(new TwitterStrategy({
    //             consumerKey: app.config.oauth.twitter.key,
    //             consumerSecret: app.config.oauth.twitter.secret
    //         },
    //         function (token, tokenSecret, profile, done) {
    //             done(null, false, {
    //                 token: token,
    //                 tokenSecret: tokenSecret,
    //                 profile: profile
    //             });
    //         }
    //     ));
    // }
    //
    // if (app.config.oauth.github.key) {
    //     passport.use(new GitHubStrategy({
    //             clientID: app.config.oauth.github.key,
    //             clientSecret: app.config.oauth.github.secret,
    //             customHeaders: {"User-Agent": app.config.projectName}
    //         },
    //         function (accessToken, refreshToken, profile, done) {
    //             done(null, false, {
    //                 accessToken: accessToken,
    //                 refreshToken: refreshToken,
    //                 profile: profile
    //             });
    //         }
    //     ));
    // }
    //
    // if (app.config.oauth.facebook.key) {
    //     passport.use(new FacebookStrategy({
    //             clientID: app.config.oauth.facebook.key,
    //             clientSecret: app.config.oauth.facebook.secret
    //         },
    //         function (accessToken, refreshToken, profile, done) {
    //             done(null, false, {
    //                 accessToken: accessToken,
    //                 refreshToken: refreshToken,
    //                 profile: profile
    //             });
    //         }
    //     ));
    // }
    //
    // if (app.config.oauth.google.key) {
    //     passport.use(new GoogleStrategy({
    //             clientID: app.config.oauth.google.key,
    //             clientSecret: app.config.oauth.google.secret
    //         },
    //         function (accessToken, refreshToken, profile, done) {
    //             done(null, false, {
    //                 accessToken: accessToken,
    //                 refreshToken: refreshToken,
    //                 profile: profile
    //             });
    //         }
    //     ));
    // }
    //
    // if (app.config.oauth.tumblr.key) {
    //     passport.use(new TumblrStrategy({
    //             consumerKey: app.config.oauth.tumblr.key,
    //             consumerSecret: app.config.oauth.tumblr.secret
    //         },
    //         function (token, tokenSecret, profile, done) {
    //             done(null, false, {
    //                 token: token,
    //                 tokenSecret: tokenSecret,
    //                 profile: profile
    //             });
    //         }
    //     ));
    // }

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({_id: id}).populate('roles.admin').populate('roles.account').exec(function (err, user) {
            if (user && user.roles && user.roles.admin) {
                user.roles.admin.populate("groups", function (err, admin) {
                    done(err, user);
                });
            }
            else {
                done(err, user);
            }
        });
    });
};
