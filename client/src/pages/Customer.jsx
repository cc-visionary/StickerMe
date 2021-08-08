import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { UserService } from '../services';

export default class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleLogout() {
    const { history } = this.props;
    UserService.logout().then(() => {
      history.push('/login');
    });
  }

  render() {
    return (
      <div id="user-page">
        <h1>Customer Page</h1>
        <input
          type="button"
          onClick={() => this.handleLogout()}
          value="Logout"
        />
      </div>
    );
  }
}

Customer.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};

Customer.defaultProps = {
  history: null,
};
