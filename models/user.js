const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const dbPath = 'mongodb://localhost:27017/test';

mongoose.connect(dbPath);

let db = mongoose.connection;

let UserSchema = mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    name: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    console.log("Getting user id");
    User.findById(id, callback);
};

module.exports.getUserByUsername = function(username1, callback) {
    console.log("Getting username");
    let query = { username: username1 };
    User.findOne(query, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    console.log("Comparing password");
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        console.log("Is match?");
        console.log(isMatch);
        callback(null, isMatch);
    });
};

module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });

};