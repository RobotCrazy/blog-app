const mongoose = require('mongoose');
const dbPath = 'mongodb://localhost:27017/test';

mongoose.connect(dbPath);

let db = mongoose.connection;

let UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String,

    },
    name: {
        type: String
    },
    profileImage: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback) {
    newUser.save(callback);
};