import {
  color,
  COLOR_UPDATE,
  getCurrentColor
} from './reducers';

import { LOGOUT } from '../auth/reducers';

describe('color reducer', () => {
  const code = '4567ba';

  it('has a default value of null', () => {
    const state = color(undefined, {});
    expect(state).toBe(null);
  });

  it('updates the color', () => {
    const state = color(null, { type: COLOR_UPDATE, payload: code });
    expect(state).toBe(code);
  });

  it('clears the color on logout', () => {
    const state = color(code, { type: LOGOUT });
    expect(state).toBe(null);
  });
});

describe('selectors', () => {
  it('gets the current color', () => {
    const color = 'ffffff';
    const got = getCurrentColor({ color });
    expect(got).toEqual(color);
  });
});