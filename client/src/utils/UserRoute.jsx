/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getToken } from "./common";

const UserRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      getToken() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

export default UserRoute;
