/**
 * Created by steven on 4/5/16.
 */
'use strict';

const Router = require('koa-router');
const passport = require('koa-passport');

const userController = require('../controllers/user.controller');
const loginRouter = new Router({'prefix': '/login'});

loginRouter
    .get('/', userController.login)
    .post('/', passport.authenticate('local', {
        successRedirect: '/service/others/async',
        failureRedirect: '/service/others/promise'
    }))
;

module.exports = loginRouter;