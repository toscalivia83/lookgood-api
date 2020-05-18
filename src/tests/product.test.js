const { expect } = require('chai')
const appConfig = require('../config/appConfig.js');
const mongoDB = require('../services/mongoDB.js');
const request = require('supertest');
const app = require('../app');
const testData = require('./dummy/products.json')
const Product = require('../models/product.js');

describe('Endpoints work correctly', () => {
  before(async () => {
    await mongoDB.connect(appConfig.mongo.url)
    await mongoDB.dropDatabase("product");
    await Product.create(testData);
  });

  it('should get products from route', (done) => {
    request(app)
    .get('/products')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);
      expect(res.body.products.length).to.equal(2);
      done();
    });
  })

  after(async () => {
    await mongoDB.dropDatabase();
    await mongoDB.close();
  })
})