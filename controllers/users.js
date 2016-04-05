'use strict';
const views = require('co-views');
const parse = require('co-body');
const users = [
    {
        id: 0,
        name: 'Steven Li'
    },
    {
        id: 1,
        name: 'Steve Jobs'
    }
];

const render = views(__dirname + '/../views', {
    map: {html: 'swig'}
});

module.exports.home = function *home() {
    this.body = yield render('list', {'users': users});
};

module.exports.list = function *list() {
    this.body = yield users;
};

module.exports.fetch = function *fetch(id) {
    const user = users[id];
    if (!user) {
        this.throw(404, 'User with id = ' + id + ' was not found');
    }
    this.body = yield user;
};

module.exports.create = function *create() {
    const user = yield parse(this);
    const id = users.push(user) - 1;
    user.id = id;
    this.redirect('back');
};

