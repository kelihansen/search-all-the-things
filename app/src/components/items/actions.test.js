jest.mock('../../services/api', () => ({
  getMatchingItems: jest.fn(),
  getItemById: jest.fn()
}));

import {
  ITEMS_LOAD,
  ITEM_FEATURE
} from './reducers';

import { loadItems, featureItem } from './actions';

import { getMatchingItems, getItemById } from '../../services/api';

describe('item action creators', () => {
  it('creates a load action for a page of items', () => {
    const promise = Promise.resolve();
    getMatchingItems.mockReturnValueOnce(promise);

    const color = '123456';
    const page = '1';
    const { type, payload } = loadItems(color, page);
    expect(type).toBe(ITEMS_LOAD);
    expect(getMatchingItems.mock.calls.length).toBe(1);
    expect(getMatchingItems.mock.calls[0][0]).toBe(color);
    expect(getMatchingItems.mock.calls[0][1]).toBe(page);
    expect(payload).toBe(promise);
  });
});