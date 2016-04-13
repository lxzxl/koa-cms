/**
 * Created by steven on 4/5/16.
 */
'use strict';

const Router = require('koa-router');
const otherController = require('../controllers/other.controller');

const othersRouter = new Router({
    prefix: '/others'
});

othersRouter
    .get('/async', otherController.delay)
    .get('/promise', otherController.promise);

module.exports = othersRouter;