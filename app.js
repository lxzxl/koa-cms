'use strict';

const path = require('path');

const compress = require('koa-compress');
const logger = require('koa-logger');
const serve = require('koa-static');
const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');
const mount = require('koa-mount');
const mongoose = require('mongoose');
require('mongoose-auto-increment').initialize(mongoose);

const service = require('./services');
const viewRouter = require('./routes');

const app = module.exports = koa();

/**
 * Connect to database.
 */
mongoose.connect('mongodb://localhost/koa-demo');
mongoose.connection.on("error", function (err) {
    process.stderr.write(`${err.name}: ${err.message}`);
    process.exit(1);
});

// Logger
app.use(logger());

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());

// bodyParser
app.use(bodyParser());

// authentication
app.use(passport.initialize());
app.use(passport.session());

// load routes
// app.use(mount(viewRouter.middleware()));
app.use(mount('/service', service.router.middleware()));

if (!module.parent) {
    app.listen(3000);
    console.log('listening on port 3000');
}
