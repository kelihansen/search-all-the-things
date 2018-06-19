export const COLOR_UPDATE = 'COLOR_UPDATE';

export const getCurrentColor = state => state.color;

export function color(state = null, { type, payload }) {
  switch(type) {
    case COLOR_UPDATE:
      return payload;
    default:
      return state;
  }
}