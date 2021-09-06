import React, { Component } from 'react';

import '../../assets/styles/pages/customer/CustomerOrders.css';
import { OrderService } from '../../services';
import { getUser } from '../../utils/store';

class CustomerOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    OrderService.getOrdersByUser(getUser().uname)
      .then((res) => {
        const { result } = res.data;
        this.setState({ orders: result });
      })
      .catch((err) => {
        const { error } = err.response.data;
        console.log(error);
      });
  }

  render() {
    const { orders } = this.state;

    return (
      <div id="customer-orders-page">
        <h1>Customer Orders Page</h1>
        {orders.map((o) => (
          <div>
            $
            {parseFloat(o.totalPrice.$numberDecimal).toFixed(2)}
            {' '}
            -
            {new Date(o.date).toDateString()}
          </div>
        ))}
      </div>
    );
  }
}

export default CustomerOrders;
