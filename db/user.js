const mongoose = require('./config');
const bcrypt = require('bcrypt-nodejs');
// const Song = require('./song');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type : String , unique : true},
  password: String,
  addedSongs: Array,
  votedSongs: Array
});

const User = mongoose.model('user', UserSchema);

var hash = bcrypt.hashSync("123");

// dummy data; do NOT delete the anonymous user
// new User({name: 'anonymous', password: hash}).save();
// new User({name: 'jessica', password: hash}).save();
// new User({name: 'nick', password: hash}).save();
// new User({name: 'vasanth', password: hash}).save();
// new User({name: 'joey', password: hash}).save();

module.exports = User;