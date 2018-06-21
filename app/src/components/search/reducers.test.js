import {
  items,
  RESULTS_LOAD,
  detailedItem,
  ITEM_FEATURE,
  getItems,
  getDetailedItem,
  results,
  getTotalResults,
  page,
  PAGE_UPDATE
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
    const state = items([], { type: RESULTS_LOAD, payload: { items: [item1, item2] } });
    expect(state).toEqual([item1, item2]);
  });
}); 

describe('detailed item reducer', () => {
  it('has a default value of null', () => {
    const state = detailedItem(undefined, {});
    expect(state).toEqual(null);
  });

  it('loads a single item', () => {
    const state = detailedItem(null, { type: ITEM_FEATURE, payload: item1 });
    expect(state).toEqual(item1);
  });
});

describe('total results reducer', () => {
  it('has a default value of null', () => {
    const state = results(undefined, {});
    expect(state).toEqual(null);
  });

  it('updates when search results are loaded', () => {
    const totalResults = 100;
    const state = results(null, { type: RESULTS_LOAD, payload: { totalResults } });
    expect(state).toEqual(totalResults);
  });
});

describe('page reducer', () => {
  it('has a default value of null', () => {
    const state = page(undefined, {});
    expect(state).toEqual(null);
  });

  it('updates the page', () => {
    const pageNumber = 2;
    const state = page(null, { type: PAGE_UPDATE, payload: pageNumber });
    expect(state).toEqual(pageNumber);
  });
});

describe('selectors', () => {
  it('gets the current array of items', () => {
    const items = [item1, item2];
    const got = getItems({ items });
    expect(got).toEqual(items);
  });
  
  it('gets the currently featured item', () => {
    const detailedItem = item1;
    const got = getDetailedItem({ detailedItem });
    expect(got).toEqual(detailedItem);
  });
  
  it('gets the total results of the current search', () => {
    const results = 100;
    const got = getTotalResults({ results });
    expect(got).toEqual(results);
  });
});