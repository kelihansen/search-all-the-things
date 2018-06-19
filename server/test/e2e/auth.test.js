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
});