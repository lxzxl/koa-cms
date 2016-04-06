/**
 * Created by steven on 4/5/16.
 */
'use strict';
const fs = require('fs');
const Router = require('koa-router');

const serviceRouter = new Router();
(function retrieveRoutes(baseRouter, dir) {
    for (let filename of fs.readdirSync(dir)) {
        let filePath = `${dir}/${filename}`;
        if (fs.statSync(filePath).isFile()) {
            if (/^index.js$/.test(filename)) continue;
            let router = require(filePath);
            baseRouter.use(router.routes());
            console.log('Router Loaded: ' + filename);
        } else {// directory.
            retrieveRoutes(baseRouter, filePath);
        }
    }
})(serviceRouter, __dirname);

module.exports = serviceRouter;