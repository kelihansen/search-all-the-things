export const ITEMS_LOAD = 'ITEMS_LOAD';
export const ITEM_FEATURE = 'ITEM_FEATURE';

export function items(state = [], { type, payload }) {
  switch(type) {
    case ITEMS_LOAD:
      return payload;
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