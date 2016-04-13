/**
 * Created by steven on 4/6/16.
 */
'use strict';

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {type: Number, index: true},
    name: {type: String, index: true},
    password: String
});

userSchema.statics.findByUserId = function (userId, projection, options, callback) {
    if (typeof userId === 'undefined') {
        userId = null;
    }
    return this.findOne({id: userId}, projection, options, callback);
};

userSchema.plugin(autoIncrement.plugin, {model: 'User', field: 'id'});
module.exports = mongoose.model('User', userSchema);