var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    local : {
        username: String,
        password: String
    },
    rounds : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Round' }]
});

// Making a new function (generateHash) to do something.
userSchema.methods.generateHash = function(password) {
    // Generates salted hash of plaintext password
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// Making a new function (validPassword) to do something.
userSchema.methods.validPassword = function(password) {
    // Create hash of entered password and compares to stored hash.
    // 'localUser' matches name given when defining schema.
    return bcrypt.compareSync(password, this.local.password);
};

User = mongoose.model('User', userSchema);

module.exports = User;