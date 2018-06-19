require('dotenv').config({ path: './test/.env' });
const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('auth API', () => {
    beforeEach(() => dropCollection('users'));

    let token = null;

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
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
});