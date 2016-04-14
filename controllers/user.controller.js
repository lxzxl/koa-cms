/**
 * Created by steven on 4/14/16.
 */
'use strict';
const views = require('co-views');
const User = require('../services/models/User');

const render = views(__dirname + '/../views', {
    map: {html: 'swig'}
});

module.exports.login = function *login() {
    this.body = yield render('login', {'title': 'login page'});
};
