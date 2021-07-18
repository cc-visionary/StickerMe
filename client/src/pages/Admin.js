import React from "react";

import "../assets/styles/pages/Admin.css";

const Admin = ({ users }) => {
  return (
    <div id="admin-page">
      <h1>Admin Page Content</h1>
      <h3>Users:</h3>
      {users.map((user, key) => (
        <div key={key}>{user.username}</div>
      ))}
    </div>
  );
};

export default Admin;
