/**
 * Created by steven on 4/5/16.
 */
'use strict';

const route = require('koa-route');
const messages = require('../controllers/messages');

const routes = [
    route.get('/', messages.home),
    route.get('/messages', messages.list),
    route.get('/messages/:id', messages.fetch),
    route.post('/messages', messages.create),
    route.get('/async', messages.delay),
    route.get('/promise', messages.promise)
];

module.exports = routes;