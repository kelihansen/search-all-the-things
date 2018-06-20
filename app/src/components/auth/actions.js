import { USER_AUTH, LOGOUT, CHECKED_AUTH } from './reducers';

import { postSignup, postSignin, getUserVerified } from '../../services/api';
import { getStoredUser, clearStoredUser } from '../../services/request';

const makeAuth = api => {
  return credentials => ({
    type: USER_AUTH,
    payload: api(credentials)
  });
};

export const signup = makeAuth(postSignup);
export const signin = makeAuth(postSignin);
export const logout = () => ({ type: LOGOUT });

const authChecked = () => ({ type: CHECKED_AUTH });

export const attemptUserLoad = () => {
  return dispatch => {
    const user = getStoredUser();
    if(!user || !user.token) {
      return dispatch(authChecked());
    }

    getUserVerified(user.token)
      .then(() => dispatch({
        type: USER_AUTH,
        payload: user
      }))
      .catch(() => {
        clearStoredUser();
      })
      .then(() => {
        dispatch(authChecked());
      });
  };
};