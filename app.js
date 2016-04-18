'use strict';

const path = require('path');

const compress = require('koa-compress');
const logger = require('koa-logger');
const serve = require('koa-static');
const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const mount = require('koa-mount');
const mongoose = require('mongoose');

const models = require('./models');
const serviceApp = require('./services');
const viewRouter = require('./routers');

const app = module.exports = koa();
app.config = {
    loginAttempts: {
        forIp: 50,
        forIpAndUser: 7,
        logExpiration: '20m'
    }
};
/**
 * Connect to database.
 */
app.db = mongoose.createConnection('mongodb://localhost/koa-cms');
app.db.on('error', function (err) {
    process.stderr.write(`${err.name}: ${err.message}`);
    process.exit(1);
});

// register models to mongoose.
models.register(app, mongoose);

// bind models to ctx.
app.use(function *db(next) {
    this.models = this.app.db.models;
    yield next;
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
require('./middlewares/passport')(app, passport);

// load routes
app.use(mount(viewRouter.middleware()));
serviceApp.mountApp(app, '/service', {authRequired: true});

if (!module.parent) {
    app.listen(3000);
    console.log('listening on port 3000');
}
