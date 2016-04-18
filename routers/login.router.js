/**
 * Created by steven on 4/5/16.
 */
'use strict';

const Router = require('koa-router');

const userController = require('../controllers/user.controller');
const _router = new Router({'prefix': '/login'});

_router
    .get('/', userController.init)
    .post('/', userController.login)
;

module.exports = _router;