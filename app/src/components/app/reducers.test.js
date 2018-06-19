import {
  color
} from './reducers';

describe('color reducer', () => {
  it('has a default value of null', () => {
    const state = color(undefined, {});
    expect(state).toBe(null);
  });
});