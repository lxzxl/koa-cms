/**
 * Created by steven on 4/6/16.
 */
'use strict';

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    name: String,
    password: String
});

// userSchema.methods.speak = function () {
//     console.log(`My name is:${this.name}`);
// };

userSchema.plugin(autoIncrement.plugin, {model: 'User', field: 'id'});
module.exports = mongoose.model('User', userSchema);