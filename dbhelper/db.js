const mongoose = require('mongoose');
const config = require('./config');

const db = mongoose.createConnection(config.mongodb, {useNewUrlParser: true});

db.on('error', err => {
  console.log(err);
});

db.on('connected', () => {
  console.log('mongoose  connected');
});


exports.db = db;
exports.Schema = mongoose.Schema;
