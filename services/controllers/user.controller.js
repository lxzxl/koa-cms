'use strict';

module.exports.login = function *list() {
    this.body = yield User.find();
};

module.exports.fetch = function *fetch() {
    const user = yield User.findByUserId(this.params.id);
    if (!user) {
        this.throw(404, 'User with id = ' + this.params.id + ' was not found')
    }
    this.body = user;
};

module.exports.create = function *create() {
    let data = {
        username: this.body.username,
        password: this.body.password
    };
    let user = new User(data);
    yield user.save();
    this.redirect('back');
};

