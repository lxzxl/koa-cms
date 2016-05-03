/**
 * Created by steven on 4/14/16.
 */
'use strict';
const views = require('co-views');
const passport = require('koa-passport');

const render = views(__dirname + '/../views', {
    map: {html: 'swig'}
});

module.exports.init = function *init() {
    this.body = yield render('login');
};

module.exports.signUp = function *singUp(next) {
    this.body = yield render('signUp');
};

module.exports.doSignUp = function *singUp(next) {
    // check duplicate of username.
    let user = yield this.app.db.models.User.findOne({username: this.request.body.username});
    // check duplicate of email.
    let user = yield this.app.db.models.User.findOne({email: req.body.email.toLowerCase()});
};

module.exports.login = function *login(next) {
    let ctx = this;
    yield passport.authenticate('local', function*(err, user, info) {
        if (err) throw err;
        if (user === false) {
            ctx.body = {
                success: false,
                errorMessage: info.message
            };
        } else {
            yield ctx.login(user);
            ctx.redirect('/admin');
        }
    }).call(this, next);
};

module.exports.logout = function *logout() {
    this.logout();
    this.redirect('/');
};
