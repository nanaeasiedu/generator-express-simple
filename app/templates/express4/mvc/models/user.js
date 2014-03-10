var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    userSchema;

userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('User', userSchema);
