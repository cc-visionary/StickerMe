/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { getUser, getUserToken } from "./store";

const LOGIN_FALLBACK = "/login";
const CUSTOMER_FALLBACK = "/customer";

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // checks if user is logged in
      if (getUserToken()) {
        // checks if user is a customer, if he is, he'll be redirected to customer page
        if (getUser().userType === "customer")
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
