var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var typeSchema = new mongoose.Schema({
    user: { type: String, required: true, unique: true, uniqueCaseInsensitive: true },
    time: Number,
    errors: Number,
    dateTyped: { type: Date, default: Date.now },
    accuracy: Number
    // userid:
});

var Round = mongoose.model('Round', typeSchema);
typeSchema.plugin(uniqueValidator);

module.exports = Round;
