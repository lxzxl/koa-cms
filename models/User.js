'use strict';

const bcrypt = require('bcrypt');

exports = module.exports = function (app, mongoose) {
    var userSchema = new mongoose.Schema({
        username: {type: String, unique: true},
        password: String,
        email: {type: String, unique: true},
        roles: {
            admin: {type: mongoose.Schema.Types.ObjectId, ref: 'Admin'},
            account: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'}
        },
        isActive: Boolean,
        timeCreated: {type: Date, default: Date.now},
        resetPasswordToken: String,
        resetPasswordExpires: Date,
        twitter: {},
        github: {},
        facebook: {},
        google: {},
        tumblr: {},
        search: [String]
    });
    userSchema.methods.canPlayRoleOf = function (role) {
        if (role === "admin" && this.roles.admin) {
            return true;
        }

        if (role === "account" && this.roles.account) {
            return true;
        }

        return false;
    };
    userSchema.methods.getDefaultReturnUrl = function () {
        var returnUrl = '/';
        if (this.canPlayRoleOf('account')) {
            returnUrl = '/account/';
        }

        if (this.canPlayRoleOf('admin')) {
            returnUrl = '/admin/';
        }

        return returnUrl;
    };
    userSchema.statics.encryptPassword = function (password) {
        return new Promise(function (resolve, reject) {
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    return reject(err);
                }
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(hash);
                });
            });
        });
    };
    userSchema.statics.validatePassword = function (password, hash) {
        return new Promise(function (resolve, reject) {
            bcrypt.compare(password, hash, function (err, res) {
                if (err) return reject(err);
                return resolve(res);
            });
        });
    };
    userSchema.plugin(require('./plugins/pagedFind'));
    userSchema.index({username: 1}, {unique: true});
    userSchema.index({email: 1}, {unique: true});
    userSchema.index({timeCreated: 1});
    userSchema.index({'twitter.id': 1});
    userSchema.index({'github.id': 1});
    userSchema.index({'facebook.id': 1});
    userSchema.index({'google.id': 1});
    userSchema.index({search: 1});
    userSchema.set('autoIndex', (app.env === 'development'));
    app.db.model('User', userSchema);
};
