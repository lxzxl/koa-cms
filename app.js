'use strict';

const path = require('path');

const compress = require('koa-compress');
const logger = require('koa-logger');
const serve = require('koa-static');
const koa = require('koa');
const mount = require('koa-mount');

const service = require('./services');
const viewRouter = require('./routes');

const app = module.exports = koa();

// Logger
app.use(logger());

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());

// load routes
app.use(mount(viewRouter.middleware()));
app.use(mount('/services', service.router.middleware()));

if (!module.parent) {
    app.listen(3000);
    console.log('listening on port 3000');
}
