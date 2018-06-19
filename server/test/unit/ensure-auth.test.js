const { assert } = require('chai');
require('dotenv').config({ path: './test/.env' });
const createEnsureAuth = require('../../lib/auth/ensure-auth');
const tokenService = require('../../lib/auth/token-service');

describe('ensure auth middleware', () => {
    const user = { _id: '123' };
    let token = '';
    beforeEach(() => token = tokenService.sign(user));

    const ensureAuth = createEnsureAuth();

    it('adds payload as req.user on success', done => {
        const req = {
            get(header) {
                if(header === 'Authorization') return token;
            }
        };
        const next = () => {
            assert.equal(req.user._id, user._id);
            done();
        };
        ensureAuth(req, null, next);
    });

    it('calls next with error when token is bad', done => {
        const req = {
            get() {return 'awful token'; }
        };

        const next = err => {
            assert.equal(err.status, 401);
            done();
        };
        ensureAuth(req, null, next);
    });
});