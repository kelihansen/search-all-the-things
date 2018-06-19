import {
  user,
  USER_AUTH,
  LOGOUT,
  getUser
} from './reducers';

describe('user reducer', () => {
  it('has a default value of null', () => {
    const state = user(undefined, {});
    expect(state).toBe(null);
  });

  it('loads user', () => {
    const info = { email: 'me@me.me', password:'111' };
    const state = user(null, { type: USER_AUTH, payload: info });
    expect(state).toEqual(info);
  });

  it('clears a user on logout', () => {
    const state = user({}, { type: LOGOUT });
    expect(state).toBe(null);
  });
});

describe('selectors', () => {
  const user = {};
  expect(getUser({ user })).toBe(user);
});