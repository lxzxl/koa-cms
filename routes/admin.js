/**
 * Created by steven on 4/5/16.
 */
'use strict';

const route = require('koa-route');
const users = require('../controllers/users');

const routes = [
    route.get('/admin/users', users.home)
];

module.exports = routes;