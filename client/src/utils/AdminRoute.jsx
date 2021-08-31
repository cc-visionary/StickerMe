/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { getUser, getUserToken } from './store';
import {
  CUSTOMER_FALLBACK,
  LOGIN_FALLBACK,
  ADMIN_LOCKED_FALLBACK,
  ADMIN_URLS_TO_LOCK,
} from './constants';

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // checks if user is logged in
      if (getUserToken()) {
        // checks if user is a customer, if he is, he'll be redirected to customer page
        if (getUser().userType === 'customer') {
          return (
            <Redirect
              to={{
                pathname: CUSTOMER_FALLBACK,
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }

        if (new Date().getDay() < 3 || new Date().getDay() > 6) {
          if (ADMIN_URLS_TO_LOCK.includes(rest.path)) {
            return (
              <Redirect
                to={{
                  pathname: ADMIN_LOCKED_FALLBACK,
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        }
        // if not, then the user will see the admin page
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

AdminRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.any),
};

AdminRoute.defaultProps = {
  location: null,
};

export default AdminRoute;
