import { getMatchingItems, getItemById } from '../../services/api';

import {
  ITEMS_LOAD,
  ITEM_FEATURE
} from './reducers';

export function loadItems(color, page) {
  return {
    type: ITEMS_LOAD,
    payload: getMatchingItems(color, page)
  };
}

export function featureItem(id) {
  return {
    type: ITEM_FEATURE,
    payload: getItemById(id)
  };
}