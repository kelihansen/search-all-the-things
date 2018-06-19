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

    const email = {
        email: 'me@email.com'
    };

    const password = '123';

    it('generates a hash from password', () => {
        const user = new User(email);
        user.generateHash(password);
        assert.ok(user.hash);
        assert.notEqual(user.hash, password);
    });

    it('compares password to hash', () => {
        const user = new User(email);
        user.generateHash(password);
        assert.ok(user.comparePassword(password));
    });
}); 