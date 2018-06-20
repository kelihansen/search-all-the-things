import { COLOR_UPDATE, ERROR_CLEAR } from './reducers';

export const clearError = () => ({ type: ERROR_CLEAR });

export const updateColor = color => {
  return {
    type: COLOR_UPDATE,
    payload: color
  };
};
