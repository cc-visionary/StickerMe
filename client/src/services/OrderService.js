/* Contains the functions to requests to URL Paths in relation to the `orders` collection */

import axios from 'axios';

import { ORDER_API_BASE_URL } from '../utils/constants';

const OrderService = {
  getAllOrders: () => axios.get(ORDER_API_BASE_URL),
  getOrdersByUser: (username) => axios.get(`${ORDER_API_BASE_URL}/${username}`),
  addOrder: (order) => axios.post(`${ORDER_API_BASE_URL}`, order),
  updateOrderStatus: (id, status) => axios.patch(`${ORDER_API_BASE_URL}/status/${id}`, status),
  cancelOrder: (id) => axios.patch(`${ORDER_API_BASE_URL}/cancel/${id}`),
  deleteOrder: (id) => axios.delete(`${ORDER_API_BASE_URL}/delete/${id}`),
};

export default OrderService;
