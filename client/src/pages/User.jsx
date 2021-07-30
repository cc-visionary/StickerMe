import React from "react";

import { UserService } from "../services";
import { removeUserSession } from "../utils/common";

const User = (props) => {
  const handleLogout = () => {
    UserService.logout().then(() => {
      removeUserSession();
      props.history.push("/login");
    });
  };

  return (
    <div id="user-page">
      <h1>User Page</h1>
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
};

export default User;
