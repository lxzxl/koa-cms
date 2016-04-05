/**
 * Created by steven on 4/5/16.
 */
'use strict';

const route = require('koa-route');
const others=require('../controllers/others');

const routes = [
    route.get('/async', others.delay),
    route.get('/promise', others.promise)
];

module.exports = routes;