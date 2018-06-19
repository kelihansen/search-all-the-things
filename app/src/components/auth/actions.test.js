jest.mock('../../services/api', () => ({
  postSignup: jest.fn(),
  postSignin: jest.fn()
}));

import { signup, signin } from './actions';
import { USER_AUTH } from './reducers';
import { postSignup, postSignin } from '../../services/api';

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
});