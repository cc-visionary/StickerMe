/* Contains the functions to requests to URL Paths in relation to the `orders` collection */

import axios from "axios";

const ORDER_API_BASE_URL = "http://localhost:3000/api/orders";

class OrderService {
  getAllOrders() {
    return axios.get(ORDER_API_BASE_URL);
  }
}

export default new OrderService();
