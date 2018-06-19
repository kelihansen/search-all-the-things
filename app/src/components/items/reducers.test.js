import {
  images

} from './reducers';

describe('images reducer', () => {
  it('has a default value of an empty array', () => {
    const state = images(undefined, {});
    expect(state).toEqual([]);
  });
}); 