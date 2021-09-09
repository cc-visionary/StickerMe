/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';

import profile from '../../assets/images/icons/Profile.png';
import features from '../../assets/images/icons/Features.png';

import '../../assets/styles/pages/admin/AdminHome.css';
import { OrderService } from '../../services';

export default class CustomerHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    OrderService.getAllOrders().then((res) => {
      const { result } = res.data;
      this.setState({ orders: result });
    }).catch((err) => {
      const { error } = err.response.data;
      console.log(error);
    });
  }

  render() {
    const { orders } = this.state;

    return (
      <div id="admin-home-page">
        <h1>Orders</h1>
        <div className="orders">
          {orders.length > 0 ? orders.map((order) => (
            <a href="/admin/orders/">
              <div className="item">
                <div className="left">{`${order.contact.firstName} ${order.contact.lastName}`}</div>
                <div className="right">
                  <div>
                    QUANTITY:
                    {order.character.quantities.reduce((a, b) => a + b)}
                  </div>
                  <div>
                    STATUS:
                    <span className={order.status.toLowerCase()}>{` ${order.status}`}</span>
                  </div>
                </div>
              </div>
            </a>
          )) : <div className="no-orders">No orders...</div>}
        </div>
        <div className="buttons">
          <a href="/admin/features">
            <img src={features} alt="Feature Icon" />
            <p>Features</p>
          </a>
          <a href="/admin/users">
            <img src={profile} alt="Profile Icon" />
            <p>User</p>
          </a>
        </div>
      </div>
    );
  }
}
