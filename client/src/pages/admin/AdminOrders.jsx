import React, { Component } from 'react';

import '../../assets/styles/pages/admin/AdminOrders.css';
import OrderCard from '../../components/OrderCard';
import { OrderService } from '../../services';

class AdminOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      currentOrders: [],
      currentTab: 'All',
    };
  }

  componentDidMount() {
    OrderService.getAllOrders().then((orderRes) => {
      const { result: orders } = orderRes.data;
      this.setState({ orders, currentOrders: orders });
    });
  }

  onSelectTab(tabName) {
    const { orders } = this.state;
    this.setState({
      currentTab: tabName,
      currentOrders: orders.filter((o) => o.status === tabName || tabName === 'All'),
    });
  }

  render() {
    const { currentOrders, currentTab } = this.state;

    return (
      <div id="admin-orders-page">
        <div className="select-bar">
          <button type="button" onClick={() => this.onSelectTab('All')} style={{ color: currentTab === 'All' ? '#CE2E2E' : '#464646' }}>All</button>
          <button type="button" onClick={() => this.onSelectTab('Preparing')} style={{ color: currentTab === 'Preparing' ? '#CE2E2E' : '#464646' }}>Preparing</button>
          <button type="button" onClick={() => this.onSelectTab('Paid')} style={{ color: currentTab === 'Paid' ? '#CE2E2E' : '#464646' }}>Paid</button>
          <button type="button" onClick={() => this.onSelectTab('Shipped')} style={{ color: currentTab === 'Shipped' ? '#CE2E2E' : '#464646' }}>Shipped</button>
          <button type="button" onClick={() => this.onSelectTab('Cancelled')} style={{ color: currentTab === 'Cancelled' ? '#CE2E2E' : '#464646' }}>Cancelled</button>
        </div>
        <hr />
        <div className="order-list">
          {currentOrders.map((o) => (o ? (
            <OrderCard
              order={o}
            />
          ) : <></>))}
        </div>
      </div>
    );
  }
}

export default AdminOrders;
