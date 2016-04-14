/**
 * Created by steven on 4/5/16.
 */
'use strict';
const fs = require('fs');
const Router = require('koa-router');

const viewRouter = new Router();
(function retrieveRoutes(baseRouter, dir) {
    for (let filename of fs.readdirSync(dir)) {
        let filePath = `${dir}/${filename}`;
        let fileInfo = fs.statSync(filePath);
        if (fileInfo.isFile() && /\.router\.js$/.test(filename)) {
            let router = require(filePath);
            baseRouter.use(router.routes());
            console.log('Router Loaded: ' + filename);
        } else if (fileInfo.isDirectory()) {// directory.
            retrieveRoutes(baseRouter, filePath);
        }
    }
})(viewRouter, __dirname);

module.exports = viewRouter;