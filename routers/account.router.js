/**
 * Created by steven on 4/5/16.
 */
'use strict';

const Router = require('koa-router');

const permission = require('../middlewares/permission');
const userController = require('../controllers/user.controller');
const _router = new Router({prefix: '/account'});

_router
    .all('/', permission.ensureAuthenticated, permission.ensureAccount)
    .get('/', function*() {
        this.body = 'account page.'
    })
;

module.exports = _router;