import { get, post } from './request';

const URL = '/api';
const ITEMS_URL = `${URL}/items`;
const AUTH_URL = `${URL}/auth`;

export const getMatchingItems = (color, page) => get(`${ITEMS_URL}/find?color=${color}&page=${page}`);
export const getItemById = id => get(`${ITEMS_URL}/${id}`);

export const postSignin = credentials => post(`${AUTH_URL}/signin`, credentials);
export const postSignup = credentials => post(`${AUTH_URL}/signup`, credentials);

export const getUserVerified = token => get(`${AUTH_URL}/verify`, {
  headers: {
    Authorization: token
  }
});