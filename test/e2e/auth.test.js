require('dotenv').config({ path: './test/.env' });
const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('auth API', () => {
    beforeEach(() => dropCollection('users'));

    let token = null;

    beforeEach(() => {
        return request.post('/api/auth/signup')
            .send({
                email: 'me@email.com',
                password: '12345',
                name: 'Keli'
            })
            .then(({ body }) => token = body.token);
    });

    it('has a working signup route', () => {
        assert.ok(token);
    });

    it('has a working verify route', () => {
        return request.get('/api/auth/verify')
            .set('Authorization', token)
            .then(({ body }) => {
                assert.ok(body.verified);
            });
    });

    it('has a working signin route', () => {
        return request.post('/api/auth/signin')
            .send({
                email: 'me@email.com',
                password: '12345',
            })
            .then(({ body }) => {
                assert.ok(body.token);
            });
    });

    it('responds with a 400 on same email', () => {
        return request
            .post('/api/auth/signup')
            .send({
                email: 'me@email.com',
                password: '12345',
            })
            .then(res => {
                assert.equal(res.status, 400);
            });
    });

    it('responds with a 401 on non-existent email', () => {
        return request.post('/api/auth/signin')
            .send({
                email: 'imposter@email.com',
                password: 'abc'
            })
            .then(res => {
                assert.equal(res.status, 401);
            });
    });

    it('responds with a 400 if email or password is missing', () => {
        return request
            .post('/api/auth/signin')
            .send({
                email: 'me@me.com'
            })
            .then(res => {
                assert.equal(res.status, 400);
            });
    });
});