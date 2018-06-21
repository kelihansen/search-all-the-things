import { getMatchingItems, getItemById } from '../../services/api';

import {
  RESULTS_LOAD,
  ITEM_FEATURE,
  PAGE_UPDATE
} from './reducers';

export function loadResults(color, page) {
  return {
    type: RESULTS_LOAD,
    payload: getMatchingItems(color, page)
  };
}

export function featureItem(id) {
  return {
    type: ITEM_FEATURE,
    payload: getItemById(id)
  };
}

export function updatePage(page) {
  return {
    type: PAGE_UPDATE,
    payload: page
  };
}