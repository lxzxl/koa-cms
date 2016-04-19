/**
 * Created by steven on 4/14/16.
 */
'use strict';

module.exports.ensureAuthenticated = function *(next) {
    if (this.isAuthenticated()) {
        yield next;
    } else {
        this.set('X-Auth-Required', 'true');
        //FIXME: session
        this.session.returnUrl = this.originalUrl;
        this.redirect('/');
    }
};

module.exports.ensureAdmin = function *(next) {
    if (this.req.user.canPlayRoleOf('admin')) {
        yield next;
    } else {
        this.status = 401;
    }
};

module.exports.ensureAccount = function *(next) {
    if (this.req.user.canPlayRoleOf('account')) {
        if (this.app.config.requireAccountVerification) {
            if (this.req.user.roles.account.isVerified !== 'yes' && !/^\/account\/verification\//.test(this.req.url)) {
                this.redirect('/account/verification/');
            }
        }
        yield next;
    } else {
        this.status = 401;
    }
};
