jest.mock('../../services/api', () => ({
  getMatchingItems: jest.fn(),
  getItemById: jest.fn()
}));

import {
  RESULTS_LOAD,
  ITEM_FEATURE,
  PAGE_UPDATE
} from './reducers';

import { loadResults, featureItem, updatePage } from './actions';

import { getMatchingItems, getItemById } from '../../services/api';

describe('item action creators', () => {
  it('creates a load action for a page of items', () => {
    const promise = Promise.resolve();
    getMatchingItems.mockReturnValueOnce(promise);

    const color = '123456';
    const page = '1';
    const { type, payload } = loadResults(color, page);
    expect(type).toBe(RESULTS_LOAD);
    expect(getMatchingItems.mock.calls.length).toBe(1);
    expect(getMatchingItems.mock.calls[0][0]).toBe(color);
    expect(getMatchingItems.mock.calls[0][1]).toBe(page);
    expect(payload).toBe(promise);
  });

  it('creates an feature action for a detailed item', () => {
    const promise = Promise.resolve();
    getItemById.mockReturnValueOnce(promise);

    const id = '123456';
    const { type, payload } = featureItem(id);
    expect(type).toBe(ITEM_FEATURE);
    expect(getItemById.mock.calls.length).toBe(1);
    expect(getItemById.mock.calls[0][0]).toBe(id);
    expect(payload).toBe(promise);
  });

  it('creates an update page action', () => {
    expect(updatePage('5')).toEqual({ type: PAGE_UPDATE, payload: '5' });
  });
});