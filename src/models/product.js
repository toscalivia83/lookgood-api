const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
  ingredients: String, // will need to be an array of string. parse list of ingredients by ','
  quality: {
    type: String,
    enum: ['excellent', 'verygood', 'good', 'fair', 'poor']
  }
}, { versionKey: false });

// add enableSequentialId method to increase the id for each product

module.exports = mongoose.model('product', productSchema);
