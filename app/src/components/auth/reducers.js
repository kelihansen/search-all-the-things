export const USER_AUTH = 'USER_AUTH';

export function user(state = null, { type, payload }) {
  switch(type) {
    case USER_AUTH:
      return payload;
    default:
      return state;
  }
}