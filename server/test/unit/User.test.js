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

    it('has required fields', () => {
        const user = new User({});
        const errors = getErrors(user.validateSync(), 2);
        assert.strictEqual(errors.email.kind, 'required');
        assert.strictEqual(errors.hash.kind, 'required');
    });
}); 