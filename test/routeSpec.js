/*global describe, it*/
'use strict';
const superagent = require('supertest');
const app = require('../app');
const request = superagent(app.listen());

describe('Routes', () => {
    describe('GET /', () => {
        it('should return 404', done => {
            request
                .get('/')
                .expect(404, done);
        });
    });
    describe('GET /admin', () => {
        it('should return 200', done => {
            request
                .get('/admin')
                .expect(200, done);
        });
    });
    describe('GET /services', () => {
        it('should return 404', done => {
            request
                .get('/services')
                .expect(404, done);
        });
    });
    describe('GET /services/users', () => {
        it('should return 200', done => {
            request
                .get('/services/users')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
    describe('GET /services/users/0', () => {
        it('should return 200', done => {
            request
                .get('/services/users')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
});
