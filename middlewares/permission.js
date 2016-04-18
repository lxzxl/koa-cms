/**
 * Created by steven on 4/14/16.
 */
'use strict';

module.exports.ensureAuthenticated = function *(next) {
    if (this.req.isAuthenticated()) {
        yield next;
    }
    this.set('X-Auth-Required', 'true');
    //FIXME: session
    this.req.session.returnUrl = this.originalUrl;
    this.redirect('/login/');
};

module.exports.ensureAdmin = function *(next) {
    if (this.req.user.canPlayRoleOf('admin')) {
        yield next;
    }
    this.status = 401;
}

module.exports.ensureAccount = function *(next) {
    if (this.req.user.canPlayRoleOf('account')) {
        if (this.app.config.requireAccountVerification) {
            if (this.req.user.roles.account.isVerified !== 'yes' && !/^\/account\/verification\//.test(this.req.url)) {
                this.redirect('/account/verification/');
            }
        }
        yield next;
    }
    this.status = 401;
};
