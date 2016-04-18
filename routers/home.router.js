/**
 * Created by steven on 4/5/16.
 */
'use strict';

const Router = require('koa-router');
const homeController = require('../controllers/home.controller');

const _router = new Router();

_router
    .get('/', homeController.index);

module.exports = _router;