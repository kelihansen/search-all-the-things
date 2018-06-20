import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from './promise-middleware';
import { loading, error, color } from '../components/app/reducers';
import { user, checkedAuth } from '../components/auth/reducers';
import { items, detailedItem, results } from '../components/search/reducers';

const rootReducer = combineReducers({
  loading,
  error,
  user,
  checkedAuth,
  color,
  items,
  detailedItem,
  results
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      promiseMiddleware
    )
  )
);

export default store;