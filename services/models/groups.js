/**
 * Created by steven on 4/6/16.
 */
'use strict';

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    id: Number,
    name: String
});

// userSchema.methods.speak = function () {
//     console.log(`My name is:${this.name}`);
// };

groupSchema.plugin(autoIncrement.plugin, {model: 'Group', field: 'id'});
module.exports = mongoose.model('Group', groupSchema);