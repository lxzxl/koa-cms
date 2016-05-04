/**
 * Created by steven on 4/14/16.
 */
'use strict';
const views = require('co-views');

const render = views(__dirname + '/../views', {
    map: {html: 'swig'}
});

module.exports.index = function *login() {
    this.body = yield render('home', {
        content: 'home page',
        user: this.req.user,
        isAuthenticated: this.isAuthenticated()
    });
};