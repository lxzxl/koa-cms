'use strict';
const views = require('co-views');
const User = require('../services/models/User');

const render = views(__dirname + '/../views', {
    map: {html: 'swig'}
});

module.exports.home = function *home() {
    let users = yield User.find().exec();
    this.body = yield render('list', {'users': users});
};
