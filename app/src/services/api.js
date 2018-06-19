import { get, post } from './request';

const URL = '/api';
const ITEMS_URL = `${URL}/items`;
const AUTH_URL = `${URL}/auth`;

export const getMatchingItems = (color, page) => get(`${ITEMS_URL}/find?color=${color}&page=${page}`);
export const getItemById = id => get(`${ITEMS_URL}/${id}`);

export const signin = credentials => post(`${AUTH_URL}/signin`, credentials);
export const signup = credentials => post(`${AUTH_URL}/signup`, credentials);

export const verifyUser = token => get(`${AUTH_URL}/verify`, {
  headers: {
    Authorization: token
  }
});