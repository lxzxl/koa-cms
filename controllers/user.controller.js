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

module.exports.doSignUp = function *singUp() {
    const User = this.app.db.models.User;
    let _username = this.request.body.username;
    let _email = this.request.body.email.toLowerCase();
    // check duplicate of username.
    let user = yield User.findOne({username: _username});
    if (user) {
        this.throw(400, 'Duplicate username');
    }
    // check duplicate of email.
    user = yield User.findOne({email: _email});
    if (user) {
        this.throw(400, 'Duplicate email');
    }
    // create User
    let hash = yield User.encryptPassword(this.request.body.password);
    let userData = {
        isActive: 'yes',
        username: _username,
        email: _email,
        password: hash,
        search: [
            _username,
            _email
        ]
    };
    user = yield User.create(userData);
    //create Account
    let accountData = {
        isVerified: this.app.config.requireAccountVerification ? 'no' : 'yes',
        'name.full': user.username,
        user: {
            id: user._id,
            name: user.username
        },
        search: [
            user.username
        ]
    };
    let account = yield this.app.db.models.Account.create(accountData);
    user.roles.account = account._id;
    let r = yield user.save();

    this.body = user;
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
