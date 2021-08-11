/* Contains the functions to requests to URL Paths in relation to the `carts` collection */

import axios from 'axios';

import { CART_API_BASE_URL } from '../utils/constants';

const CartService = {
  getCartByUser: (username) => axios.get(`${CART_API_BASE_URL}/${username}`),
  insertCartItem: (username, characterID) => axios.post(`${CART_API_BASE_URL}`, { username, characterID }),
  deleteCartItem: (username, characterID) => axios.delete(`${CART_API_BASE_URL}/item`, { username, characterID }),
  deleteCart: (username) => axios.delete(`${CART_API_BASE_URL}`, { username }),
};

export default CartService;
