/**
 * Created by steven on 4/5/16.
 */
'use strict';

const Router = require('koa-router');
const adminController = require('../controllers/admin.controller');
const permission = require('../middlewares/permission');

const _router = new Router({prefix: '/admin'});

_router
    .all('/', permission.ensureAuthenticated, permission.ensureAdmin)
    .get('/', adminController.home);

module.exports = _router;