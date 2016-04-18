/**
 * Created by steven on 4/5/16.
 */
'use strict';

const Router = require('koa-router');
const passport = require('koa-passport');

const userController = require('../controllers/user.controller');
const _router = new Router({'prefix': '/login'});

_router
    .get('/', userController.login)
    .post('/', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }))
;

module.exports = _router;