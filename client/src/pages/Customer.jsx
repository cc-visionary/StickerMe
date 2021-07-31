import React from "react";

import { UserService } from "../services";

const Customer = (props) => {
  const handleLogout = () => {
    UserService.logout().then(() => {
      props.history.push("/login");
    });
  };

  return (
    <div id="user-page">
      <h1>Customer Page</h1>
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
};

export default Customer;
