jest.mock('../../services/api', () => ({
  postSignup: jest.fn(),
  postSignin: jest.fn(),
  getUserVerified: jest.fn()
}));

jest.mock('../../services/request', () => ({
  getStoredUser: jest.fn(),
  clearStoredUser: jest.fn()
}));

import { signup, signin, logout, attemptUserLoad } from './actions';
import { USER_AUTH, LOGOUT, CHECKED_AUTH } from './reducers';
import { postSignup, postSignin, getUserVerified } from '../../services/api';
import { getStoredUser, clearStoredUser } from '../../services/request';

describe('auth action creators', () => {
  function testAuth(actionType, mockService, actionCreator) {
    it(`creates a ${actionType} action`, () => {
      const promise = Promise.resolve();
      mockService.mockReturnValueOnce(promise);

      const credentials = {};
      const { type, payload } = actionCreator(credentials);
      expect(type).toBe(USER_AUTH);
      expect(payload).toBe(promise);
      expect(mockService.mock.calls.length).toBe(1);
      expect(mockService.mock.calls[0][0]).toBe(credentials);
    });
  }

  testAuth('signup', postSignup, signup);
  testAuth('signin', postSignin, signin);

  it('creates a logout action', () => {
    const { type } = logout();
    expect(type).toBe(LOGOUT);
  });

  it('creates an action that verifies and loads a user, if possible', () => {
    const thunk = attemptUserLoad();
    const dispatch = jest.fn();
    
    const user = { token: '123' };
    getStoredUser.mockReturnValueOnce(user);
    const verified = Promise.resolve();
    getUserVerified.mockReturnValueOnce(verified);

    thunk(dispatch)
      .then(() => {
        expect(getUserVerified.mock.calls[0][0]).toBe('123');
        expect(dispatch.mock.calls.length).toBe(2);
        expect(clearStoredUser.mock.calls.length).toBe(0);
        expect(dispatch.mock.calls[0][0]).toEqual({ 
          type: USER_AUTH,
          payload: user
        });
        expect(dispatch.mock.calls[1][0]).toEqual({ 
          type: CHECKED_AUTH
        });
      });
  });
});