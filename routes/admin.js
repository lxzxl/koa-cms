/**
 * Created by steven on 4/5/16.
 */
'use strict';

const Router = require('koa-router');
const admin = require('../controllers/admin');

const othersRouter = new Router({
    prefix: '/admin'
});

othersRouter
    .get('/', admin.home);

module.exports = othersRouter;