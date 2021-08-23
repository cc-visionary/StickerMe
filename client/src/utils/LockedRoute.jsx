/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';
import { getUserToken } from './store';
import { LOGIN_FALLBACK } from './constants';

const LockedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // checks if user is logged in
      if (getUserToken()) {
        // if not, then the user will see the locked page
        return <Component {...props} />;
      }

      // if user is logged out, redirect to login page
      return (
        <Redirect
          to={{
            pathname: LOGIN_FALLBACK,
            state: {
              from: props.location,
            },
          }}
        />
      );
    }}
  />
);

LockedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.any),
};

LockedRoute.defaultProps = {
  location: null,
};

export default LockedRoute;
