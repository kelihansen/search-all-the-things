const { assert } = require('chai');
const User = require('../../lib/models/User');
const { getErrors } = require('./helpers');

describe('User model', () => {
    it('is a good, valid model', () => {
        const info = {
            email: 'me@email.com',
            hash: 'sosecret'
        };

        const user = new User(info);
        info._id = user._id;
        assert.deepEqual(user.toJSON(), info);
    });
}); 