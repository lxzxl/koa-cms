/**
 * Created by steven on 4/5/16.
 */
'use strict';

const Router = require('koa-router');
const users = require('../controllers/users');

const usersRouter = new Router({prefix: '/users'});

usersRouter
    .get('/', users.list)
    .post('/', users.create)
    .get('/:id', users.fetch)
;

module.exports = usersRouter;