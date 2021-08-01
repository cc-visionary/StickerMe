/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { getUser, getUserToken } from "./store";

const ADMIN_FALLBACK = "/admin";
const CUSTOMER_FALLBACK = "/customer";

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // if user is not logged in, stay in the login page
      if (!getUserToken()) return <Component {...props} />;
      // check if user is an admin, if yes, then user will be redirected to admin page
      if (getUser().userType === "admin")
        return <Redirect to={{ pathname: ADMIN_FALLBACK }} />;
      // if user is customer, then user will be redirected to the customer page
      return <Redirect to={{ pathname: CUSTOMER_FALLBACK }} />;
    }}
  />
);

LoginRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default LoginRoute;
