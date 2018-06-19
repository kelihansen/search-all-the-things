import { COLOR_UPDATE } from './reducers';

export const updateColor = color => {
  return {
    type: COLOR_UPDATE,
    payload: color
  };
};