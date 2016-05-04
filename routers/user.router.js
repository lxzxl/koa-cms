/**
 * Created by steven on 4/5/16.
 */
'use strict';

const Router = require('koa-router');

const userController = require('../controllers/user.controller');
const _router = new Router();

_router
    .get('/signup',userController.signUp)
    .post('/signup',userController.doSignUp)
    .get('/login', userController.init)
    .post('/login', userController.login)
    .get('/logout', userController.logout)
;

module.exports = _router;