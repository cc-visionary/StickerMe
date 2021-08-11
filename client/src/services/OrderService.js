/* Contains the functions to requests to URL Paths in relation to the `orders` collection */

import axios from 'axios';

import { ORDER_API_BASE_URL } from '../utils/constants';

const OrderService = {
  getAllOrders: () => axios.get(ORDER_API_BASE_URL),
  getOrdersByUser: (username) => axios.get(`${ORDER_API_BASE_URL}/${username}`),
  insertOrder: (order) => axios.post(`${ORDER_API_BASE_URL}`, order),
};

export default OrderService;
