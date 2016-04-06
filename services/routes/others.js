/**
 * Created by steven on 4/5/16.
 */
'use strict';

const Router = require('koa-router');
const others = require('../controllers/others');

const othersRouter = new Router({
    prefix: '/others'
});

othersRouter
    .get('/async', others.delay)
    .get('/promise', others.promise);

module.exports = othersRouter;