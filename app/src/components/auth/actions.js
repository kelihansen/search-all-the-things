import { USER_AUTH, LOGOUT } from './reducers';

import { postSignup } from '../../services/api';

const makeAuth = api => {
  return credentials => ({
    type: USER_AUTH,
    payload: api(credentials)
  });
};

export const signup = makeAuth(postSignup);