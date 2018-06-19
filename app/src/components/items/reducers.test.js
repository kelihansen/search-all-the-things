import {
  items,
  ITEMS_LOAD,
  currentItem
} from './reducers';

const item1 = {
  title: 'fancy thing'
};

const item2 = {
  title: 'old thing'
};

describe('items reducer', () => {
  it('has a default value of an empty array', () => {
    const state = items(undefined, {});
    expect(state).toEqual([]);
  });

  it('loads items', () => {
    const state = items([], { type: ITEMS_LOAD, payload: [item1, item2] });
    expect(state).toEqual([item1, item2]);
  });
}); 

describe('current item reducer', () => {
  it('has a default value of null', () => {
    const state = currentItem(undefined, {});
    expect(state).toEqual(null);
  });
}); 