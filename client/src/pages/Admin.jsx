import React from "react";

import "../assets/styles/pages/Admin.css";

const Admin = ({ users }) => (
  <div id="admin-page">
    <h1>Admin Page Content</h1>
    <h3>Users:</h3>
    {users.map((user) => (
      <div>{user.username}</div>
    ))}
  </div>
);

export default Admin;
