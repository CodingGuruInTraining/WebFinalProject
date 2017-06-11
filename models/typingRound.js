var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var typeSchema = new mongoose.Schema({
    user: { type: String, required: true, unique: true}, //uniqueCaseInsensitive: true },
    time: Number,
    numErrors: Number,
    dateTyped: { type: Date, default: Date.now },
    accuracy: Number,
    userid: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var Round = mongoose.model('Round', typeSchema);
// typeSchema.plugin(uniqueValidator);

module.exports = Round;
