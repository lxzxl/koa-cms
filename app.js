'use strict';

const compress = require('koa-compress');
const logger = require('koa-logger');
const serve = require('koa-static');
const koa = require('koa');
const path = require('path');
const app = module.exports = koa();

const routes = require('./routes');


// Logger
app.use(logger());

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());

// load routes
routes(app);

if (!module.parent) {
    app.listen(3000);
    console.log('listening on port 3000');
}
