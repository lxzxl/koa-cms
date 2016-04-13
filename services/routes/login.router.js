/**
 * Created by steven on 4/5/16.
 */
'use strict';

const Router = require('koa-router');
const passport = require('koa-passport');

const loginRouter = new Router({'prefix': '/login'});

loginRouter
    .post('/', passport.authenticate('local', {
        successRedirect: '/service/others/async',
        failureRedirect: '/service/others/promise'
    }))
;

module.exports = loginRouter;