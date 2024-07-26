// models/Data.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  // Define your schema fields here
  Location: String,
  // Add more fields as needed
});

module.exports = mongoose.model('Data', dataSchema);

