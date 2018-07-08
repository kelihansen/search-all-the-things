import {
  user,
  USER_AUTH,
  LOGOUT,
  getUser,
  checkedAuth,
  CHECKED_AUTH,
  getCheckedAuth
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

describe('checked auth reducer', () => {
  it('has a default value of false', () => {
    const state = checkedAuth(undefined, {});
    expect(state).toBe(false);
  });

  it('switches to true', () => {
    const state = checkedAuth(false, { type: CHECKED_AUTH });
    expect(state).toBe(true);
  });
});

describe('selectors', () => {
  it('gets the current user object', () => {
    const user = {};
    expect(getUser({ user })).toBe(user);
  });

  it('gets checkedAuth status', () => {
    const auth = true;
    expect(getCheckedAuth({ checkedAuth: auth })).toBe(true);
  });
});