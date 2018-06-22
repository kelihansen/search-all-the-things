export const RESULTS_LOAD = 'RESULTS_LOAD';
export const ITEM_FEATURE = 'ITEM_FEATURE';

export const getItems = state => state.items;
export const getDetailedItem = state => state.detailedItem;
export const getTotalResults = state => state.results;
export const getPage = state => state.page;

export function items(state = [], { type, payload }) {
  switch(type) {
    case RESULTS_LOAD:
      return payload.items;
    default:
      return state;
  }
}

export function detailedItem(state = null, { type, payload }) {
  switch(type) {
    case ITEM_FEATURE:
      return payload;
    default:
      return state;
  }
}

export function results(state = null, { type, payload }) {
  switch(type) {
    case RESULTS_LOAD:
      return payload.totalResults;
    default:
      return state;
  }
}

export function page(state = null, { type, payload }) {
  switch(type) {
    case RESULTS_LOAD:
      return payload.page;
    default:
      return state;
  }
}