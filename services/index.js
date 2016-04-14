/**
 * Created by steven on 4/6/16.
 */
'use strict';

const mount = require('koa-mount');

const router = require('./routers');

const mountApp = function (app, prefix, options) {
    options = options || {};
    if (options.authRequired) {
        this.router.use(function*(next) {
            if (this.isAuthenticated()) {
                yield next;
            } else {
                this.status = 401;
            }
        });
    }
    app.use(mount(prefix, this.router.middleware()));
};

module.exports = {router, mountApp};
