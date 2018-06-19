import {
  user
} from './reducers';

describe('user reducer', () => {
  it('has a default value of null', () => {
    const state = user(undefined, {});
    expect(state).toBe(null);
  });
});