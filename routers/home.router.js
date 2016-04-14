/**
 * Created by steven on 4/5/16.
 */
'use strict';

const Router = require('koa-router');
const homeController = require('../controllers/home.controller.js');

const homeRouter = new Router();

homeRouter
    .get('/', homeController.index);

module.exports = homeRouter;