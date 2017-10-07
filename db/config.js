const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://loco:123@ds111885.mlab.com:11885/loco-legacy');

mongoose.connection
  .once('open', () => {
      console.log('Successfully connected');
  })
  .on('error', (error) => {
      console.warn('Connection error', error);
  });

module.exports = mongoose;