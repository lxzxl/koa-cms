/**
 * Created by steven on 4/5/16.
 */
'use strict';

const route = require('koa-route');
const users = require('../controllers/users');

const routes = [
    route.get('/users', users.list),
    route.get('/users/:id', users.fetch),
    route.get('/users/', users.home),
    route.post('/users', users.create)
];

module.exports = routes;