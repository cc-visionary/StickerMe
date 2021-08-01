/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";

import { Route, Redirect } from "react-router-dom";
import { getUser, getUserToken } from "./store";

const LOGIN_FALLBACK = "/login";
const ADMIN_FALLBACK = "/admin";

const CustomerRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // checks if user is logged in
      if (getUserToken()) {
        // checks if user is a admin, if he is, he'll be redirected to admin page
        if (getUser().userType === "admin")
          return (
            <Redirect
              to={{
                pathname: ADMIN_FALLBACK,
                state: {
                  from: props.location,
                },
              }}
            />
          );
        // if not, then the user will see the customer page
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

CustomerRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.any),
};

CustomerRoute.defaultProps = {
  location: null,
};

export default CustomerRoute;
