import { COLOR_UPDATE } from './reducers';
import { updateColor } from './actions';

describe('color action creators', () => {
  it('creates an update color action', () => {
    expect(updateColor('123456')).toEqual({ type: COLOR_UPDATE, payload: '123456' });
  });
});