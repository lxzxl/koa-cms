'use strict';
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

module.exports.list = function *list() {
    this.body = yield users;
};

module.exports.fetch = function *fetch() {
    const user = users[this.params.id];
    if (!user) {
        this.throw(404, 'User with id = ' + this.params.id + ' was not found')
    }
    this.body = yield user;
};

module.exports.create = function *create() {
    const user = yield parse(this);
    const id = users.push(user) - 1;
    user.id = id;
    this.redirect('back');
};

