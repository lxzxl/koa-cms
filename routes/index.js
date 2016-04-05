/**
 * Created by steven on 4/5/16.
 */
'use strict';
const fs = require('fs');
const userRoutes = require('./users');

module.exports = function (app) {
    userRoutes.forEach(r => app.use(r));
};