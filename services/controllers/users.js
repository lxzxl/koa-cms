'use strict';
const parse = require('co-body');
const User = require('../models/users');
const Group = require('../models/groups');

User.findOne({name: 'test'}, function (err, testUser) {
    if (!testUser) {
        console.log('test user did not exist; creating test user...');
        testUser = new User({
            id: 1,
            name: 'test'
        });
        testUser.save();
    }
});

module.exports.list = function *list() {
    this.body = yield User.find();
};

module.exports.fetch = function *fetch() {
    const user = users[this.params.id];
    if (!user) {
        this.throw(404, 'User with id = ' + this.params.id + ' was not found')
    }
    this.body = yield user;
};

module.exports.create = function *create() {
    let data = yield parse(this);
    let user = new User(data);
    user.save();
    this.redirect('back');
};

