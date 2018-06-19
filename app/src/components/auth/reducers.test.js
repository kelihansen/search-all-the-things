import {
  user,
  USER_AUTH
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
});