'use strict';

const path = require('path');

const compress = require('koa-compress');
const logger = require('koa-logger');
const serve = require('koa-static');
const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const mount = require('koa-mount');
const mongoose = require('mongoose');
require('mongoose-auto-increment').initialize(mongoose);

const passport = require('./middlewares/passport');
const serviceApp = require('./services');
const viewRouter = require('./routers');

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

// session
app.keys = ['my-secret'];
app.use(session(app));

// authentication
app.use(passport.initialize());
app.use(passport.session());

// load routes
app.use(mount(viewRouter.middleware()));
serviceApp.mountApp(app, '/service', {authRequired: true});

if (!module.parent) {
    app.listen(3000);
    console.log('listening on port 3000');
}
