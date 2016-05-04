/**
 * Created by steven on 4/14/16.
 */
'use strict';

/*
 The import order is important!
 */
function register(app, mongoose) {
    //embeddable docs first
    require('./Note')(app, mongoose);
    require('./Status')(app, mongoose);
    require('./StatusLog')(app, mongoose);
    require('./Category')(app, mongoose);

    //then regular docs
    require('./User')(app, mongoose);
    require('./Admin')(app, mongoose);
    require('./AdminGroup')(app, mongoose);
    require('./Account')(app, mongoose);
    require('./LoginAttempt')(app, mongoose);
};
module.exports = {register};
