import {
  color,
  COLOR_UPDATE,
  getCurrentColor
} from './reducers';

describe('color reducer', () => {
  it('has a default value of null', () => {
    const state = color(undefined, {});
    expect(state).toBe(null);
  });

  it('updates the color', () => {
    const code = '4567ba';
    const state = color(null, { type: COLOR_UPDATE, payload: code });
    expect(state).toBe(code);
  });
});

describe('selectors', () => {
  it('gets the current color', () => {
    const color = 'ffffff';
    const got = getCurrentColor({ color });
    expect(got).toEqual(color);
  });
});