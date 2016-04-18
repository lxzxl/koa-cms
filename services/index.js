/**
 * Created by steven on 4/6/16.
 */
'use strict';

const mount = require('koa-mount');

const permission = require('../middlewares/permission');
const router = require('./routers');

const mountApp = function (app, prefix, options) {
    options = options || {};
    if (options.authRequired) {
        this.router.use(permission.ensureAuthenticated);
    }
    app.use(mount(prefix, this.router.middleware()));
};

module.exports = {router, mountApp};
