/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const app = require('../app');
const db = require('../db/setup');

const testId = Math.floor(Math.random() * 1000) + 1;

describe('Tests for all endpoints', () => {
  test('GET /products', (done) => {
    request(app)
      .get('/products')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  test('GET /products/:product_id', (done) => {
    request(app)
      .get(`/products/${testId}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  test('GET /products/:product_id/styles', (done) => {
    request(app)
      .get(`/products/${testId}/styles`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  test('GET /products/:product_id/related', (done) => {
    request(app)
      .get(`/products/${testId}/related`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});

// describe('Test GET /products content', () => {
//   test('It should contain properties "id", "name", "slogan", "description"', async (done) => {
//     const response = await request(app).get('/products');
//     expect(response.body[0]).toHaveProperty('id');
//     expect(response.body[0]).toHaveProperty('name');
//     expect(response.body[0]).toHaveProperty('slogan');
//     expect(response.body[0]).toHaveProperty('description');
//     expect(response.statusCode).toBe(200);
//     return done();
//   });
// });

// afterAll(db.end);
