export const ITEMS_LOAD = 'ITEMS_LOAD';

export function items(state = [], { type, payload }) {
  switch(type) {
    case ITEMS_LOAD:
      return payload;
    default:
      return state;
  }
}