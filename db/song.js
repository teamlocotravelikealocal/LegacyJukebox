const mongoose = require('./config');
// const User = require('./user');

const Schema = mongoose.Schema;

const SongSchema = new Schema({
  name: String,
  artist: String,
  image: String,
  link: String,
  userName: String,
  upVoteCount: {type: Number, default: 1},
  downVoteCount: {type: Number, default: 0},
  netVoteCount: Number
});

SongSchema.pre('save', function(next) {
  this.netVoteCount = this.upVoteCount - this.downVoteCount;
  next();
});

const Song = mongoose.model('song', SongSchema);

// dummy data
// new Song({name: 'Purple Rain', artist: 'Prince',
//   image: 'https://i.scdn.co/image/8b171c29fa2d68816b23a9166b5354fbe0db3b1a',
//   link: 'https://open.spotify.com/track/54X78diSLoUDI3joC2bjMz',
//   userName: 'nick',
//   upVoteCount: 6, downVoteCount: 2}).save();
// new Song({name: 'When Doves Cry', artist: 'Prince',
//   image: 'https://i.scdn.co/image/8b171c29fa2d68816b23a9166b5354fbe0db3b1a',
//   link: 'https://open.spotify.com/track/51H2y6YrNNXcy3dfc3qSbA',
//   userName: 'nick',
//   upVoteCount: 8, downVoteCount: 3}).save();
// new Song({name: 'Let\'s Go Crazy', artist: 'Prince',
//   image: 'https://i.scdn.co/image/8b171c29fa2d68816b23a9166b5354fbe0db3b1a',
//   link: 'https://open.spotify.com/track/0QeI79sp1vS8L3JgpEO7mD',
//   userName: 'nick',
//   upVoteCount: 9, downVoteCount: 8}).save();
// new Song({name: 'I Would Die 4 U', artist: 'Prince',
//   image: 'https://i.scdn.co/image/8b171c29fa2d68816b23a9166b5354fbe0db3b1a',
//   link: 'https://open.spotify.com/track/6fBwVe6udYdnRqwqo06if8',
//   userName: 'nick',
//   upVoteCount: 2, downVoteCount: 8}).save();
// new Song({name: 'The Beautiful Ones', artist: 'Prince',
//   image: 'https://i.scdn.co/image/8b171c29fa2d68816b23a9166b5354fbe0db3b1a',
//   link: 'https://open.spotify.com/track/1BNtFSws7fjbn9aVBPA79j',
//   userName: 'jessica',
//   downVoteCount: 4}).save();
// new Song({name: 'Darling Nikki', artist: 'Prince',
//   image: 'https://i.scdn.co/image/8b171c29fa2d68816b23a9166b5354fbe0db3b1a',
//   link: 'https://open.spotify.com/track/0khi86hc79RfsRC0rrkkA2',
//   userName: 'jessica',
//   upVoteCount: 12, downVoteCount: 5}).save();
// new Song({name: 'Baby I\'m A Star', artist: 'Prince',
//   image: 'https://i.scdn.co/image/8b171c29fa2d68816b23a9166b5354fbe0db3b1a',
//   link: 'https://open.spotify.com/track/2soBvUQBf5rbMj9HIyhzzK',
//   userName: 'jessica',
//   upVoteCount: 10, downVoteCount: 1}).save();
// new Song({name: 'Take Me With U', artist: 'Prince',
//   image: 'https://i.scdn.co/image/8b171c29fa2d68816b23a9166b5354fbe0db3b1a',
//   link: 'https://open.spotify.com/track/765k9tDIFOnoOfkO2cgitB',
//   userName: 'jessica',
//   upVoteCount: 9}).save();
// new Song({name: 'Purple Rain - 2015 Paisley Park Remaster', artist: 'Prince',
//   image: 'https://i.scdn.co/image/8b171c29fa2d68816b23a9166b5354fbe0db3b1a',
//   link: 'https://open.spotify.com/track/1vfvy1Of0iJLDjh5eMfVyI',
//   userName: 'jessica'})
//   .save();

module.exports = Song;
