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
