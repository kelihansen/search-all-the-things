import { getMatchingItems, getItemById } from '../../services/api';

import {
  RESULTS_LOAD,
  ITEM_FEATURE
} from './reducers';

export function loadResults(color, page) {
  return {
    type: RESULTS_LOAD,
    payload: getMatchingItems(color, page).then(({ items, totalResults }) => ({ items, totalResults, page }))
  };
}

export function featureItem(id) {
  return {
    type: ITEM_FEATURE,
    payload: getItemById(id)
  };
}