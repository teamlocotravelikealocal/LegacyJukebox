const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/quince');

mongoose.connection
  .once('open', () => {
      console.log('Successfully connected');
  })
  .on('error', (error) => {
      console.warn('Connection error', error);
  });

module.exports = mongoose;