const VError = require('verror');
const Product = require('../models/product.js');

module.exports = function(app) {
  app.get('/products', (req, res, next) => {
    return Product.find().limit(10)
    .then(results => res.json({ products: results }))
    .catch(err => next(new VError("Can't get products", err)));
  })
};