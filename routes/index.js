/**
 * Created by steven on 4/5/16.
 */
'use strict';
const fs = require('fs');

module.exports = function(app) {
    console.log(module.filename);
    for (let filename of fs.readdirSync(__dirname)) {
        if (/^index.js$/.test(filename)) continue;
        let routes = require('./' + filename);
        routes.forEach(r => app.use(r));
        console.log('Route Loaded: ' + filename);
    }
};