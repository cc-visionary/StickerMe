import React, { Component } from 'react';

import profile from '../../assets/images/icons/Profile.png';
import features from '../../assets/images/icons/Features.png';

import '../../assets/styles/pages/admin/AdminHome.css';

export default class CustomerHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [
        { name: 'Colonel Sanders', quantity: 1, status: 'Preparing' },
        { name: 'Tony Tan Caktiong', quantity: 1, status: 'Preparing' },
        { name: 'Richard Mcdonald', quantity: 2, status: 'Cancelled' },
        { name: 'Dave Thomas', quantity: 1, status: 'Shipped' },
      ],
    };
  }

  render() {
    const { orders } = this.state;

    return (
      <div id="admin-home-page">
        <h1>Admin Home Page</h1>
        <div className="orders">
          {orders.map((order) => (
            <div className="item">
              <div className="left">{order.name}</div>
              <div className="right">
                <div>
                  QUANTITY:
                  {` ${order.quantity}`}
                </div>
                <div>
                  STATUS:
                  { /* eslint-disable-next-line no-nested-ternary */ }
                  <span className={order.status === 'Preparing' ? 'preparing' : (order.status === 'Cancelled' ? 'cancelled' : 'shipped')}>{` ${order.status}`}</span>
                </div>
              </div>
            </div>
          ))}
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
